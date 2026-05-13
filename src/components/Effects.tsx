/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export const RadarPing = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
          className="absolute inset-0 border border-brand-blue/30 rounded-full"
        />
      ))}
    </div>
  );
};

export const MapGrid = () => {
  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-10">
      {[...Array(144)].map((_, i) => (
        <div key={i} className="border-[0.5px] border-white/20" />
      ))}
    </div>
  );
};

export const DataStream = () => {
  return (
    <div className="absolute top-24 left-8 flex flex-col gap-1 font-mono text-[8px] text-brand-green/40 opacity-50">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        >
          {`SYS_LOG_${Math.random().toString(36).substring(7).toUpperCase()}_EXECUTED_0.00${i}`}
        </motion.div>
      ))}
    </div>
  );
};

export const StaticNoise = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay overflow-hidden">
      <motion.div
        animate={{
          y: ["0%", "-100%"]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-full h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"
      />
    </div>
  );
};

export const Scanlines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.05]">
      <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};

export const LensEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Chromatic Aberration Edge */}
      <div className="absolute inset-0 border-[40px] border-black/10 blur-xl pointer-events-none" />
      {/* Grainy Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      {/* Corner Data bits */}
      <div className="absolute top-10 left-10 text-white/20 font-mono text-[8px] space-y-1">
        <div>OPT_SYS: READY</div>
        <div>LENSE: 400MM_VAR</div>
        <div>STAB: ACTIVE</div>
      </div>
      <div className="absolute bottom-10 right-10 text-white/20 font-mono text-[8px] text-right space-y-1">
        <div>EXP: 1/8000</div>
        <div>ISO: 200</div>
        <div>F_STOP: 4.8</div>
      </div>
    </div>
  );
};

export const PipelineOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <svg className="w-full h-full">
        {/* Main Pipeline ELPS-II */}
        <motion.path
          d="M 100 800 Q 400 400 900 100"
          fill="none"
          stroke="rgba(0, 180, 255, 0.4)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        {/* Connection points */}
        <circle cx="400" cy="400" r="4" fill="rgba(0, 180, 255, 0.8)" className="animate-pulse" />
        <text x="410" y="405" className="fill-brand-blue font-mono text-[8px] uppercase">Valve_Station_04</text>
        
        <circle cx="700" cy="233" r="4" fill="rgba(255, 60, 60, 0.8)" className="animate-ping" />
        <text x="710" y="238" className="fill-brand-alert font-bold font-mono text-[8px] uppercase tracking-widest">SIGNAL_LOSS: P-42</text>
      </svg>
    </div>
  );
};

export const RobustDataOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
       <div className="w-[500px] h-[300px] border border-brand-blue/20 bg-brand-blue/5 p-4 relative backdrop-blur-sm">
          <div className="absolute -top-3 left-4 bg-brand-blue px-2 py-0.5 text-[8px] text-black font-bold uppercase tracking-widest">Spectral Analysis: ELPS-II</div>
          
          <div className="grid grid-cols-4 gap-2 h-full">
             <div className="col-span-3 space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-black/40 border border-white/5 flex items-center px-3 justify-between font-mono text-[7px]">
                    <span className="text-white/40">CORE_SCAN_0{i+1}: TRUE</span>
                    <motion.div 
                      animate={{ width: [20, 100, 20] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                      className="h-1 bg-brand-blue/40" 
                    />
                    <span className="text-brand-blue">NOMINAL</span>
                  </div>
                ))}
             </div>
             <div className="space-y-4">
                <div className="aspect-square border border-brand-alert bg-brand-alert/10 flex items-center justify-center flex-col p-2 text-center">
                   <AlertTriangle className="text-brand-alert w-10 h-10 mb-2 animate-pulse" />
                   <span className="text-[7px] text-brand-alert font-black uppercase tracking-tighter">Hot-Tap Signature</span>
                   <span className="text-[10px] text-white font-bold">94.2%</span>
                </div>
                <div className="flex-1 border border-brand-blue/20 bg-black/20 p-2 font-mono text-[6px] text-brand-blue leading-tight overflow-hidden">
                   [{new Date().toLocaleTimeString()}] LOCK: 5.592/5.862<br/>
                   [{new Date().toLocaleTimeString()}] TARGET: VANDAL_01<br/>
                   [{new Date().toLocaleTimeString()}] UNIT: OMEGA DISPATCH
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export const PredictivePath = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
      <svg className="w-full h-full opacity-60">
        {/* Actual Path */}
        <motion.path
          d="M 200 600 L 400 500 L 450 420"
          fill="none"
          stroke="rgba(255, 60, 60, 0.4)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        {/* Predicted Path */}
        <motion.path
          d="M 450 420 L 500 350 L 650 300"
          fill="none"
          stroke="rgba(0, 255, 255, 0.6)"
          strokeWidth="3"
          strokeDasharray="10,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          r="4"
          fill="#00ffff"
          animate={{
            offsetDistance: ["0%", "100%"]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ offsetPath: "path('M 450 420 L 500 350 L 650 300')" }}
        />
      </svg>
      <div className="absolute top-[40%] left-[50%] p-2 border border-brand-blue bg-black/80 font-mono text-[8px] text-brand-blue uppercase tracking-widest">
         Vector Prediction: Sector G-9 Intercept
      </div>
    </div>
  );
};
