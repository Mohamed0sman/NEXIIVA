import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UnitType, BuilderMode, SimState, ScenarioId, TelemetryData, WizardAnswers, ScenarioDefinition } from '../types/simulation';
import { SCENARIOS } from '../data/scenarios';

interface SimulationJourneyContextType {
  selectedUnit: UnitType;
  setSelectedUnit: (unit: UnitType) => void;
  builderMode: BuilderMode;
  setBuilderMode: (mode: BuilderMode) => void;
  simState: SimState;
  telemetry: TelemetryData;
  activeScenario: ScenarioDefinition;
  selectScenario: (id: ScenarioId) => void;
  injectFault: (id?: ScenarioId) => void;
  acknowledgeAlarm: () => void;
  startStandbyPump: () => void;
  adjustValve: (val: number) => void;
  resetSimulation: () => void;
  wizardAnswers: WizardAnswers;
  setWizardAnswer: <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => void;
  language: 'EN' | 'AR';
  setLanguage: (lang: 'EN' | 'AR') => void;
  videoModalOpen: boolean;
  setVideoModalOpen: (open: boolean) => void;
  pilotDrawerOpen: boolean;
  setPilotDrawerOpen: (open: boolean) => void;
  simulatorModalOpen: boolean;
  setSimulatorModalOpen: (open: boolean) => void;
  activeFaceplate: string | null;
  setActiveFaceplate: (tag: string | null) => void;
  activeStage: number; // 1, 2, 3, 4
  setActiveStage: (stage: number) => void;
  scrollToStage: (stageNum: number) => void;
}

const defaultWizardAnswers: WizardAnswers = {
  crudeGrade: 'Medium (Default)',
  desalter: true,
  preheatTrain: 'Standard — heat from diesel & residue',
  sideStrippers: true,
  flareSystem: true,
  columnTrays: '48 Trays (Standard)',
};

const initialTelemetry: TelemetryData = {
  overheadTemp: 114.2,
  columnPressure: 1.48,
  refluxLevel: 52.4,
  refluxFlow: 84.5,
  furnaceOutletTemp: 362.0,
  vacuumPressure: 45.2,
  feedRate: 320.0,
  refluxPumpA_Running: true,
  refluxPumpB_Running: false,
  refluxControlValvePct: 64.2,
  alarmActive: false,
  alarmAcked: false,
  score: 100.0,
  elapsedSeconds: 0,
};

const SimulationJourneyContext = createContext<SimulationJourneyContextType | undefined>(undefined);

