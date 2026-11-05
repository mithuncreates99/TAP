import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CrmWorkflowDemo, OperationsAnalyticsDemo } from './PortfolioDemos';
import {
  Camera,
  Sparkles,
  Award,
  BarChart3,
  Database,
  Workflow,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Aperture,
  Sliders,
  Play,
  RotateCcw,
  Eye,
  Code2,
  MapPin,
  Mail,
  Linkedin,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Users,
  Focus,
  Upload,
  Film
} from 'lucide-react';

// ============================================================================
// STEP 4: CONFIGURABLE SHUTTER & ZONE TIMESTAMPS (9.0s Calibrated Videos)
// ============================================================================
export const VIDEO_TIMESTAMPS = {
  // hero_left_center.mp4 (0.0s -> 5.0s: Turns Left, aims at 3.0s, shutter click at 3.85s, returns center at 5.0s)
  LEFT_START: 0.0,
  LEFT_SHUTTER: 3.85,
  LEFT_END: 5.0,

  // hero_left_center.mp4 (5.0s -> 9.0s: Center pose, aims straight ahead at 5.8s, shutter click at 6.65s, smiles 8.0s-9.0s)
  CENTER_START: 5.0,
  CENTER_SHUTTER: 6.65,
  CENTER_END: 9.0,

  // hero_right.mp4 (0.0s -> 9.0s: Turns Right at 1.8s, aims at 3.0s, shutter click at 4.35s, returns center & smiles 7.0s-9.0s)
  RIGHT_START: 0.0,
  RIGHT_SHUTTER: 4.35,
  RIGHT_END: 9.0,
};

// Multi-path Git auto-discovery candidates (supports root, relative GitHub Pages, and original Gemini filenames)
export const GIT_VIDEO_CANDIDATES = {
  leftCenter: ['./assets/hero_left_center.mp4', './assets/gemini_generated_video_b0465794.mp4'],
  right: ['./assets/hero_right.mp4', './assets/gemini_generated_video_5905eec7.mp4'],
};

const PROOF_CARDS = {
  LEFT: {
    id: 'LEFT',
    zoneLabel: 'INDEPENDENT DEMO • CRM WORKFLOW',
    badge: 'Synthetic lead data • Personal build',
    title: 'CRM Lead Routing & SLA Simulator',
    description:
      'A self-directed demonstration of lead capture, qualification, ownership routing and follow-up logic. It uses fictional contacts and runs locally in the browser; it is not connected to an employer system.',
    metric: 'Fictional records • No employer data or systems',
    accent: 'border-blue-500/40 bg-white/85 text-slate-900',
    pillColor: 'bg-blue-600 text-white',
  },
  CENTER: {
    id: 'CENTER',
    zoneLabel: 'PERSONAL PROFILE • HONORS & DISTINCTION',
    badge: 'Academic & Creative Recognition',
    title: '9+ MUN Press Awards, 8.91 GPA & VP Leadership',
    description:
      'B.Tech in Computer Science & Business Systems (8.91/10 GPA, SRM IST), IIBA AI-Powered Business Analyst Professional, Vice President of Camogenics & CSE, and 9x MUN Photojournalism Award Winner.',
    metric: '8.91/10 GPA • 9+ MUN Awards • IIBA Certified',
    accent: 'border-amber-500/50 bg-white/90 text-slate-900',
    pillColor: 'bg-amber-500 text-slate-950',
  },
  RIGHT: {
    id: 'RIGHT',
    zoneLabel: 'INDEPENDENT DEMO • OPERATIONS ANALYTICS',
    badge: 'Synthetic operations data • Personal build',
    title: 'Retail Operations & Fulfilment Dashboard',
    description:
      'Explore fictional order, margin and delivery data through regional filters, KPI summaries and SLA trends. This analytics demo was designed independently for this portfolio.',
    metric: 'Synthetic sample data • Independent analysis',
    accent: 'border-emerald-500/40 bg-white/85 text-slate-900',
    pillColor: 'bg-emerald-600 text-white',
  },
};

