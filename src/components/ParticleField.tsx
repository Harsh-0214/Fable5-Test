import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 4200;

/** A slowly-breathing spiral galaxy of gold/ember particles with mouse parallax. */
function Galaxy() {
  const points = useRef<THREE.Points>(null!);
  const { pointer } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const gold = new THREE.Color("#e8b04b");
    const ember = new THREE.Color("#d4663a");
    const teal = new THREE.Color("#5fb8a5");
    for (let i = 0; i < COUNT; i++) {
      // logarithmic spiral with vertical scatter
      const arm = i % 3;
      const t = (i / COUNT) * 6 * Math.PI + (arm * 2 * Math.PI) / 3;
      const radius = 0.25 + (i / COUNT) * 5.2 + (Math.random() - 0.5) * 0.7;
      pos[i * 3] = Math.cos(t) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (1.6 - radius * 0.18);
      pos[i * 3 + 2] = Math.sin(t) * radius;
      const r = Math.random();
      const c = r < 0.72 ? gold : r < 0.92 ? ember : teal;
      const fade = 0.45 + Math.random() * 0.55;
      col[i * 3] = c.r * fade;
      col[i * 3 + 1] = c.g * fade;
      col[i * 3 + 2] = c.b * fade;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.045;
    points.current.rotation.x =
      0.42 + Math.sin(t * 0.18) * 0.04 + pointer.y * 0.12;
    points.current.rotation.z = pointer.x * 0.08;
    const s = 1 + Math.sin(t * 0.4) * 0.02;
    points.current.scale.setScalar(s);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 opacity-70">
      <Canvas
        camera={{ position: [0, 2.2, 6.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Galaxy />
        <fog attach="fog" args={["#0c0b0f", 6, 13]} />
      </Canvas>
      {/* vignette so text stays readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #0c0b0f 92%)",
        }}
      />
    </div>
  );
}