export const SimulationJourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedUnit, setSelectedUnit] = useState<UnitType>('CDU_VDU');
  const [builderMode, setBuilderMode] = useState<BuilderMode>('OFFLINE_WIZARD');
  const [simState, setSimState] = useState<SimState>('NORMAL');
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId>('S1');
  const [telemetry, setTelemetry] = useState<TelemetryData>(initialTelemetry);
  const [wizardAnswers, setWizardAnswers] = useState<WizardAnswers>(defaultWizardAnswers);
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [pilotDrawerOpen, setPilotDrawerOpen] = useState(false);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState(false);
  const [activeFaceplate, setActiveFaceplate] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState(1);

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const setWizardAnswer = <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => {
    setWizardAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const selectScenario = (id: ScenarioId) => {
    setActiveScenarioId(id);
    resetSimulation();
  };

  const injectFault = useCallback((id?: ScenarioId) => {
    if (id) {
      setActiveScenarioId(id);
    }
    setSimState('FAULT_INJECTED');
    setTelemetry((prev) => ({
      ...prev,
      refluxPumpA_Running: false,
      refluxPumpB_Running: false,
      refluxFlow: 0.0,
      alarmActive: true,
      alarmAcked: false,
      elapsedSeconds: 0,
    }));
  }, []);

  const acknowledgeAlarm = useCallback(() => {
    setTelemetry((prev) => ({
      ...prev,
      alarmAcked: true,
    }));
  }, []);

  const startStandbyPump = useCallback(() => {
    setSimState('RECOVERING');
    setTelemetry((prev) => ({
      ...prev,
      refluxPumpB_Running: true,
      refluxFlow: 82.0,
      alarmActive: false,
    }));
  }, []);

  const adjustValve = useCallback((val: number) => {
    setTelemetry((prev) => ({
      ...prev,
      refluxControlValvePct: val,
      refluxFlow: (val / 100) * 128.0,
    }));
  }, []);

  const resetSimulation = useCallback(() => {
    setSimState('NORMAL');
    setTelemetry(initialTelemetry);
  }, []);

  // Telemetry loop for realistic industrial strip chart and sensor dynamics
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => {
        const jitter = (Math.random() - 0.5) * 0.2;
        let newTemp = prev.overheadTemp;
        let newFlow = prev.refluxFlow;
        let newAlarm = prev.alarmActive;
        let elapsed = prev.elapsedSeconds + 1;

        if (simState === 'FAULT_INJECTED') {
          // Temperature climbs when reflux is 0 m3/h
          if (newTemp < 124.8) {
            newTemp += 0.45;
          }
          newFlow = 0.0;
          newAlarm = true;
        } else if (simState === 'RECOVERING') {
          // Temperature steadily returns to target 114.5 °C
          if (newTemp > 115.1) {
            newTemp -= 0.35;
          } else {
            newTemp = 114.6 + jitter;
          }
          if (newFlow < 84.5) {
            newFlow = Math.min(84.5, newFlow + 0.8);
          }
        } else {
          // Normal slight fluctuation
          newTemp = 114.2 + jitter;
          newFlow = 84.5 + jitter;
        }

        // Automatic certification transition when recovered and stable
        if (simState === 'RECOVERING' && newTemp <= 115.5 && prev.alarmAcked && prev.refluxPumpB_Running) {
          setSimState('CERTIFIED');
        }

        return {
          ...prev,
          overheadTemp: parseFloat(newTemp.toFixed(1)),
          refluxFlow: parseFloat(newFlow.toFixed(1)),
          columnPressure: parseFloat((1.48 + (simState === 'FAULT_INJECTED' ? 0.12 : 0) + jitter * 0.05).toFixed(2)),
          furnaceOutletTemp: parseFloat((362.0 + jitter * 0.4).toFixed(1)),
          vacuumPressure: parseFloat((45.2 + jitter * 0.3).toFixed(1)),
          refluxLevel: parseFloat((52.4 + (simState === 'FAULT_INJECTED' ? -4.2 : 0) + jitter * 0.2).toFixed(1)),
          alarmActive: newAlarm,
          elapsedSeconds: elapsed,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [simState]);

  const scrollToStage = (stageNum: number) => {
    setActiveStage(stageNum);
    const element = document.getElementById(`stage-0${stageNum}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SimulationJourneyContext.Provider
      value={{
        selectedUnit,
        setSelectedUnit,
        builderMode,
        setBuilderMode,
        simState,
        telemetry,
        activeScenario,
        selectScenario,
        injectFault,
        acknowledgeAlarm,
        startStandbyPump,
        adjustValve,
        resetSimulation,
        wizardAnswers,
        setWizardAnswer,
        language,
        setLanguage,
        videoModalOpen,
        setVideoModalOpen,
        pilotDrawerOpen,
        setPilotDrawerOpen,
        simulatorModalOpen,
        setSimulatorModalOpen,
        activeFaceplate,
        setActiveFaceplate,
        activeStage,
        setActiveStage,
        scrollToStage,
      }}
    >
      {children}
    </SimulationJourneyContext.Provider>
  );
};

export const useSimulationJourney = () => {
  const context = useContext(SimulationJourneyContext);
  if (!context) {
    throw new Error('useSimulationJourney must be used within a SimulationJourneyProvider');
  }
  return context;
};
