import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Circular particle texture generated at runtime via an offscreen canvas
// ---------------------------------------------------------------------------

function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ---------------------------------------------------------------------------
// Inner scene: animated particle field representing astrophysical plasma
// ---------------------------------------------------------------------------

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;
  const mouse = useRef({ x: 0, y: 0 });

  const circleTexture = useMemo(() => createCircleTexture(), []);

  // Generate initial positions, colors and sizes once
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00d4ff');
    const violet = new THREE.Color('#7c3aed');
    const orange = new THREE.Color('#ff6b35');

    for (let i = 0; i < count; i++) {
      // Spread particles in a squashed ellipsoid
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 6;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // squash Y
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Colour mixing: mostly cyan-violet gradient, 5 % orange accents
      const rnd = Math.random();
      let color: THREE.Color;
      if (rnd < 0.05) {
        color = orange.clone();
      } else {
        color = cyan.clone().lerp(violet, Math.random());
      }
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, []);

  // Track mouse position for parallax effect
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [reducedMotion]);

  // Per-frame animation: slow rotation + mouse parallax
  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return;

    const t = clock.getElapsedTime();

    // Gentle rotation
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.015) * 0.05;

    // Smooth mouse parallax
    ref.current.position.x +=
      (mouse.current.x * 0.3 - ref.current.position.x) * 0.02;
    ref.current.position.y +=
      (-mouse.current.y * 0.2 - ref.current.position.y) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        size={0.08}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Public wrapper: sets up Canvas and detects reduced-motion preference
// ---------------------------------------------------------------------------

export default function HeroAnimation() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <ParticleField reducedMotion={reducedMotion} />
    </Canvas>
  );
}
