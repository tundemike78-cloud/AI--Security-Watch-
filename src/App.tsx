import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  Target, 
  Map as MapIcon, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause,
  Maximize2,
  Crosshair,
  AlertTriangle,
  Globe,
  Radio,
  Cpu,
  Camera,
  Signal,
  Eye,
  Zap,
  Info,
  Clock,
  LayoutGrid,
  ArrowRight,
  Plane
} from 'lucide-react';
import { SCENES, Scene } from './constants';
import { RadarPing, MapGrid, DataStream, StaticNoise, Scanlines, LensEffect, PredictivePath, PipelineOverlay, RobustDataOverlay } from './components/Effects';

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [insightIdx, setInsightIdx] = useState(0);
  
  const AI_INSIGHTS = [
    "High-risk activity detected in Zamfara Forest Zone.",
    "Anomaly pattern matched on Abuja-Kaduna transit artery.",
    "Atmospheric conditions optimal for Sentinel-01 deployment.",
    "Satellite correlation suggests non-standard vehicle convoy.",
    "Predictive model indicates 82% probability of deviation.",
    "Lagos sector traffic flow consistent with baseline parameters.",
    "Spectral analysis confirms thermal signature in G-9 sector.",
    "Sentinel-NGA identifies heat cluster in Niger Delta corridor.",
    "Behavioral deviation detected: Target 44-X moving off-road.",
    "Communication node localized in Sector K-12. Intercept ready."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIdx((prev) => (prev + 1) % AI_INSIGHTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const goToScene = (idx: number) => {
    setCurrentIdx(idx);
    setIsPlaying(false);
  };

  const nextScene = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % SCENES.length);
    setIsPlaying(false);
  }, []);

  const prevScene = () => {
    setCurrentIdx((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setIsPlaying(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        nextScene();
      }, 12000);
    }
    return () => clearTimeout(timer);
  }, [currentIdx, isPlaying, nextScene]);

  const scene = SCENES[currentIdx];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-bg-dark font-sans text-brand-green flex flex-col select-none">
      <div className="scanlines" />

      {/* TOP BAR */}
      <header className="h-16 border-b border-brand-border bg-brand-bg-panel/80 backdrop-blur-md flex items-center justify-between px-6 z-[120] tactical-corners">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 border border-brand-blue flex items-center justify-center bg-brand-blue/10">
                <ShieldCheck className="text-brand-blue w-6 h-6 glow-blue" />
              </div>
              <motion.div 
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-brand-blue blur-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-[0.2em] text-white glow-blue">FALCONWATCH</span>
              <span className="text-[8px] text-brand-blue/60 uppercase tracking-[0.6em] font-mono leading-none">Intelligence. Protection.</span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-brand-border mx-2" />
          
          <div className="flex gap-8 items-center text-[10px] font-mono">
            <div className="flex flex-col">
              <span className="text-white/30 uppercase tracking-widest text-[7px]">System Status</span>
              <span className="text-brand-green flex items-center gap-2 font-bold">
                <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" /> ONLINE
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/30 uppercase tracking-widest text-[7px]">Active Drones</span>
              <span className="text-brand-blue font-bold tracking-widest">SENTINEL-01 // U-A12</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 font-mono text-[10px]">
          <div className="text-right">
            <div className="text-white/30 uppercase text-[7px]">Active Segment</div>
            <div className="text-white font-bold">{scene.location || 'WEST-CENTRAL NIGERIA'}</div>
          </div>
          <div className="text-right">
            <div className="text-white/30 uppercase text-[7px]">Alert Count</div>
            <div className="text-brand-alert font-bold flex items-center justify-end gap-1">
              <Activity size={10} /> {currentIdx > 0 && currentIdx < 7 ? "01" : "00"}
            </div>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-brand-border">
             <div className="flex flex-col text-right">
                <div className="text-white/30 uppercase text-[7px]">Operational Time</div>
                <div className="text-brand-blue font-bold uppercase">{new Date().toLocaleTimeString()}</div>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: LIVE DRONE FEEDS */}
        <aside className="w-80 border-r border-brand-border flex flex-col p-4 bg-brand-bg-panel/95 z-50 sidebar-panel relative">
           <div className="flex items-center gap-2 mb-4 border-b border-brand-border pb-2">
              <Camera size={14} className="text-brand-blue" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">Live Intelligence Feeds</span>
           </div>

           <div className="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar">
              {scene.id === 4 && <DroneSchematic />}
              <FeedWindow label="UAV_01: LAGOS-IBADAN SW" img={scene.imageUrl} active onClick={() => goToScene(2)} />
              <FeedWindow label="UAV_04: DELTA PIPELINE THERMAL" img={scene.imageUrl} style="grayscale invert contrast-150 brightness-75 hue-rotate-90" tag="THERMAL" onClick={() => goToScene(3)} />
              <FeedWindow label="SAT-GRID: NIGER DELTA VECTOR" img="https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80&w=500" tag="SATELLITE" onClick={() => goToScene(4)} />
              
              <div className="p-3 border border-brand-border bg-black/40 tactical-corners mt-4 cursor-pointer hover:bg-brand-blue/5 transition-colors" onClick={() => goToScene(4)}>
                 <div className="text-[8px] uppercase tracking-widest text-white/30 mb-2 font-bold">Signal Intelligence (SIGINT)</div>
                 <div className="space-y-3">
                    <ProgressBar label="NIGERIAN SAT-1 LINK" value={99} />
                    <ProgressBar label="ENCRYPTION (AES-256)" value={92} />
                    <ProgressBar label="P25 RADIO TRUNK" value={88} unit="%" color="bg-brand-blue" />
                 </div>
              </div>

              <div className="mt-4">
                <div className="text-[8px] uppercase tracking-widest text-brand-alert mb-2 font-bold flex items-center gap-2">
                  <Activity size={10} /> Live Processor Log
                </div>
                <div className="bg-black/60 border border-brand-border/20 p-2 font-mono text-[7px] text-brand-green/40 h-24 overflow-hidden relative">
                   <div className="animate-pulse absolute top-1 right-2 w-1 h-1 bg-brand-green rounded-full" />
                   <div className="space-y-1">
                      <div>[{new Date().toLocaleTimeString()}] SIGINT: Hot-tap signature detected.</div>
                      <div>[{new Date().toLocaleTimeString()}] GEO: Niger Delta Sector P-42 locked.</div>
                      <div>[{new Date().toLocaleTimeString()}] UAV: Sentinel-01 maintaining 55k ft.</div>
                      <div>[{new Date().toLocaleTimeString()}] AI: Behavioral confidence 0.942.</div>
                      <div>[{new Date().toLocaleTimeString()}] SYS: NSCDC protocols active.</div>
                   </div>
                </div>
              </div>
           </div>
        </aside>

        {/* CENTER SCREEN: PRIMARY TACTICAL MAP */}
        <section className="flex-1 relative bg-black overflow-hidden flex flex-col border-x border-brand-border/20">
           {/* AI INSIGHT TICKER */}
           <div className="absolute top-0 inset-x-0 h-10 bg-brand-bg-panel/40 backdrop-blur-md border-b border-brand-border/30 z-[60] flex items-center px-6 overflow-hidden">
              <div className="flex items-center gap-2 shrink-0 border-r border-brand-border/30 pr-4 mr-4 h-full">
                 <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse shadow-blue" />
                 <span className="text-[7px] font-bold text-brand-blue uppercase tracking-[0.3em] font-mono">AI_INSIGHTS</span>
              </div>
              <AnimatePresence mode="wait">
                 <motion.div
                   key={insightIdx}
                   initial={{ y: 10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -10, opacity: 0 }}
                   transition={{ duration: 0.4 }}
                   className="flex items-center gap-2"
                 >
                    <span className="text-[10px] font-mono text-white/80 lowercase tracking-wider">
                       <span className="text-brand-blue mr-2">&gt;</span>
                       {AI_INSIGHTS[insightIdx]}
                    </span>
                 </motion.div>
              </AnimatePresence>
              <div className="ml-auto flex items-center gap-4 text-[7px] font-mono text-white/30 tracking-widest uppercase">
                 <span>Confidence: 94.2%</span>
                 <span>Analysis: Active</span>
              </div>
           </div>

           <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={scene.imageUrl}
                    alt={scene.title}
                    className={`w-full h-full object-cover transition-all duration-[2000ms] ${scene.overlayType === 'thermal' ? 'sepia contrast-[200%] brightness-[80%] hue-rotate-[180deg]' : 'opacity-40 blur-[1px] grayscale'}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 cinematic-vignette opacity-90" />
                  <MapGrid />
                  <RadarPing />
                  <DataStream />
                  <StaticNoise />
                  <Scanlines />
                  <LensEffect />
                  {scene.id === 4 && (
                    <>
                      <PredictivePath />
                      <PipelineOverlay />
                    </>
                  )}
                  {scene.id === 5 && <RobustDataOverlay />}
                </motion.div>
              </AnimatePresence>
           </div>

           {/* Tactical Map Overlays */}
           <div className="relative z-10 flex-1 flex flex-col p-6 pointer-events-none">
              {/* Sector Identification Grid */}
              <div className="absolute inset-0 opacity-[0.05] border border-brand-blue/30 grid grid-cols-4 grid-rows-4 pointer-events-none">
                 {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border-r border-b border-brand-blue/20 flex items-start p-1">
                       <span className="text-[6px] font-mono text-brand-blue/40 uppercase">SEC-{(i + 1).toString().padStart(2, '0')}</span>
                    </div>
                 ))}
              </div>

              <div className="flex justify-between z-20 pointer-events-auto">
                 <div className="space-y-1">
                    <RegionLabel text="LAGOS-IBADAN HIGHWAY" status="SECURE" onClick={() => goToScene(0)} />
                    <RegionLabel text="ABUJA-KADUNA CORRIDOR" status={currentIdx > 0 && currentIdx < 7 ? "TARGET_LOCKED" : "SECURE"} alert={currentIdx > 0 && currentIdx < 7} onClick={() => goToScene(1)} />
                    <RegionLabel text="PORT HARCOURT / DELTA" status="STEADY_SCAN" onClick={() => goToScene(0)} />
                    <RegionLabel text="ZAMFARA FOREST ZONE" status="STEADY_SCAN" onClick={() => goToScene(0)} />
                 </div>

                 <div className="flex flex-col items-end gap-2">
                    <div className="p-3 border border-brand-border bg-black/60 backdrop-blur-sm tactical-corners">
                       <span className="text-[8px] uppercase text-white/30 block mb-1">Center Coordinates</span>
                       <span className="text-xs font-mono text-white font-bold">{scene.coordinates || '9.0765° N / 7.3986° E'}</span>
                    </div>
                    <div className="text-[9px] text-brand-blue bg-brand-blue/10 px-2 py-1 border border-brand-blue/30 uppercase tracking-[0.2em]">Geospatial Link: Active</div>
                 </div>
              </div>

              {/* CENTRAL TARGETING / HUD */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <HUDReticles active={scene.overlayType !== 'none'} />
              </div>

              {/* MOVING ASSETS */}
              <TacticalAsset x="30%" y="40%" label="TRK_OBJ_44X" color="brand-alert" status="Locked" onClick={() => goToScene(1)} />
              <TacticalAsset x="65%" y="60%" label="DRN_SENTINEL_01" color="brand-blue" isDrone status="Transmitting" onClick={() => goToScene(3)} />
              <TacticalAsset x="15%" y="75%" label="DRN_SENTINEL_02" color="brand-blue" isDrone status="Monitoring" onClick={() => goToScene(2)} />
              <TacticalAsset x="80%" y="25%" label="DRN_SENTINEL_03" color="brand-blue" isDrone status="Low Battery" onClick={() => goToScene(4)} />
              
              <div className="mt-auto pointer-events-auto">
                 <div className="flex justify-between items-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      key={scene.id + 'desc'}
                      className="max-w-xl bg-black/40 p-6 backdrop-blur-md border border-brand-border/30 tactical-corners"
                    >
                       <div className="flex items-center gap-2 mb-2">
                          <Zap size={14} className="text-brand-blue animate-pulse" />
                          <span className="text-[10px] font-mono text-brand-blue/80 uppercase tracking-widest">{scene.subtitle}</span>
                       </div>
                       <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">{scene.title}</h1>
                       <p className="text-brand-green/60 text-sm leading-relaxed font-tactical">{scene.description}</p>
                    </motion.div>

                    <div className="flex gap-3 pointer-events-auto pb-4">
                       <button onClick={prevScene} className="w-12 h-12 border border-brand-border flex items-center justify-center hover:bg-brand-green/10 transition-colors">
                          <ChevronLeft />
                       </button>
                       <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 border border-brand-green bg-brand-green/10 flex items-center justify-center text-brand-green hover:bg-brand-green/20">
                          {isPlaying ? <Pause /> : <Play />}
                       </button>
                       <button onClick={nextScene} className="w-12 h-12 border border-brand-border flex items-center justify-center hover:bg-brand-green/10 transition-colors">
                          <ChevronRight />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* RIGHT PANEL: AI INTELLIGENCE & ALERTS */}
        <aside className="w-80 border-l border-brand-border flex flex-col p-4 bg-brand-bg-panel/95 z-50 sidebar-panel relative overflow-hidden">
           <div className="flex items-center gap-2 mb-6 border-b border-brand-border pb-2">
              <Cpu size={14} className="text-brand-alert" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-alert">AI Intelligence Engine</span>
           </div>
           <AnimatePresence mode="wait">
             {scene.id === 1 || scene.id === 8 ? (
               <motion.div
                 key="dashboard-overview"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6 flex-1 flex flex-col"
               >
                 <section className="p-4 border border-brand-blue bg-brand-blue/5 tactical-corners">
                   <div className="text-[10px] text-brand-blue font-bold uppercase mb-4 tracking-widest">National Grid Overview</div>
                   <div className="space-y-4">
                      <ProgressBar label="GRID CONNECTIVITY" value={98} />
                      <ProgressBar label="DATA LATENCY" value={12 + (tick % 5)} unit="ms" color="bg-brand-blue" />
                      <ProgressBar label="ACTIVE ASSET LOAD" value={64 + (tick % 3)} />
                   </div>
                 </section>
                 <section className="p-4 border border-brand-border bg-black/40 tactical-corners">
                   <div className="text-[9px] text-white/40 uppercase mb-3 tracking-widest font-bold">Federation Metrics</div>
                   <div className="grid grid-cols-2 gap-4">
                      <Metric label="Sectors" value="24/24" color="text-brand-green" />
                      <Metric label="Uptime" value="99.99%" color="text-brand-green" />
                      <Metric label="Auth Level" value="L5_ADMIN" color="text-brand-blue" />
                      <Metric label="Signal" value="OPTIMAL" color="text-brand-green" />
                   </div>
                 </section>
               </motion.div>
             ) : scene.id === 2 ? (
               <motion.div
                 key="alert-details"
                 initial={{ x: 320 }}
                 animate={{ x: 0 }}
                 exit={{ x: 320 }}
                 className="space-y-6 flex-1 flex flex-col"
               >
                 <section className="p-4 border border-brand-alert bg-brand-alert/10 tactical-corners">
                    <h3 className="text-brand-alert font-bold text-xs uppercase mb-4 tracking-widest">Unusual Movement Detected</h3>
                    <div className="space-y-4 font-mono text-[10px]">
                       <Metric label="Location" value={scene.location} color="text-white" />
                       <Metric label="Timestamp" value="02:14:11 AM" color="text-white" />
                       <Metric label="Confidence" value="87%" />
                       <Metric label="Risk Level" value="HIGH" color="text-brand-alert shadow-alert" />
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                       <button onClick={() => goToScene(2)} className="w-full py-2 bg-brand-alert text-black font-bold text-[9px] uppercase tracking-widest hover:bg-brand-alert/80 transition-colors">Track Object</button>
                       <button onClick={() => goToScene(4)} className="w-full py-2 border border-brand-alert text-brand-alert font-bold text-[9px] uppercase tracking-widest hover:bg-brand-alert/10 transition-colors">View Analysis</button>
                    </div>
                 </section>
               </motion.div>
             ) : scene.id === 3 ? (
               <motion.div
                 key="drone-telemetry"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6 flex-1 flex flex-col"
               >
                 <section className="p-4 border border-brand-blue bg-brand-blue/10 tactical-corners">
                   <div className="text-[10px] text-brand-blue font-bold uppercase mb-4 tracking-widest flex items-center justify-between">
                      <span>UAV Telemetry</span>
                      <span className="text-[8px] animate-pulse">LIVE</span>
                   </div>
                   <div className="space-y-4">
                      <ProgressBar label="SIGNAL STRENGTH" value={82 + (tick % 8)} />
                      <ProgressBar label="BATTERY RESERVE" value={64} />
                      <ProgressBar label="WIND RESISTANCE" value={15 + (tick % 4)} unit="kts" />
                   </div>
                   <div className="mt-6 pt-4 border-t border-brand-blue/20 grid grid-cols-2 gap-y-3 font-mono text-[9px]">
                      <div className="flex flex-col">
                         <span className="text-white/30 uppercase text-[7px]">Azimuth</span>
                         <span className="text-white">182.4°</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-white/30 uppercase text-[7px]">Pitch</span>
                         <span className="text-white">-2.1°</span>
                      </div>
                   </div>
                 </section>
               </motion.div>
             ) : scene.id === 4 ? (
              <motion.div
                key="tracking-logistics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col"
              >
                 <DroneSchematic />
                 <section className="p-4 border border-brand-alert/30 bg-brand-alert/5 tactical-corners">
                    <div className="text-[10px] text-brand-alert font-bold uppercase mb-4 tracking-widest">Intercept Logistics</div>
                    <div className="space-y-4">
                       <ProgressBar label="LOCKED TARGETS" value={100} color="bg-brand-alert" />
                       <ProgressBar label="SUCCESS PROBABILITY" value={92} />
                       <ProgressBar label="PATH OVERLAP" value={78} color="bg-brand-blue" />
                    </div>
                 </section>
              </motion.div>
             ) : scene.id === 5 ? (
               <motion.div
                key="ai-analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 flex-1 flex flex-col"
               >
                 <section className="p-4 border border-brand-blue/30 bg-brand-blue/5 tactical-corners">
                    <div className="text-[10px] text-brand-blue font-bold uppercase mb-4 tracking-widest">Pipeline Infrastructure Analysis</div>
                    <div className="space-y-4">
                       <ProgressBar label="HOT-TAP PROBABILITY" value={94} color="bg-brand-alert" />
                       <ProgressBar label="THERMAL ANOMALY (DELTA)" value={82} />
                       <ProgressBar label="PRESSURE DEVIATION" value={14} unit=" PSI" />
                    </div>
                    <div className="mt-6 p-2 bg-black/40 border border-brand-blue/10 font-mono text-[7px] text-brand-blue/60 leading-relaxed italic">
                       Spectral signature matches industrial drilling equipment at Sector P-42 (Niger Delta). AI correlation suggests coordinated theft activity along ELPS-II corridor.
                    </div>
                 </section>
 
                 <section className="p-4 border border-brand-green/20 bg-brand-green/5 tactical-corners">
                    <div className="text-[9px] text-brand-green font-bold uppercase mb-3 tracking-widest">Federal Infrastructure Health</div>
                    <div className="grid grid-cols-2 gap-4">
                       <Metric label="Cathodic (ELPS)" value="OPTIMAL" />
                       <Metric label="Daily Flow" value="1.2M BPD" />
                    </div>
                 </section>
               </motion.div>
             ) : scene.id === 6 ? (
               <motion.div
                 key="response-coordination"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="space-y-6 flex-1 flex flex-col"
               >
                 <section className="p-4 border border-brand-green bg-brand-green/10 tactical-corners">
                    <h3 className="text-brand-green font-bold text-xs uppercase mb-4 tracking-widest">Tactical Coordination</h3>
                    <div className="space-y-4 font-mono text-[10px]">
                       <Metric label="Response Unit" value="NSCDC OMEGA-1" color="text-white" />
                       <Metric label="Support" value="POLICE AIR-WING" color="text-white" />
                       <Metric label="Comm Link" value="ENCRYPTED P25" />
                       <Metric label="ETA to Target" value="04:22 MIN" color="text-brand-green" />
                    </div>
                    <div className="mt-6 py-3 border-t border-brand-green/20">
                       <div className="text-[8px] text-white/40 uppercase mb-2">Ground Instructions</div>
                       <div className="text-[10px] text-brand-green italic leading-tight">Intercept vector confirmed at Sector G-9. Sentinel-01 providing high-altitude eyes-on until contact.</div>
                    </div>
                 </section>
               </motion.div>
             ) : (
               <motion.div
                 key="mission-resolution"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="space-y-6 flex-1 flex flex-col"
               >
                 <section className="p-4 border border-brand-green bg-brand-green/10 tactical-corners">
                   <h3 className="text-brand-green font-bold text-[10px] uppercase mb-4 tracking-widest flex justify-between">
                      <span>AAR: After Action Report</span>
                      <ShieldCheck size={12} />
                   </h3>
                   <div className="space-y-4">
                      <Metric label="Mission Class" value="S-TIER SECURE" color="text-brand-green" />
                      <Metric label="Threat Neutralized" value="YES" color="text-brand-green" />
                      <Metric label="Agency Feedback" value="EXCELENT" color="text-brand-green" />
                      <Metric label="System Integrity" value="100.0%" color="text-brand-blue" />
                   </div>
                   <div className="mt-8 p-3 bg-brand-green/20 border border-brand-green/40 text-[9px] text-brand-green italic font-tactical">
                      Mission completed successfully according to national security directives. All assets accounted for.
                   </div>
                 </section>
               </motion.div>
             )}
           </AnimatePresence>
        </aside>
      </main>

      {/* BOTTOM PANEL: OPERATIONS TIMELINE */}
      <footer className="h-20 border-t border-brand-border bg-brand-bg-panel/90 backdrop-blur-md flex items-center px-6 gap-8 z-[110] relative">
         <div className="flex items-center gap-3 shrink-0">
            <Clock size={16} className="text-white/30" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">Ops Timeline</span>
         </div>
         
         <div className="flex-1 flex items-center gap-6 overflow-hidden">
            <TimelineItem time="02:00" text="Baseline Monitoring" status="RESOLVED" active={currentIdx >= 0} onClick={() => goToScene(0)} />
            <ArrowRight size={14} className="text-white/20 shrink-0" />
            <TimelineItem time="02:14" text="Anomaly DETECTED" status={currentIdx >= 1 ? "ACTIVE" : "PENDING"} active={currentIdx >= 1} onClick={() => goToScene(1)} />
            <ArrowRight size={14} className="text-white/20 shrink-0" />
            <TimelineItem time="02:18" text="Target LOCK-ON" status={currentIdx >= 3 ? "ACTIVE" : "PENDING"} active={currentIdx >= 3} onClick={() => goToScene(3)} />
            <ArrowRight size={14} className="text-white/20 shrink-0" />
            <TimelineItem time="02:25" text="Response UNIT Dispatch" status={currentIdx >= 5 ? "ACTIVE" : "PENDING"} active={currentIdx >= 5} onClick={() => goToScene(5)} />
            <ArrowRight size={14} className="text-white/20 shrink-0" />
            <TimelineItem time="02:30" text="Mission COMPLETED" status={currentIdx >= 6 ? "RESOLVED" : "PENDING"} active={currentIdx >= 6} onClick={() => goToScene(6)} />
         </div>

         <div className="shrink-0 flex items-center gap-4 border-l border-brand-border pl-8 text-[10px] font-mono text-white/40 cursor-help group">
            <div className="flex items-center gap-2 group-hover:text-brand-blue transition-colors">
               <span className="status-dot animate-pulse" /> ENCRYPTION: ACTIVE
            </div>
            <div className="text-brand-green/60 tracking-[0.2em] group-hover:text-brand-green transition-colors">Sentinel-NGA Core Operations</div>
         </div>
      </footer>

      {/* FINAL TEXT OVERLAY */}
      <AnimatePresence>
        {scene.finalText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-brand-bg-dark/95 backdrop-blur-2xl"
          >
            <div className="text-center max-w-4xl px-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <div className="text-[10px] text-brand-blue/60 tracking-[0.8em] font-mono mb-12 uppercase glow-blue italic">National Defense Intelligence Directive</div>
                 <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white leading-tight uppercase font-sans">
                  {scene.finalText.split('.').map((s, i) => (
                    <span key={i} className="block last:text-brand-green mt-2">{s.trim()}{i < 2 ? '.' : ''}</span>
                  ))}
                </h2>
                <div className="h-1 w-24 bg-brand-green mx-auto mb-12" />
                <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-mono">End of Transmission // Sentinel Nigeria // GSRC-V2.0</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DroneSchematic() {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="p-4 border border-brand-blue/30 bg-brand-blue/5 mb-4 tactical-corners relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-1">
         <Radio size={10} className="text-brand-blue animate-ping" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plane size={14} className="text-brand-blue" />
          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">SENTINEL-01 HALE</span>
        </div>
        <span className="text-[8px] font-mono text-brand-green">UPLINK_READY</span>
      </div>
      
      <div className="relative aspect-square border border-brand-blue/10 flex items-center justify-center overflow-hidden bg-black/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(0,180,255,1)_0%,rgba(0,0,0,1)_100%)]" />
        
        {/* Animated HUD Rings */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="w-[90%] h-[90%] absolute border-[0.5px] border-brand-blue/20 rounded-full border-dashed"
        />
        <motion.div
           animate={{ rotate: -360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="w-[70%] h-[70%] absolute border-[0.5px] border-brand-blue/10 rounded-full"
        />

        <div className="relative z-10 flex flex-col items-center">
           <Plane size={80} className="text-brand-blue/90 drop-shadow-[0_0_20px_rgba(0,180,255,0.4)] -rotate-45" />
           {/* Scan lines over drone */}
           <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              <motion.div 
                animate={{ y: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-px bg-brand-blue" 
              />
           </div>
        </div>

        {/* Data Callouts */}
        <div className="absolute top-2 left-2 text-[6px] font-mono text-brand-blue/60">SENS_UNIT_04: OK</div>
        <div className="absolute bottom-2 right-2 text-[6px] font-mono text-brand-blue/60">GIMBAL_LOCK: TRUE</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 font-mono text-[9px]">
        <div className="flex flex-col">
          <span className="text-white/20 uppercase tracking-tighter">Altitude</span>
          <span className="text-brand-blue font-bold">55,200 FT</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/20 uppercase tracking-tighter">Velocity</span>
          <span className="text-brand-blue font-bold">780 km/h</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/20 uppercase tracking-tighter">Fuel Cell</span>
          <span className="text-brand-green font-bold">88.4%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/20 uppercase tracking-tighter">Loiter T</span>
          <span className="text-brand-alert font-bold">14.6 HRS</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-brand-blue/10">
         <div className="flex justify-between items-center text-[7px] text-brand-blue/40 uppercase">
            <span>Payload Status</span>
            <span>Optics / SAR / SIGINT</span>
         </div>
      </div>
    </motion.div>
  );
}

function FeedWindow({ label, img, active = false, tag = "LIVE", style = "", onClick }: { label: string, img: string, active?: boolean, tag?: string, style?: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`tactical-border bg-black/60 overflow-hidden group border-brand-border/40 relative cursor-pointer transition-all hover:border-brand-blue/60 ${active ? 'ring-1 ring-brand-blue/30 border-brand-blue/50' : ''}`}
    >
      <div className="absolute top-1 left-1 z-20 flex justify-between w-full pr-4 text-[7px] font-mono pointer-events-none">
        <span className={`${active ? 'text-brand-blue' : 'text-white/40'} tracking-widest`}>{label}</span>
      </div>
      <div className="aspect-video relative overflow-hidden bg-brand-bg-dark">
         <img src={img} className={`w-full h-full object-cover transition-opacity duration-500 ${active ? 'opacity-90' : 'opacity-40 grayscale group-hover:opacity-70'} ${style}`} referrerPolicy="no-referrer" />
         <div className="absolute inset-x-2 bottom-2 z-20 flex justify-between items-center text-[7px] font-bold">
            <span className={`${active ? 'text-brand-blue' : 'text-white/40'}`}>REL_T: +01:42s</span>
            <span className={`${active ? 'bg-brand-blue' : 'bg-white/20'} text-black px-1 uppercase`}>{tag}</span>
         </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, unit = "%", color = "bg-brand-green" }: { label: string, value: number, unit?: string, color?: string }) {
  return (
    <div className="text-[8px] font-mono space-y-1">
      <div className="flex justify-between opacity-50 uppercase tracking-widest">
        <span>{label}</span>
        <span>{value}{unit}</span>
      </div>
      <div className="h-[2px] w-full bg-brand-border/30">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function RegionLabel({ text, status, alert = false, onClick }: { text: string, status: string, alert?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 p-2 bg-black/40 border-l border-brand-border/30 backdrop-blur-sm transition-all cursor-pointer hover:bg-black/60 hover:border-r hover:border-brand-blue/20 ${alert ? 'border-brand-alert' : ''}`}
    >
      <div className={`w-1 h-3 ${alert ? 'bg-brand-alert animate-pulse' : 'bg-brand-green/40'}`} />
      <div className="flex flex-col">
        <span className="text-[10px] text-white/70 font-bold tracking-tight uppercase">{text}</span>
        <span className={`text-[8px] font-mono tracking-widest ${alert ? 'text-brand-alert' : 'text-brand-green'}`}>{status}</span>
      </div>
    </div>
  );
}

