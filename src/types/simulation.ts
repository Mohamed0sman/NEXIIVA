export type UnitType = 'CDU_VDU' | 'AGR_AMINE' | 'HCU';

export type BuilderMode = 'OFFLINE_WIZARD' | 'AI_AGENT';

export type SimState = 'NORMAL' | 'FAULT_INJECTED' | 'RECOVERING' | 'CERTIFIED';

export type ScenarioId = 'S1' | 'S2' | 'S3';

export interface TelemetryData {
  overheadTemp: number; // Normal: 114.2 °C, Fault: spikes to 124.5 °C, Recovered: ~115.0 °C
  columnPressure: number; // 1.48 bar
  refluxLevel: number; // 52.4 %
  refluxFlow: number; // Normal: 84.5 m3/h, Fault: drops to 0.0 m3/h, Recovered: 84.0 m3/h
  furnaceOutletTemp: number; // 362.0 °C
  vacuumPressure: number; // 45.2 mmHg
  feedRate: number; // 320.0 m3/h
  refluxPumpA_Running: boolean; // True -> False on trip
  refluxPumpB_Running: boolean; // False -> True when standby started
  refluxControlValvePct: number; // 64.2%
  alarmActive: boolean;
  alarmAcked: boolean;
  score: number; // 0 to 100
  elapsedSeconds: number;
}

export interface RubricStep {
  id: string;
  code: string;
  description: string;
  targetSeconds?: number;
  actualSeconds?: number;
  weight: number;
  passed: boolean;
  notes: string;
}

export interface ScenarioDefinition {
  id: ScenarioId;
  title: string;
  tag: string;
  unit: string;
  description: string;
  initialFault: string;
  expectedActions: string[];
  rubric: RubricStep[];
}

export interface EquipmentItem {
  id: string;
  tag: string;
  name: string;
  domain: string;
  category: string;
  spec: string;
  mats: string;
  status?: 'active' | 'standby' | 'tripped';
}

export interface WizardAnswers {
  crudeGrade: 'Light' | 'Medium (Default)' | 'Heavy';
  desalter: boolean;
  preheatTrain: 'Standard — heat from diesel & residue' | 'Simple';
  sideStrippers: boolean;
  flareSystem: boolean;
  columnTrays: '48 Trays (Standard)' | '54 Trays (High Purity)';
}
