"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { WORLD_LAND_POINTS } from "../worldLandPoints";

/**
 * Globe
 * -----
 * A dotted-continent 3D globe in the style of the reference (Stripe's
 * crypto card): real land-shaped point cloud, soft round dots, a couple
 * of arcing connection lines with node markers, slow auto-rotation.
 *
 * npm i three
 *
 * How the dots are real continents (not noise):
 *   worldLandPoints.ts holds ~7,460 lon/lat pairs sampled from actual
 *   Natural Earth land geometry (see that file's header). This component
 *   just projects them onto a sphere — no map image needed at runtime.
 *
 * Usage:
 *   <div className="relative w-full h-[420px] rounded-2xl border bg-white overflow-hidden">
 *     <Globe />
 *   </div>
 */

const R = 6; // sphere radius (arbitrary scene units)

function lonLatToVec3(lon: number, lat: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** soft round sprite so points read as glowing dots, not hard squares */
function makeDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function buildDotCloud(): THREE.Points {
  const n = WORLD_LAND_POINTS.length;
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);

  const colorA = new THREE.Color("#6D5DF6"); // purple
  const colorB = new THREE.Color("#2DD4BF"); // teal
  const colorC = new THREE.Color("#F472B6"); // warm pink accent, like the reference

  const tmp = new THREE.Color();

  for (let i = 0; i < n; i++) {
    const { lon, lat } = WORLD_LAND_POINTS[i];
    const v = lonLatToVec3(lon, lat, R);
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;

    // blend by latitude/longitude so the gradient sweeps across the globe
    // rather than looking randomly speckled
    const t = (lat + 90) / 180; // 0 (south) .. 1 (north)
    const u = (lon + 180) / 360; // 0..1 around
    tmp.copy(colorB).lerp(colorA, t);
    tmp.lerp(colorC, Math.max(0, Math.sin(u * Math.PI * 2)) * 0.25);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.11,
    vertexColors: true,
    map: makeDotTexture(),
    transparent: true,
    alphaTest: 0.02,
    depthWrite: false,
    sizeAttenuation: true,
  });

  return new THREE.Points(geo, mat);
}

/** one arcing connector line + two small ring nodes, like the reference image */
function buildArc(fromLL: [number, number], toLL: [number, number], color: string) {
  const group = new THREE.Group();
  const from = lonLatToVec3(fromLL[0], fromLL[1], R);
  const to = lonLatToVec3(toLL[0], toLL[1], R);
  const mid = from.clone().add(to).multiplyScalar(0.5);
  mid.setLength(R * 1.35); // lift the arc's midpoint above the surface

  const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
  const points = curve.getPoints(40);
  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 });
  group.add(new THREE.Line(lineGeo, lineMat));

  [from, to].forEach((pos) => {
    const ringGeo = new THREE.RingGeometry(0.09, 0.13, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(pos);
    ring.lookAt(pos.clone().multiplyScalar(2));
    group.add(ring);
  });

  return group;
}

export default function Globe({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 1.5, 17);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.z = 0.35; // tilt, matching the reference's angled view
    world.add(buildDotCloud());
    world.add(buildArc([31, 30], [-77, 39], "#6D5DF6"));   // Cairo-ish -> DC-ish
    world.add(buildArc([-77, 39], [103, 1], "#2DD4BF"));   // DC-ish -> Singapore-ish
    scene.add(world);

        const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf: number;
    const tick = () => {
      world.rotation.y += 0.0022;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} style={{ pointerEvents: "none" }} aria-hidden="true" />;
}