function Metric({ label, value, color = "text-brand-green" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-1 last:border-0 mb-1">
      <span className="text-white/30 uppercase tracking-tighter text-[9px]">{label}</span>
      <span className={`${color} font-bold tracking-tight`}>{value}</span>
    </div>
  );
}

function AlertCard({ type, text, score, danger = false, onClick }: { type: string, text: string, score: string, danger?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`p-3 bg-black/40 border border-brand-border/30 relative group transition-all cursor-pointer hover:bg-brand-alert/10 hover:border-brand-alert/60 ${danger ? 'border-brand-alert' : ''}`}
    >
      <div className="flex justify-between items-center mb-1 text-[8px] font-mono">
        <span className={danger ? 'text-brand-alert font-bold' : 'text-brand-blue'}>{type} ALRT</span>
        <span className="opacity-40">{score} CONF</span>
      </div>
      <div className="text-[10px] text-white/70 italic leading-snug">{text}</div>
      <div className="absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={12} className={danger ? 'text-brand-alert' : 'text-brand-blue'} />
      </div>
    </div>
  );
}

function TimelineItem({ time, text, status, active = false, onClick }: { time: string, text: string, status: string, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col gap-1 shrink-0 cursor-pointer transition-all hover:opacity-100 ${active ? 'opacity-100' : 'opacity-40'}`}
    >
      <div className="flex items-center gap-2">
         <span className="text-[9px] font-mono text-white/60">{time}</span>
         <span className={`text-[7px] font-bold px-1 py-0.5 border ${status === 'RESOLVED' ? 'border-brand-green text-brand-green' : active ? 'border-brand-blue text-brand-blue' : 'border-white/20 text-white/40'}`}>
           {status}
         </span>
      </div>
      <div className="text-[10px] font-bold text-white uppercase tracking-tight">{text}</div>
    </div>
  );
}

function TacticalAsset({ x, y, label, color, isDrone = false, status = "Monitoring", onClick }: { x: string, y: string, label: string, color: string, isDrone?: boolean, status?: string, onClick?: () => void }) {
  const getStatusColor = () => {
    switch(status.toLowerCase()) {
      case 'transmitting': return 'text-brand-blue';
      case 'low battery': return 'text-brand-alert';
      default: return 'text-brand-green';
    }
  };

  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute flex items-center gap-3 cursor-pointer z-20 group"
      style={{ left: x, top: y }}
      onClick={onClick}
    >
      <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all group-hover:scale-110 ${isDrone ? 'border-brand-blue bg-brand-blue/10 rounded-sm' : 'border-brand-alert bg-brand-alert/10 rotate-45'}`}>
        {isDrone ? <Target size={12} className="text-brand-blue" /> : <Radar size={12} className="text-brand-alert" />}
        {isDrone && (
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${status === 'Low Battery' ? 'bg-brand-alert' : 'bg-brand-green'} blur-[1px]`}
          />
        )}
      </div>
      <div className="flex flex-col drop-shadow-md">
        <span className={`text-[8px] font-bold px-1 bg-black/80 border leading-none py-0.5 ${isDrone ? 'border-brand-blue text-brand-blue' : 'border-brand-alert text-brand-alert'}`}>
          {label} {isDrone && <span className="opacity-40 ml-1">#0{label.slice(-1)}</span>}
        </span>
        <div className="flex items-center gap-1 mt-0.5">
           <span className={`text-[6px] font-mono tracking-widest uppercase ${getStatusColor()}`}>{status}</span>
           <span className="w-1 h-1 bg-white/20 rounded-full" />
           <span className="text-[6px] font-mono text-white/30 truncate max-w-[40px]">SEC_GRID</span>
        </div>
      </div>
    </motion.div>
  );
}

function HUDReticles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="relative w-[32vw] h-[32vh] pointer-events-none opacity-40">
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-green/60" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-green/60" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-brand-green/60" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-green/60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="w-20 h-20 text-brand-green/40 animate-pulse" />
      </div>
      <div className="absolute top-[20%] left-[-20px] h-[60%] w-px bg-white/10" />
      <div className="absolute top-[-20px] left-[20%] w-[60%] h-px bg-white/10" />
    </div>
  );
}
