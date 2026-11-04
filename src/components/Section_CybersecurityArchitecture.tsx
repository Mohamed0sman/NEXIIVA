import React, { useState } from 'react';

export const Section_CybersecurityArchitecture: React.FC = () => {
  const [selectedArch, setSelectedArch] = useState<'AIR_GAPPED' | 'PRIVATE_CLOUD'>('AIR_GAPPED');
  const [selectedProcessUnit, setSelectedProcessUnit] = useState('CDU_VDU');

  const processUnits = [
    {
      id: 'CDU_VDU',
      title: 'Crude & Vacuum Distillation (CDU/VDU)',
      plants: 'MIDOR, Alexandria Petroleum, Cairo Oil Refining (CORC), Suez, Asyut, Nasr Petroleum',
      sites: '9 Refineries in Egypt · 24 in GCC',
      status: 'PRODUCTION READY (Running Today)',
      complexity: 'HIGH (48 Trays, Vacuum Jet System, Fired Heaters)',
    },
    {
      id: 'HCU',
      title: 'Hydrocracker Unit (HCU)',
      plants: 'MIDOR Refinery expansion, Assiut National Oil (ANOPC)',
      sites: 'High-conversion mega units',
      status: 'FLOWSHEET TEMPLATE AVAILABLE',
      complexity: 'VERY HIGH (High Pressure H2, 160 barg, Exothermic Bed Control)',
    },
    {
      id: 'DCU',
      title: 'Delayed Coking Unit (DCU)',
      plants: 'Suez Oil Processing Company (SOPC), Nasr Petroleum',
      sites: 'Heavy residue upgrading',
      status: 'CONFIGURABLE VIA OTS BUILDER',
      complexity: 'HIGH (Thermal Cracking, Drum Switching, Decoking Cycles)',
    },
    {
      id: 'NHT_CCR',
      title: 'Naphtha Hydrotreater & CCR Platformer',
      plants: 'ANRPC (Alexandria National Refining), MIDOR, Suez',
      sites: 'High-octane reformate & gasoline',
      status: 'CONFIGURABLE VIA OTS BUILDER',
      complexity: 'MEDIUM-HIGH (Continuous Catalyst Regeneration, H2 recycle)',
    },
    {
      id: 'AGR_SRU',
      title: 'Amine Gas Sweetening (AGR) & Claus SRU',
      plants: 'GASCO, Agiba Petroleum Western Desert, WEPCO, Pharaonic, Rashid',
      sites: 'Natural gas processing & sour off-gas',
      status: 'CONFIGURABLE VIA OTS BUILDER',
      complexity: 'HIGH (H2S Absorption, Solvent Thermal Regeneration, Tail Gas)',
    },
    {
      id: 'ETHYLENE',
      title: 'Ethylene Cracker & Polyolefins',
      plants: 'ETHYDCO, SIDPEC (Sidi Kerir), Sanmar Chemicals',
      sites: 'Petrochemical cracking furnaces',
      status: 'EXPANSION DOMAIN (Year 2)',
      complexity: 'VERY HIGH (Gas & Naphtha Pyrolysis, Cryogenic Separation)',
    },
  ];

  return (
    <section id="security" className="bg-[#03050C] py-16 px-4 lg:px-8 border-b border-[#182838] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 font-mono text-[11px] text-[#C8A048]">
            <span>[SYS-07 // OT/IT CYBERSECURITY & ZERO-TRUST AIR-GAP]</span>
            <span className="text-[#182838]">|</span>
            <span className="text-[#94A3B8]">DUE DILIGENCE FOR REFINERY CTOs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0F0F8] tracking-tight">
            100% Air-Gapped Architecture: Zero Cloud Dependency, Zero Plant Network Exposure.
          </h2>
          <p className="text-[#94A3B8] max-w-3xl text-sm sm:text-base leading-relaxed">
            Refinery operations data and proprietary P&IDs never leave your facility. NEXIIVA installs as a self-contained, air-gapped system inside your training academy with strictly isolated network boundaries.
          </p>
        </div>

        {/* 1. Architecture Selector & Interactive SVG Blueprint Diagram */}
        <div className="bg-[#081838] border border-[#182838] p-6 lg:p-8 space-y-6 corner-crosshairs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#182838] pb-4">
            <div className="font-mono text-xs text-[#F0F0F8] font-bold">
              DEPLOYMENT TOPOLOGY BLUEPRINT:
            </div>
            <div className="flex border border-[#182838] bg-[#060B16]">
              <button
                onClick={() => setSelectedArch('AIR_GAPPED')}
                className={`px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
                  selectedArch === 'AIR_GAPPED'
                    ? 'bg-[#3361FC] text-white font-bold'
                    : 'text-[#94A3B8] hover:text-[#F0F0F8]'
                }`}
              >
                100% Air-Gapped On-Premise (Recommended)
              </button>
              <button
                onClick={() => setSelectedArch('PRIVATE_CLOUD')}
                className={`px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
                  selectedArch === 'PRIVATE_CLOUD'
                    ? 'bg-[#C8A048] text-[#03050C] font-bold'
                    : 'text-[#94A3B8] hover:text-[#F0F0F8]'
                }`}
              >
                Isolated Private Cloud
              </button>
            </div>
          </div>

          {/* SVG Architecture Blueprint */}
          <div className="bg-[#060B16] border border-[#182838] p-4 relative min-h-[300px]">
            <div className="absolute inset-0 bg-cad-subgrid opacity-20 pointer-events-none" />

            <svg className="w-full h-[260px]" viewBox="0 0 800 240" fill="none">
              {/* Outer Perimeter Box */}
              <rect
                x="15"
                y="15"
                width="770"
                height="210"
                fill="none"
                stroke={selectedArch === 'AIR_GAPPED' ? '#3361FC' : '#C8A048'}
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <text
                x="30"
                y="35"
                fill={selectedArch === 'AIR_GAPPED' ? '#3361FC' : '#C8A048'}
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {selectedArch === 'AIR_GAPPED'
                  ? '[SECURE BOUNDARY: REFINERY INTERNAL TRAINING LAN — ZERO INTERNET CONNECTION]'
                  : '[SECURE BOUNDARY: ISOLATED PRIVATE VPC — ENCRYPTED TLS 1.3 / IP RESTRICTED]'}
              </text>

              {/* 1. Local Server Box */}
              <rect x="60" y="60" width="180" height="130" fill="#0A1428" stroke="#204070" strokeWidth="1.5" />
              <text x="75" y="85" fill="#C8A048" fontSize="12" fontFamily="monospace" fontWeight="bold">
                LOCAL SIMULATION SERVER
              </text>
              <text x="75" y="105" fill="#F0F0F8" fontSize="9" fontFamily="monospace">
                • Dynamic Solver (C++/WebAssembly)
              </text>
              <text x="75" y="122" fill="#F0F0F8" fontSize="9" fontFamily="monospace">
                • 387 Equipment Flowsheet Engine
              </text>
              <text x="75" y="139" fill="#F0F0F8" fontSize="9" fontFamily="monospace">
                • Encrypted Audit Database
              </text>
              <text x="75" y="156" fill="#10B981" fontSize="9" fontFamily="monospace">
                • 100% Offline (No Cloud Keys)
              </text>

              {/* Network Bus */}
              <path d="M 240 125 L 350 125" stroke="#3361FC" strokeWidth="2.5" strokeDasharray="4 2" />
              <circle cx="350" cy="125" r="4" fill="#3361FC" />

              {/* Switch / Router Box */}
              <rect x="350" y="85" width="80" height="80" fill="#0A1428" stroke="#3361FC" strokeWidth="1.5" />
              <text x="360" y="118" fill="#3361FC" fontSize="10" fontFamily="monospace" fontWeight="bold">
                ISOLATED
              </text>
              <text x="362" y="132" fill="#F0F0F8" fontSize="10" fontFamily="monospace">
                OT SWITCH
              </text>

              {/* Lines from switch to stations */}
              <path d="M 430 110 L 510 75" stroke="#3361FC" strokeWidth="2" />
              <path d="M 430 125 L 510 125" stroke="#3361FC" strokeWidth="2" />
              <path d="M 430 140 L 510 175" stroke="#3361FC" strokeWidth="2" />

              {/* 3 Operator Stations */}
              <rect x="510" y="55" width="120" height="40" fill="#102030" stroke="#204070" strokeWidth="1" />
              <text x="520" y="73" fill="#F0F0F8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                OPERATOR STN 1
              </text>
              <text x="520" y="86" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                DCS Trainee Console
              </text>

              <rect x="510" y="105" width="120" height="40" fill="#102030" stroke="#204070" strokeWidth="1" />
              <text x="520" y="123" fill="#F0F0F8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                OPERATOR STN 2
              </text>
              <text x="520" y="136" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                DCS Trainee Console
              </text>

              <rect x="510" y="155" width="120" height="40" fill="#102030" stroke="#204070" strokeWidth="1" />
              <text x="520" y="173" fill="#F0F0F8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                OPERATOR STN 3
              </text>
              <text x="520" y="186" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                DCS Trainee Console
              </text>

              {/* Instructor Station Box */}
              <rect x="650" y="90" width="120" height="70" fill="#0A1428" stroke="#C8A048" strokeWidth="1.5" />
              <text x="658" y="112" fill="#C8A048" fontSize="10" fontFamily="monospace" fontWeight="bold">
                INSTRUCTOR CONSOLE
              </text>
              <text x="658" y="128" fill="#F0F0F8" fontSize="8" fontFamily="monospace">
                • Fault Injection Matrix
              </text>
              <text x="658" y="141" fill="#F0F0F8" fontSize="8" fontFamily="monospace">
                • Real-time Scoring
              </text>
              <text x="658" y="154" fill="#F0F0F8" fontSize="8" fontFamily="monospace">
                • PDF Cert Generation
              </text>
              <path d="M 630 125 L 650 125" stroke="#C8A048" strokeWidth="2" strokeDasharray="3 2" />
            </svg>

            {/* Security Guarantee Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#182838] font-mono text-[10px]">
              <div className="flex items-center space-x-2 text-[#F0F0F8]">
                <span className="text-emerald-400 font-bold">✓ 0% Plant Hardware Touch:</span>
                <span className="text-[#94A3B8]">Never connects to live operational DCS/SCADA networks.</span>
              </div>
              <div className="flex items-center space-x-2 text-[#F0F0F8]">
                <span className="text-emerald-400 font-bold">✓ 100% P&ID Confidentiality:</span>
                <span className="text-[#94A3B8]">Process flows, stream sheets and tags stay inside plant servers.</span>
              </div>
              <div className="flex items-center space-x-2 text-[#F0F0F8]">
                <span className="text-emerald-400 font-bold">✓ Zero Cloud Toll:</span>
                <span className="text-[#94A3B8]">Perpetual offline license with local station authorization.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 4-Step Plant Validation Workflow */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-[#C8A048] font-bold">
            [4-STEP REFINERY VALIDATION WORKFLOW // FROM P&ID INTAKE TO AUDIT]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#060B16] border border-[#182838] space-y-2">
              <div className="text-[#C8A048] font-bold text-sm">01 // INTAKE</div>
              <div className="font-bold text-[#F0F0F8]">P&ID & Tag Mapping</div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Client provides unit P&ID drawings, transmitter tags (`TI-101`, `FIC-102`), interlocks, and control philosophy under NDA.
              </p>
            </div>

            <div className="p-4 bg-[#060B16] border border-[#182838] space-y-2">
              <div className="text-[#C8A048] font-bold text-sm">02 // BUILD</div>
              <div className="font-bold text-[#F0F0F8]">OTS Builder Assembly</div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Unit flowsheet is compiled in ~1 week using the 387-type equipment library, matching exact tray counts, pump curves, and valves.
              </p>
            </div>

            <div className="p-4 bg-[#060B16] border border-[#182838] space-y-2">
              <div className="text-[#C8A048] font-bold text-sm">03 // VALIDATE</div>
              <div className="font-bold text-[#F0F0F8]">Process SME Tuning</div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Refinery process engineers review steady-state mass/energy balance against historical laboratory and DCS operating logs.
              </p>
            </div>

            <div className="p-4 bg-[#060B16] border border-[#182838] space-y-2">
              <div className="text-[#C8A048] font-bold text-sm">04 // PILOT</div>
              <div className="font-bold text-[#F0F0F8]">90-Day Paid Plant Pilot</div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                3 months hands-on pilot on site for $800. Operators run fault drills and validate recovery times before full contract sign-off.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Target Process Units in Egypt (40-45 Target Organizations / 25+ Sites) & GCC */}
        <div className="bg-[#060B16] border border-[#182838] p-6 lg:p-8 space-y-6 corner-crosshairs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#182838] pb-3">
            <div>
              <div className="font-mono text-xs text-[#C8A048] font-bold">
                [TARGET INDUSTRIAL PROCESS UNITS // EGYPT & GCC FOOTPRINT]
              </div>
              <div className="text-xs text-[#94A3B8] mt-0.5">
                40–45 Target Organizations in Egypt (23 Companies · 25 Sites · 50–100 Units) + GCC Expansion
              </div>
            </div>
            <div className="font-mono text-[10px] text-[#3361FC]">
              REGIONAL TAM: $0.54M–$1.86M/YR
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-[11px]">
            {processUnits.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedProcessUnit(u.id)}
                className={`p-3.5 border transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                  selectedProcessUnit === u.id
                    ? 'border-[#C8A048] bg-[#0E1A29]'
                    : 'border-[#182838] bg-[#08101E] hover:border-[#204070]'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-[#F0F0F8] text-xs leading-snug">{u.title}</span>
                  </div>
                  <div className="text-[10px] text-[#C8A048] mt-1 font-semibold">
                    {u.status}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-2">
                    <span className="text-[#64748B]">Key Facilities: </span>
                    {u.plants}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#182838] flex justify-between text-[9px] text-[#64748B]">
                  <span>{u.sites}</span>
                  <span className="text-[#D8E0F0]">{u.complexity.split(' ')[0]} COMPLEXITY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
