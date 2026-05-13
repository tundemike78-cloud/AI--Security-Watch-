/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Scene {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  overlayType: 'map' | 'hud' | 'thermal' | 'scanning' | 'none';
  location?: string;
  coordinates?: string;
  alerts?: string[];
  finalText?: string;
}

export const SCENES: Scene[] = [
  {
    id: 1,
    title: "FalconWatch Main Dashboard",
    subtitle: "National Intelligence Grid",
    description: "Real-time monitoring of critical Nigerian corridors. Sentinel-NGA is tracking global positioning signatures and behavioral deviations across the federation.",
    imageUrl: "https://images.unsplash.com/photo-1551808903-5dddf3395bc1?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'map',
    location: "FEDERAL CONTROL HUB",
    coordinates: "9.0765° N, 7.3986° E",
    alerts: ["KADUNA SECTOR: ANOMALY DETECTED"],
  },
  {
    id: 2,
    title: "Alert Details Panel",
    subtitle: "Unusual Movement Detected",
    description: "Tactical isolate on Abuja-Kaduna corridor. High-risk deviation detected at 02:14 AM. Risk level categorized as HIGH based on pattern matching.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'hud',
    location: "ABUJA-KADUNA SECTOR",
    coordinates: "9.5233° N, 7.2111° E",
  },
  {
    id: 3,
    title: "Live Drone Feed",
    subtitle: "Lagos-Ibadan Expressway Sector",
    description: "High-resolution optical monitoring of the Shagamu interchange. AI cross-referencing behavioral data with automated plate recognition on the nation's primary transit artery.",
    imageUrl: "https://images.unsplash.com/photo-1541014029215-68078ec90967?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'hud',
    location: "SHAGAMU INTERCHANGE",
    coordinates: "6.7322° N, 3.7844° E",
  },
  {
    id: 4,
    title: "Tracking Mode",
    subtitle: "ELPS-II Pipeline Corridor",
    description: "Tracking high-risk signatures along the Escravos-Lagos Pipeline System. AI cross-referencing thermal data with ground-based acoustic sensors for leak and theft detection.",
    imageUrl: "https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'scanning',
    location: "NIGER DELTA BASIN",
    coordinates: "5.5920° N, 5.8620° E",
  },
  {
    id: 5,
    title: "AI Analysis Panel",
    subtitle: "Theft Pattern Detection",
    description: "AI identifying high-risk excavation patterns near ELPS-II infrastructure. Spectral analysis matching 'Hot-Tap' signatures. Cluster detection 94% probability of unauthorized access.",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4af6b1d4970a?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'thermal',
    location: "ANALYTICS HUB",
    alerts: ["CRITICAL: HOT-TAP SIGNATURE", "SECTOR P-42 LOCKED"],
  },
  {
    id: 6,
    title: "Response Coordination",
    subtitle: "Inter-Agency Tactical Dispatch",
    description: "Coordinating NSCDC Tactical Units and Highway Patrol intercepts. Live tracking shared with ground assets via FalconLink. Intercept vector confirmed.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'map',
    location: "KADUNA-ABUJA AXIS",
    alerts: ["NSCDC TACTICAL DEPLOYED", "POLICE AIR-WING ACTIVE"],
  },
  {
    id: 7,
    title: "Resolution",
    subtitle: "Operation Completed",
    description: "Individuals secured and mission objectives achieved. System returns to baseline monitoring. Operational integrity verified across all sectors.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'none',
    location: "SECURE ZONE",
    alerts: ["STATUS: RESOLVED"],
  },
  {
    id: 8,
    title: "Strategic Vision",
    subtitle: "Sentinel-NGA Network",
    description: "Securing the future of the federation through 24/7 AI-driven intelligence and high-altitude surveillance.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
    overlayType: 'map',
    location: "NATION-WIDE COVERAGE",
    finalText: "AI-Powered Intelligence. Real-Time Protection. Safer Nations.",
  },
];