// ============================================================================
// STEP 3: 60FPS BUTTERFLY CURSOR PHYSICS ENGINE (ButterflyCursor.tsx)
// ============================================================================
function ButterflyCursor({ containerRef, isInsideHero, activeZone, isCapturing }) {
  const cursorDomRef = useRef(null);
  const posRef = useRef({
    targetX: 320,
    targetY: 200,
    currentX: 320,
    currentY: 200,
    vx: 0,
    vy: 0,
    angle: 0,
    flapPhase: 0,
  });

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = containerRef.current;
    if (!container) return;

    const updateTargetFromEvent = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      posRef.current.targetX = clientX - rect.left;
      posRef.current.targetY = clientY - rect.top;
    };

    const handleMouseMove = (e) => updateTargetFromEvent(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updateTargetFromEvent(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('pointermove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    let rafId;
    const lerpFactor = prefersReducedMotion ? 1.0 : 0.14;

    const tick = (timestamp) => {
      const state = posRef.current;
      const dx = state.targetX - state.currentX;
      const dy = state.targetY - state.currentY;

      state.vx = dx * lerpFactor;
      state.vy = dy * lerpFactor;
      state.currentX += state.vx;
      state.currentY += state.vy;

      const speed = Math.hypot(state.vx, state.vy);
      const idleFloatY = prefersReducedMotion ? 0 : Math.sin(timestamp * 0.0045) * 4.5;
      const idleFloatX = prefersReducedMotion ? 0 : Math.cos(timestamp * 0.003) * 2.5;

      const desiredBank = Math.max(-28, Math.min(28, state.vx * 2.4));
      state.angle += (desiredBank - state.angle) * 0.18;

      const flapSpeed = 0.014 + Math.min(0.035, speed * 0.004);
      state.flapPhase += flapSpeed * 16;
      const wingScaleX = prefersReducedMotion ? 1 : 0.72 + Math.sin(state.flapPhase) * 0.28;

      if (cursorDomRef.current) {
        const finalX = state.currentX + idleFloatX - 20;
        const finalY = state.currentY + idleFloatY - 20;
        cursorDomRef.current.style.transform = `translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0) rotate(${state.angle.toFixed(1)}deg)`;
        const wingNode = cursorDomRef.current.querySelector('[data-wing-rig]');
        if (wingNode) {
          wingNode.style.transform = `scaleX(${wingScaleX.toFixed(2)})`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('pointermove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorDomRef}
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 left-0 z-50 w-10 h-10 transition-opacity duration-200 ${
        isInsideHero ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Optical Target Ring around Butterfly */}
      <div
        className={`absolute -inset-2 rounded-full border transition-all duration-300 ${
          isCapturing
            ? 'border-amber-400 scale-125 bg-amber-400/20 shadow-[0_0_20px_rgba(245,158,11,0.7)]'
            : 'border-amber-500/40 scale-100'
        }`}
      />
      <div
        data-wing-rig
        className="w-full h-full flex items-center justify-center drop-shadow-[0_4px_12px_rgba(245,158,11,0.55)]"
      >
        <svg viewBox="0 0 64 64" className="w-9 h-9 overflow-visible">
          <defs>
            <linearGradient id="bfGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="bfRoyal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path
            d="M31 30 C19 8, 2 7, 5 24 C7 34, 20 35, 31 32 Z"
            fill="url(#bfGold)"
            stroke="#FFFBEB"
            strokeWidth="1.3"
          />
          <path
            d="M33 30 C45 8, 62 7, 59 24 C57 34, 44 35, 33 32 Z"
            fill="url(#bfGold)"
            stroke="#FFFBEB"
            strokeWidth="1.3"
          />
          <path
            d="M31 34 C18 36, 9 47, 15 55 C20 60, 28 49, 31 36 Z"
            fill="url(#bfRoyal)"
            stroke="#EFF6FF"
            strokeWidth="1.1"
          />
          <path
            d="M33 34 C46 36, 55 47, 49 55 C44 60, 36 49, 33 36 Z"
            fill="url(#bfRoyal)"
            stroke="#EFF6FF"
            strokeWidth="1.1"
          />
          <rect x="30.6" y="21" width="2.8" height="21" rx="1.4" fill="#0F172A" />
        </svg>
      </div>
      <span className="mt-0.5 block text-center text-[9px] font-mono font-bold uppercase tracking-widest text-amber-900 bg-white/85 px-1.5 py-0.5 rounded shadow-sm border border-amber-500/30">
        {activeZone}
      </span>
    </div>
  );
}

// ============================================================================
// STEP 4: DUAL-VIDEO CHARACTER CAPTURE STATE MACHINE (HeroVideoStage.tsx)
// ============================================================================
function HeroVideoStage({ onSelectProofCard, activeProofCard, unlockedZones }) {
  const stageRef = useRef(null);
  const leftCenterVideoRef = useRef(null);
  const rightVideoRef = useRef(null);

  const [isInsideHero, setIsInsideHero] = useState(false);
  const [activeZone, setActiveZone] = useState('CENTER');
  const [activeVideoLayer, setActiveVideoLayer] = useState('LEFT_CENTER'); // 'LEFT_CENTER' | 'RIGHT'
  const [isCapturing, setIsCapturing] = useState(false);
  const [shutterFlashKey, setShutterFlashKey] = useState(0);
  const [currentTimeTelemetry, setCurrentTimeTelemetry] = useState(5.0);
  const [videoLoadStatus, setVideoLoadStatus] = useState({
    leftCenterLoaded: false,
    rightLoaded: false,
    leftCenterSrc: GIT_VIDEO_CANDIDATES.leftCenter[0],
    rightSrc: GIT_VIDEO_CANDIDATES.right[0],
  });
  const [candidateIndex, setCandidateIndex] = useState({ leftCenter: 0, right: 0 });
  const [showInspector, setShowInspector] = useState(false);
  const [isStagePlaying, setIsStagePlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  // Hysteresis & Dwell-time refs
  const currentZoneRef = useRef('CENTER');
  const pendingZoneRef = useRef(null);
  const dwellTimerRef = useRef(null);
  const captureTimerRef = useRef(null);
  const objectUrlsRef = useRef({ leftCenter: null, right: null });
  const userActivatedRef = useRef(false);
  const touchStartRef = useRef(null);
  const pendingSeekRef = useRef({ leftCenter: null, right: null });
  const shutterTriggeredInCycleRef = useRef(false);

  useEffect(() => {
    return () => {
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
      if (captureTimerRef.current) clearTimeout(captureTimerRef.current);
      Object.values(objectUrlsRef.current).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  // Request playback synchronously from the user's tap. Do not gate this on
  // React's loaded flag: iOS may ignore preload hints until play() is requested.
  const playZoneSegment = useCallback((targetZone) => {
    userActivatedRef.current = true;
    shutterTriggeredInCycleRef.current = false;
    currentZoneRef.current = targetZone;

    const isRight = targetZone === 'RIGHT';
    const video = isRight ? rightVideoRef.current : leftCenterVideoRef.current;
    const otherVideo = isRight ? leftCenterVideoRef.current : rightVideoRef.current;
    const videoKey = isRight ? 'right' : 'leftCenter';
    const startAt = isRight
      ? VIDEO_TIMESTAMPS.RIGHT_START
      : targetZone === 'LEFT'
        ? VIDEO_TIMESTAMPS.LEFT_START
        : VIDEO_TIMESTAMPS.CENTER_START;

    setActiveVideoLayer(isRight ? 'RIGHT' : 'LEFT_CENTER');
    setPlaybackError(false);
    if (otherVideo) otherVideo.pause();
    if (!video) return;

    // Queue the seek if metadata is not ready yet. Calling play() now, in the
    // same user gesture, lets mobile Safari begin loading instead of waiting
    // for a later load event that no longer has user activation.
    if (video.readyState >= 1) {
      pendingSeekRef.current[videoKey] = null;
      try {
        video.currentTime = startAt;
      } catch {
        pendingSeekRef.current[videoKey] = startAt;
      }
    } else {
      pendingSeekRef.current[videoKey] = startAt;
      if (video.networkState === 0) video.load();
    }

    try {
      const playRequest = video.play();
      if (playRequest && typeof playRequest.then === 'function') {
        playRequest
          .then(() => {
            setIsStagePlaying(true);
            setPlaybackError(false);
          })
          .catch((error) => {
            setIsStagePlaying(false);
            if (error?.name !== 'AbortError') setPlaybackError(true);
          });
      }
    } catch {
      setIsStagePlaying(false);
      setPlaybackError(true);
    }
  }, []);

  // Evaluate horizontal cursor ratio with 4% hysteresis buffer + 150ms dwell check
  const evaluateZoneFromPointer = useCallback(
    (clientX) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      if (!rect.width) return;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

      const current = currentZoneRef.current;
      let nextZone = current;

      // Left (0%-36%), Center (36%-64%), Right (64%-100%) with 4% hysteresis buffer
      if (current === 'LEFT') {
        if (ratio > 0.40 && ratio <= 0.64) nextZone = 'CENTER';
        else if (ratio > 0.64) nextZone = 'RIGHT';
      } else if (current === 'CENTER') {
        if (ratio < 0.32) nextZone = 'LEFT';
        else if (ratio > 0.68) nextZone = 'RIGHT';
      } else if (current === 'RIGHT') {
        if (ratio < 0.60 && ratio >= 0.36) nextZone = 'CENTER';
        else if (ratio < 0.36) nextZone = 'LEFT';
      }

      if (nextZone !== current) {
        if (pendingZoneRef.current !== nextZone) {
          pendingZoneRef.current = nextZone;
          if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
          dwellTimerRef.current = setTimeout(() => {
            currentZoneRef.current = nextZone;
            setActiveZone(nextZone);
            playZoneSegment(nextZone);
          }, 150);
        }
      } else {
        pendingZoneRef.current = null;
        if (dwellTimerRef.current) {
          clearTimeout(dwellTimerRef.current);
          dwellTimerRef.current = null;
        }
      }
    },
    [playZoneSegment]
  );

  // Monitor timeupdate on Left/Center video for exact shutter-click trigger
  const handleLeftCenterTimeUpdate = () => {
    const vid = leftCenterVideoRef.current;
    if (!vid) return;
    const t = vid.currentTime;
    setCurrentTimeTelemetry(t);

    const zone = currentZoneRef.current;
    if (zone === 'LEFT') {
      if (
        !shutterTriggeredInCycleRef.current &&
        t >= VIDEO_TIMESTAMPS.LEFT_SHUTTER &&
        t < VIDEO_TIMESTAMPS.LEFT_END
      ) {
        shutterTriggeredInCycleRef.current = true;
        triggerShutterCapture('LEFT');
      }
      if (t >= VIDEO_TIMESTAMPS.LEFT_END - 0.08) {
        vid.pause();
      }
    } else if (zone === 'CENTER') {
      if (
        !shutterTriggeredInCycleRef.current &&
        t >= VIDEO_TIMESTAMPS.CENTER_SHUTTER &&
        t < VIDEO_TIMESTAMPS.CENTER_END
      ) {
        shutterTriggeredInCycleRef.current = true;
        triggerShutterCapture('CENTER');
      }
      if (t >= VIDEO_TIMESTAMPS.CENTER_END - 0.08) {
        vid.pause();
      }
    }
  };

  // Monitor timeupdate on Right video for exact shutter-click trigger
  const handleRightTimeUpdate = () => {
    const vid = rightVideoRef.current;
    if (!vid) return;
    const t = vid.currentTime;
    setCurrentTimeTelemetry(t);

    if (currentZoneRef.current === 'RIGHT') {
      if (
        !shutterTriggeredInCycleRef.current &&
        t >= VIDEO_TIMESTAMPS.RIGHT_SHUTTER &&
        t < VIDEO_TIMESTAMPS.RIGHT_END
      ) {
        shutterTriggeredInCycleRef.current = true;
        triggerShutterCapture('RIGHT');
      }
      if (t >= VIDEO_TIMESTAMPS.RIGHT_END - 0.08) {
        vid.pause();
      }
    }
  };

  const triggerShutterCapture = (zoneKey) => {
    shutterTriggeredInCycleRef.current = true;
    setIsCapturing(true);
    setShutterFlashKey((prev) => prev + 1);
    onSelectProofCard(zoneKey);
    if (captureTimerRef.current) clearTimeout(captureTimerRef.current);
    captureTimerRef.current = setTimeout(() => {
      setIsCapturing(false);
      captureTimerRef.current = null;
    }, 520);
  };

  // Fallback path cycling if a candidate path 404s
  const handleVideoError = (which) => {
    if (which === 'leftCenter') {
      const nextIdx = candidateIndex.leftCenter + 1;
      if (nextIdx < GIT_VIDEO_CANDIDATES.leftCenter.length) {
        setCandidateIndex((prev) => ({ ...prev, leftCenter: nextIdx }));
        setVideoLoadStatus((prev) => ({
          ...prev,
          leftCenterLoaded: false,
          leftCenterSrc: GIT_VIDEO_CANDIDATES.leftCenter[nextIdx],
        }));
      }
    } else {
      const nextIdx = candidateIndex.right + 1;
      if (nextIdx < GIT_VIDEO_CANDIDATES.right.length) {
        setCandidateIndex((prev) => ({ ...prev, right: nextIdx }));
        setVideoLoadStatus((prev) => ({
          ...prev,
          rightLoaded: false,
          rightSrc: GIT_VIDEO_CANDIDATES.right[nextIdx],
        }));
      }
    }
  };

  // Optional local drag-and-drop MP4 override
  const handleManualFileBind = (which, file) => {
    if (!file) return;
    const previousUrl = objectUrlsRef.current[which];
    if (previousUrl) URL.revokeObjectURL(previousUrl);

    const url = URL.createObjectURL(file);
    objectUrlsRef.current[which] = url;
    if (which === 'leftCenter') {
      setVideoLoadStatus((prev) => ({ ...prev, leftCenterSrc: url, leftCenterLoaded: false }));
    } else {
      setVideoLoadStatus((prev) => ({ ...prev, rightSrc: url, rightLoaded: false }));
    }
  };

  return (
    <div className="relative w-full">
      {/* Main 16:9 Interactive Studio Stage */}
      <div
        ref={stageRef}
        onMouseEnter={() => {
          setIsInsideHero(true);
          if (!userActivatedRef.current) playZoneSegment(currentZoneRef.current);
        }}
        onMouseLeave={() => setIsInsideHero(false)}
        onMouseMove={(e) => evaluateZoneFromPointer(e.clientX)}
        onTouchStart={(e) => {
          const touch = e.touches?.[0];
          if (!touch || e.target.closest('button')) {
            touchStartRef.current = null;
            return;
          }
          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
          setIsInsideHero(true);
          if (!userActivatedRef.current) playZoneSegment(currentZoneRef.current);
        }}
        onTouchMove={(e) => {
          const touch = e.touches?.[0];
          const start = touchStartRef.current;
          if (!touch || !start || e.target.closest('button')) return;

          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          if (Math.abs(deltaX) > Math.abs(deltaY) + 4) {
            evaluateZoneFromPointer(touch.clientX);
          }
        }}
        onTouchEnd={() => {
          touchStartRef.current = null;
          setIsInsideHero(false);
        }}
        onTouchCancel={() => {
          touchStartRef.current = null;
          setIsInsideHero(false);
        }}
        className={`relative w-full touch-pan-y aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden border border-slate-200/90 bg-[#F8FAFC] shadow-[0_25px_70px_-15px_rgba(15,23,42,0.14)] select-none ${
          isInsideHero ? 'cursor-none' : 'cursor-default'
        }`}
      >
        {/* Soft Executive Rim Lighting Backdrop Harmonizer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,transparent_45%,rgba(248,250,252,0.88)_92%)]"
        />

        {/* Video 1: Left (0.0-5.0s) & Center (5.0-9.0s) */}
        <video
          ref={leftCenterVideoRef}
          src={videoLoadStatus.leftCenterSrc}
          poster="./assets/hero_poster.png"
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={() => {
            const video = leftCenterVideoRef.current;
            const pendingSeek = pendingSeekRef.current.leftCenter;
            if (video && pendingSeek !== null) {
              try {
                video.currentTime = pendingSeek;
                pendingSeekRef.current.leftCenter = null;
              } catch {
                // Keep the pending seek; loadeddata will retry it.
              }
            }
          }}
          onLoadedData={() => {
            setVideoLoadStatus((prev) => ({ ...prev, leftCenterLoaded: true }));
            const video = leftCenterVideoRef.current;
            const pendingSeek = pendingSeekRef.current.leftCenter;
            if (video && pendingSeek !== null) {
              try {
                video.currentTime = pendingSeek;
                pendingSeekRef.current.leftCenter = null;
              } catch {
                // A later canplay event or a fresh tap can retry playback.
              }
            }
          }}
          onPlay={() => {
            setIsStagePlaying(true);
            setPlaybackError(false);
          }}
          onPause={() => {
            const leftPlaying = leftCenterVideoRef.current && !leftCenterVideoRef.current.paused;
            const rightPlaying = rightVideoRef.current && !rightVideoRef.current.paused;
            setIsStagePlaying(Boolean(leftPlaying || rightPlaying));
          }}
          onTimeUpdate={handleLeftCenterTimeUpdate}
          onError={() => handleVideoError('leftCenter')}
          className={`absolute inset-0 w-full h-full object-cover scale-[1.04] transition-opacity duration-300 ${
            activeVideoLayer === 'LEFT_CENTER' ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        />

        {/* Video 2: Right (0.0-9.0s) */}
        <video
          ref={rightVideoRef}
          src={videoLoadStatus.rightSrc}
          poster="./assets/hero_poster.png"
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={() => {
            const video = rightVideoRef.current;
            const pendingSeek = pendingSeekRef.current.right;
            if (video && pendingSeek !== null) {
              try {
                video.currentTime = pendingSeek;
                pendingSeekRef.current.right = null;
              } catch {
                // Keep the pending seek; loadeddata will retry it.
              }
            }
          }}
          onLoadedData={() => {
            setVideoLoadStatus((prev) => ({ ...prev, rightLoaded: true }));
            const video = rightVideoRef.current;
            const pendingSeek = pendingSeekRef.current.right;
            if (video && pendingSeek !== null) {
              try {
                video.currentTime = pendingSeek;
                pendingSeekRef.current.right = null;
              } catch {
                // A fresh tap can retry if the browser paused loading.
              }
            }
          }}
          onPlay={() => {
            setIsStagePlaying(true);
            setPlaybackError(false);
          }}
          onPause={() => {
            const leftPlaying = leftCenterVideoRef.current && !leftCenterVideoRef.current.paused;
            const rightPlaying = rightVideoRef.current && !rightVideoRef.current.paused;
            setIsStagePlaying(Boolean(leftPlaying || rightPlaying));
          }}
          onTimeUpdate={handleRightTimeUpdate}
          onError={() => handleVideoError('right')}
          className={`absolute inset-0 w-full h-full object-cover scale-[1.04] transition-opacity duration-300 ${
            activeVideoLayer === 'RIGHT' ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        />

        {/* Explicit playback control: mobile browsers can defer or block inline autoplay. */}
        {!isStagePlaying && (
          <button
            type="button"
            data-testid="video-play-button"
            aria-label={playbackError ? 'Tap to retry video animation' : 'Tap to play video animation'}
            onClick={() => playZoneSegment(currentZoneRef.current)}
            className="absolute left-1/2 top-1/2 z-30 inline-flex min-h-12 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/70 bg-slate-950/85 px-5 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            <Play className="h-4 w-4 fill-current text-amber-400" />
            {playbackError ? 'Tap to retry animation' : 'Tap to play animation'}
          </button>
        )}

        {/* Camera Flash Pulse Overlay */}
        {shutterFlashKey > 0 && (
          <div
            key={shutterFlashKey}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 bg-white animate-shutter-flash"
          />
        )}

        {/* Optical Viewfinder Brackets ([ + ]) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 sm:inset-10 z-20 flex items-center justify-center"
        >
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-slate-900/30 rounded-tl-md" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-slate-900/30 rounded-tr-md" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-slate-900/30 rounded-bl-md" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-slate-900/30 rounded-br-md" />

          {/* Dynamic Focus Reticle */}
          <div
            className={`transition-all duration-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] ${
              isCapturing
                ? 'scale-110 bg-amber-500 text-slate-950 font-bold shadow-lg'
                : 'bg-white/60 backdrop-blur-sm text-slate-700 border border-slate-300/70'
            }`}
          >
            <span>[ + ]</span>
            <span>AF-C • {activeZone}</span>
          </div>
        </div>

        {/* Top-Left Live Zone Triggers (Accessible Click/Tap Buttons with normal pointer) */}
        <div
          onMouseEnter={() => setIsInsideHero(false)}
          onMouseLeave={() => setIsInsideHero(true)}
          className="cursor-auto absolute top-2 left-2 sm:top-4 sm:left-4 z-30 flex flex-wrap items-center gap-1 bg-white/85 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-slate-200/80 shadow-sm"
        >
          {(['LEFT', 'CENTER', 'RIGHT']).map((zone) => {
            const isSelected = activeZone === zone;
            const isUnlocked = unlockedZones.includes(zone);
            return (
              <button
                key={zone}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
                  dwellTimerRef.current = null;
                  pendingZoneRef.current = null;
                  currentZoneRef.current = zone;
                  setActiveZone(zone);
                  playZoneSegment(zone);
                  triggerShutterCapture(zone);
                }}
                className={`flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-[10px] font-semibold transition-all sm:px-2.5 sm:py-1 sm:text-xs ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isUnlocked ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                />
                <span className="sm:hidden">
                  {zone === 'LEFT' ? 'CRM' : zone === 'CENTER' ? 'Awards' : 'BI'}
                </span>
                <span className="hidden sm:inline">
                  {zone === 'LEFT'
                    ? 'Left: CRM Workflow Demo'
                    : zone === 'CENTER'
                    ? 'Center: 9+ Awards & GPA'
                    : 'Right: Independent Analytics Demo'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Top-Right Git Path Inspector Toggle */}
        <div
          onMouseEnter={() => setIsInsideHero(false)}
          onMouseLeave={() => setIsInsideHero(true)}
          className="cursor-auto absolute top-2 right-2 sm:top-4 sm:right-4 z-30 hidden sm:flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setShowInspector((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs font-medium text-slate-700 hover:bg-white shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            <span>t = {currentTimeTelemetry.toFixed(2)}s</span>
          </button>
        </div>

        {/* Floating Recruiter Proof Card (Left / Center / Right) */}
        {activeProofCard && (
          <div
            onMouseEnter={() => setIsInsideHero(false)}
            onMouseLeave={() => setIsInsideHero(true)}
            className={`cursor-auto absolute z-30 bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 backdrop-blur-md border shadow-xl transition-all duration-300 ${activeProofCard.accent}`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
                {activeProofCard.zoneLabel}
              </span>
              <span
                className={`hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full ${activeProofCard.pillColor}`}
              >
                {activeProofCard.badge}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {activeProofCard.title}
            </h3>
            <p className="mt-1 hidden sm:block text-xs text-slate-600 leading-relaxed">
              {activeProofCard.description}
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-200/80 hidden sm:flex items-center justify-between text-[11px] font-mono font-semibold text-slate-800">
              <span>{activeProofCard.metric}</span>
              <a
                href="#framing-the-data"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-sans font-bold"
              >
                Explore Demo <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Bottom-Right Watermark Masking Badge (Non-destructive crop + Telemetry Pill) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 z-30 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md text-white border border-white/15 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider uppercase">
            ISO 100 • f/1.4 • SYNTHETIC DEMO VIEW
          </span>
        </div>

        {/* Custom 60fps Butterfly Cursor Layer */}
        <ButterflyCursor
          containerRef={stageRef}
          isInsideHero={isInsideHero}
          activeZone={activeZone}
          isCapturing={isCapturing}
        />
      </div>

      {/* Collapsible Git Video Path & Timestamp Inspector Drawer */}
      {showInspector && (
        <div className="mt-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Film className="w-4 h-4 text-amber-600" />
              <span>Git Video State Machine Telemetry (9.0s Calibrated)</span>
            </div>
            <p className="text-slate-500 font-mono text-[11px]">
              Left/Center: <span className="text-slate-900">{videoLoadStatus.leftCenterSrc}</span> (
              {videoLoadStatus.leftCenterLoaded ? 'READY' : 'PROBING'}) • Right:{' '}
              <span className="text-slate-900">{videoLoadStatus.rightSrc}</span> (
              {videoLoadStatus.rightLoaded ? 'READY' : 'PROBING'})
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium">
              <Upload className="w-3.5 h-3.5" />
              <span>Bind Left/Center .MP4</span>
              <input
                type="file"
                accept="video/mp4"
                className="hidden"
                onChange={(e) => handleManualFileBind('leftCenter', e.target.files?.[0])}
              />
            </label>
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium">
              <Upload className="w-3.5 h-3.5" />
              <span>Bind Right .MP4</span>
              <input
                type="file"
                accept="video/mp4"
                className="hidden"
                onChange={(e) => handleManualFileBind('right', e.target.files?.[0])}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// STEP 5: BELOW-THE-FOLD RECRUITER CONVERSION SECTIONS
// ============================================================================
const PROFESSIONAL_EXPERIENCE = [
  {
    id: 'kla-automation',
    company: 'KLA',
    role: 'Automation & Business Process Analyst — IT Process Automation',
    period: 'Oct 2024 – Mar 2025 • Chennai, India',
    badge: 'Business analysis & process improvement',
    headlineMetric: 'Requirements • Workflow improvement • Operational analysis',
    problem:
      'Supported IT service operations in a complex technical environment where recurring issues called for clear requirements, consistent triage and better operational visibility.',
    requirements:
      'Worked with business and technical stakeholders to understand process pain points, document business and functional requirements, and clarify expected outcomes.',
    solution:
      'Contributed to process-improvement and automation activities, using service-management tools and data analysis to support more consistent operations.',
    roi: [
      'Translated stakeholder needs into structured BRD and FRD documentation',
      'Supported service-management and workflow improvement initiatives',
      'Applied SQL and Python analysis to operational questions',
    ],
    architectureSteps: [
      'Stakeholder discovery and requirements gathering',
      'Business process documentation and validation',
      'Cross-functional coordination on improvement actions',
      'Operational reporting and outcome review',
    ],
  },
  {
    id: 'stellantis-infra-bi',
    company: 'Stellantis',
    role: 'Asset Manager (IT Infrastructure) & Market Research Analyst',
    period: 'Jun 2023 – Jun 2024 • Chennai, India',
    badge: 'IT asset management & reporting',
    headlineMetric: 'IT operations • Asset coordination • BI reporting',
    problem:
      'Worked in an enterprise IT environment that required dependable asset coordination, incident follow-up and clear operational reporting for stakeholders.',
    requirements:
      'Coordinated with technical teams to maintain visibility of asset issues, support incident follow-up and prepare useful reporting for operational decisions.',
    solution:
      'Contributed to infrastructure operations and market-research reporting, using Power BI and Excel to organise information for stakeholder review.',
    roi: [
      'Coordinated asset issue tracking and follow-up across technical stakeholders',
      'Supported infrastructure monitoring and operational reporting',
      'Prepared Power BI and Excel analysis for leadership and market-research use',
    ],
    architectureSteps: [
      'Asset and incident visibility',
      'Stakeholder coordination and issue follow-up',
      'Data consolidation and validation',
      'Management reporting and recommendations',
    ],
  },
  {
    id: 'bible-tours-ops',
    company: 'Bible Tours',
    role: 'Operations Executive — Client & Order Management',
    period: 'Mar 2025 – Present • Chennai, India',
    badge: 'Client operations & service delivery',
    headlineMetric: 'Client support • SLA coordination • Dispute resolution',
    problem:
      'Supported travel operations involving customer requests and multiple service partners, where timely communication and clear ownership were important to service delivery.',
    requirements:
      'Helped coordinate client and partner communication, track open requests, document service issues and support timely escalation and closure.',
    solution:
      'Managed day-to-day order and dispute follow-up across service channels while keeping stakeholders informed about status and next actions.',
    roi: [
      'Coordinated customer and partner requests across the service lifecycle',
      'Supported issue triage, root-cause notes and escalation follow-up',
      'Handled client communication across email, phone and live chat',
    ],
    architectureSteps: [
      'Client request intake and clarification',
      'Partner coordination and status tracking',
      'Issue documentation and escalation follow-up',
      'Closure confirmation and service review',
    ],
  },
];

export default function App() {
  const [selectedZoneKey, setSelectedZoneKey] = useState('CENTER');
  const [unlockedZones, setUnlockedZones] = useState(['CENTER']);
  const [caseViewModes, setCaseViewModes] = useState({
    'kla-automation': 'summary',
    'stellantis-infra-bi': 'summary',
    'bible-tours-ops': 'summary',
  });
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('crm');

  const handleSelectProofCard = useCallback((zoneKey) => {
    setSelectedZoneKey(zoneKey);
    setUnlockedZones((prev) => (prev.includes(zoneKey) ? prev : [...prev, zoneKey]));
  }, []);

  const toggleCaseMode = (id, mode) => {
    setCaseViewModes((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* =====================================================================
          STEP 2: RECRUITER QUICK-SCAN HEADER & ABOVE-THE-FOLD NAVIGATION
      ====================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-3 flex flex-wrap 2xl:flex-nowrap items-center justify-between gap-x-2 sm:gap-x-5 gap-y-2.5">
          <a href="#interactive-hero" className="order-1 flex min-w-0 items-center gap-2 sm:gap-3 text-left">
            <span className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shadow-sm">
              TP
            </span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Thelma Agnes Peter
              </span>
              <span className="hidden sm:block max-w-[22rem] truncate text-xs text-slate-500">
                Ex-KLA & Stellantis • B.Tech CS & Business Systems • 9x MUN Photojournalist
              </span>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden 2xl:flex flex-1 items-center justify-center gap-x-5 text-xs font-semibold text-slate-600">
            <a href="#interactive-hero" className="whitespace-nowrap hover:text-slate-900 transition-colors">
              Interactive Stage
            </a>
            <a href="#case-studies" className="whitespace-nowrap hover:text-slate-900 transition-colors">
              Professional Experience
            </a>
            <a href="#honors-grid" className="whitespace-nowrap hover:text-slate-900 transition-colors">
              Honors & Certifications
            </a>
            <a href="#framing-the-data" className="whitespace-nowrap hover:text-slate-900 transition-colors">
              Independent Demos
            </a>
          </nav>

          <nav
            aria-label="Mobile and tablet navigation"
            className="order-3 grid w-full grid-cols-2 gap-2 border-t border-slate-100 pt-2 sm:grid-cols-4 2xl:hidden"
          >
            <a href="#interactive-hero" className="flex min-h-11 items-center rounded-lg bg-slate-50 px-3 py-2 text-[11px] font-semibold leading-tight text-slate-700 transition-colors hover:bg-slate-100 sm:text-xs">Interactive Stage</a>
            <a href="#case-studies" className="flex min-h-11 items-center rounded-lg bg-slate-50 px-3 py-2 text-[11px] font-semibold leading-tight text-slate-700 transition-colors hover:bg-slate-100 sm:text-xs">Professional Experience</a>
            <a href="#honors-grid" className="flex min-h-11 items-center rounded-lg bg-slate-50 px-3 py-2 text-[11px] font-semibold leading-tight text-slate-700 transition-colors hover:bg-slate-100 sm:text-xs">Honors & Certifications</a>
            <a href="#framing-the-data" className="flex min-h-11 items-center rounded-lg bg-slate-50 px-3 py-2 text-[11px] font-semibold leading-tight text-slate-700 transition-colors hover:bg-slate-100 sm:text-xs">Independent Demos</a>
          </nav>

          <div className="order-2 flex shrink-0 items-center">
            <a
              href="./Thelma_Agnes_Peter_CV_ATS.pdf"
              download="Thelma_Agnes_Peter_CV_ATS.pdf"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap px-2 sm:px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="sm:hidden">CV</span>
              <span className="hidden sm:inline">Download CV</span>
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION: EXECUTIVE INTRO + DUAL-VIDEO ANIME CAPTURE STAGE
      ====================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-24">
        <section id="interactive-hero" className="space-y-6 scroll-mt-44 sm:scroll-mt-32">
          {/* Recruiter Quick-Scan Bar */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Available for Business Analyst, CRM & RevOps Roles • Open to Relocation</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Where <span className="text-blue-600">Enterprise Process Automation</span> Meets{' '}
                <span className="text-amber-600">Award-Winning Visual Precision.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Business & Research Analyst with 3 years of professional experience across{' '}
                <strong className="text-slate-900">KLA</strong>,{' '}
                <strong className="text-slate-900">Stellantis</strong>, and{' '}
                <strong className="text-slate-900">Bible Tours</strong>. Explore the role highlights below, then try independently built demos that use fictional data—not employer-owned projects or systems.
              </p>

              {/* Competency Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  'CRM & ServiceNow Architecture',
                  'Business Analysis (BRD/FRD)',
                  'SQL, Python & Power BI',
                  'Process Automation (Resolve)',
                  '9x Award-Winning Photographer',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200/90 text-slate-700 shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* High-Contrast Recruiter CTAs */}
            <div data-testid="hero-ctas" className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:w-auto lg:shrink-0">
              <a
                href="./Thelma_Agnes_Peter_CV_ATS.pdf"
                download="Thelma_Agnes_Peter_CV_ATS.pdf"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-amber-400 sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download 1-Page CV (PDF)</span>
              </a>
              <a
                href="#case-studies"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 sm:w-auto"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Explore Professional Experience</span>
              </a>
            </div>
          </div>

          {/* Interactive 16:9 Dual-Video Stage */}
          <HeroVideoStage
            onSelectProofCard={handleSelectProofCard}
            activeProofCard={PROOF_CARDS[selectedZoneKey]}
            unlockedZones={unlockedZones}
          />
        </section>

        {/* ===================================================================
            SECTION 1: STAR-METHOD CRM & BUSINESS ANALYSIS CASE STUDIES
        ==================================================================== */}
        <section id="case-studies" className="space-y-8 scroll-mt-44 sm:scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
                SELECTED PROFESSIONAL EXPERIENCE
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
                Business Analysis, IT Operations & Client Service
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              A high-level view of each role and its transferable contributions. Internal workflows,
              employer dashboards, source code and confidential project assets are intentionally not reproduced.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROFESSIONAL_EXPERIENCE.map((cs) => {
              const mode = caseViewModes[cs.id] || 'summary';
              return (
                <article
                  key={cs.id}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                        {cs.badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{cs.period}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">{cs.company}</h3>
                      <p className="text-xs font-semibold text-amber-600 mt-0.5">{cs.role}</p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 border border-slate-200/70 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => toggleCaseMode(cs.id, 'summary')}
                        className={`py-1.5 rounded-lg transition-all ${
                          mode === 'summary'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Role Overview
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCaseMode(cs.id, 'architecture')}
                        className={`py-1.5 rounded-lg transition-all ${
                          mode === 'architecture'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Key Contributions
                      </button>
                    </div>

                    {mode === 'summary' ? (
                      <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                        <div>
                          <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] block">
                            1. Role Context
                          </span>
                          {cs.problem}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] block">
                            2. Stakeholder Scope
                          </span>
                          {cs.requirements}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] block">
                            3. How I Contributed
                          </span>
                          {cs.solution}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 py-2">
                        <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] block">
                          Transferable Contributions (High-Level)
                        </span>
                        {cs.architectureSteps.map((step, idx) => (
                          <div
                            key={step}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800"
                          >
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantifiable ROI Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>{cs.headlineMetric}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {cs.roi.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: HONORS, CERTIFICATIONS & AWARDS BENTO GRID
        ==================================================================== */}
        <section id="honors-grid" className="space-y-8 scroll-mt-44 sm:scroll-mt-32">
          <div className="border-b border-slate-200 pb-5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600">
              CREDENTIALS & RECOGNITION • VERIFIED RECORD
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
              Honors, Certifications & Leadership Bento Grid
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Award 1: 9+ MUN Photojournalism Awards */}
            <div className="lg:col-span-7 rounded-3xl p-6 bg-gradient-to-br from-amber-500/15 via-white to-white border border-amber-500/30 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>9+ Model United Nations Press & Photojournalism Awards</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Best International Press Photojournalist — SSN University MUN (2023)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Recognized across 9+ Model United Nations conferences in Chennai and Bangalore for
                  high-pressure editorial storytelling, including{' '}
                  <strong className="text-slate-900">
                    Best International Press Photojournalist at SSN University MUN (2023)
                  </strong>{' '}
                  and{' '}
                  <strong className="text-slate-900">
                    Honorable Mention at Christ University MUN (2022)
                  </strong>
                  .
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap gap-2 text-xs font-semibold text-amber-900">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100">SSN MUN Best Photographer</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-100">Christ University MUN</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-100">Editorial Framing</span>
              </div>
            </div>

            {/* Academic Distinction */}
            <div className="lg:col-span-5 rounded-3xl p-6 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  SRM Institute of Science & Technology (2020–2024)
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  B.Tech in Computer Science & Business Systems — 8.91 / 10 GPA
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Graduated with distinction combining software engineering with quantitative
                  operations management.
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-900 block">Service Operations</span>
                  <span className="text-emerald-600 font-bold">Grade: O (Outstanding)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-900 block">Operations Research</span>
                  <span className="text-blue-600 font-bold">Grade: A+</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-900 block">IT Project Mgmt</span>
                  <span className="text-blue-600 font-bold">Grade: A+</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-900 block">NCC &apos;A&apos; Certificate</span>
                  <span className="text-amber-600 font-bold">Grade: A++</span>
                </div>
              </div>
            </div>

            {/* Professional Certifications */}
            <div className="lg:col-span-6 rounded-3xl p-6 bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                  IIBA & TECHNICAL CREDENTIALS
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Industry Certifications & Analytical Stack
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-900">
                    AI-Powered Business Analyst Professional
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-semibold">
                    IIBA
                  </span>
                </li>
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-900">
                    Product & App Management Workshop
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-semibold">
                    IIT Madras (2023)
                  </span>
                </li>
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-900">
                    Data Analyst Certification & Python Programming
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-semibold">
                    Besant (2024) & FITA
                  </span>
                </li>
              </ul>
            </div>

            {/* Executive Student Leadership */}
            <div className="lg:col-span-6 rounded-3xl p-6 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                  EXECUTIVE LEADERSHIP PROGRESSION (2021–2024)
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Vice President — Camogenics & Department of CSE
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rose through three consecutive leadership tiers at{' '}
                  <strong className="text-slate-900">Camogenics</strong> (SRM University&apos;s
                  official media body) while simultaneously serving as Vice President of the
                  Department of Computer Science & Engineering, directing inter-college flagship
                  events (<strong className="text-slate-900">Monocle</strong> &{' '}
                  <strong className="text-slate-900">Texus</strong>).
                </p>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 block">2021–2022</span>
                  <span className="font-bold text-slate-900">Head of Admin</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 block">2022–2023</span>
                  <span className="font-bold text-slate-900">Secretary & VP CSE</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300">
                  <span className="text-[10px] font-mono text-amber-800 block">2023–2024</span>
                  <span className="font-bold text-slate-900">Vice President</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: "FRAMING THE DATA" DUAL SHOWCASE
        ==================================================================== */}
        <section id="framing-the-data" className="space-y-8 scroll-mt-44 sm:scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600">
                INDEPENDENT BUILDS • SYNTHETIC DATA ONLY
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
                Independent Project Demos & Photojournalism
              </h2>
            </div>

            <div className="grid w-full grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold sm:inline-flex sm:w-auto">
              {[
                { id: 'crm', label: 'CRM Workflow Simulator' },
                { id: 'ops', label: 'Operations Analytics' },
                { id: 'photo', label: 'Award Photojournalism' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={activeShowcaseTab === tab.id}
                  onClick={() => setActiveShowcaseTab(tab.id)}
                  className={`flex min-h-11 items-center justify-center rounded-lg px-1.5 py-1.5 text-center text-[10px] leading-tight transition-all sm:px-3 sm:text-xs ${
                    activeShowcaseTab === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="sm:hidden">
                    {tab.id === 'crm' ? 'CRM' : tab.id === 'ops' ? 'Ops' : 'Photo'}
                  </span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="max-w-4xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            These are independent portfolio exercises. All names, contacts, accounts, order references and metrics in the interactive demos are fictional sample data. No employer-owned dashboards, internal workflows, customer records or confidential assets are included.
          </p>
          <div className="space-y-6">
            {activeShowcaseTab === 'crm' && <CrmWorkflowDemo />}
            {activeShowcaseTab === 'ops' && <OperationsAnalyticsDemo />}
            {activeShowcaseTab === 'photo' && (
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600"><Aperture className="h-4 w-4" /> Optical composition & editorial hierarchy</span>
                  <span className="text-[11px] font-mono text-slate-500">f/1.4 • Rule of Thirds • Visual Weight</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">How Award-Winning Photojournalism Elevates Dashboard UX</h3>
                <p className="max-w-4xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Photojournalism develops an eye for separating the decisive signal from visual noise. The same principles—focal contrast, negative space and visual hierarchy—can help make analytical interfaces easier to scan and understand.
                </p>
                <div className="grid grid-cols-1 gap-3 pt-1 text-xs sm:grid-cols-3">
                  <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4"><span className="block font-bold text-slate-900">Focal Isolation</span><span className="text-[11px] text-slate-600">Draws attention to an important signal without overwhelming the reader.</span></div>
                  <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4"><span className="block font-bold text-slate-900">Leading Lines</span><span className="text-[11px] text-slate-600">Guides the eye from a headline metric to its supporting context.</span></div>
                  <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4"><span className="block font-bold text-slate-900">Color Contrast</span><span className="text-[11px] text-slate-600">Uses restrained color to distinguish status, change and priority.</span></div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* =====================================================================
          EXECUTIVE FOOTER & DIRECT RECRUITER CONTACT
      ====================================================================== */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight">Thelma Agnes Peter</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                OPEN TO RELOCATION
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Chennai, India (Open to Bangalore, Hyderabad, Gurgaon & Global Hybrid/Remote)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="mailto:thelmaagnespeter@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>thelmaagnespeter@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/thelma-agnes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>linkedin.com/in/thelma-agnes</span>
            </a>
            <a
              href="./Thelma_Agnes_Peter_CV_ATS.pdf"
              download="Thelma_Agnes_Peter_CV_ATS.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ATS CV</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
