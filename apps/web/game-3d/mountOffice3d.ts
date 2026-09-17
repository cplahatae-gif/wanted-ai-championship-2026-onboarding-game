import type { GamePack } from "gamepack-schema";
import * as THREE from "three";

export type Office3dHandle = {
  dispose: () => void;
};

export function mountOffice3d(
  parent: HTMLElement,
  pack: GamePack,
  onPoi: (poiId: string, questHint: string) => void,
): Office3dHandle {
  const width = parent.clientWidth || 640;
  const height = 360;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  parent.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("data-testid", "demo-3d-canvas");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(pack.visual.palette[0] ?? "#1a1a2e");

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.set(0, 4, 8);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x888888));

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 12),
    new THREE.MeshStandardMaterial({ color: pack.visual.palette[1] ?? "#16213e" }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const player = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1, 0.6),
    new THREE.MeshStandardMaterial({ color: pack.visual.palette[2] ?? "#e94560" }),
  );
  player.position.set(0, 0.5, 0);
  scene.add(player);

  const poiMeshes: { id: string; mesh: THREE.Mesh; label: string }[] = [];
  for (const poi of pack.pois.slice(0, 6)) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16),
      new THREE.MeshStandardMaterial({ color: 0x44aaff }),
    );
    const x = (poi.position.x - pack.map.width / 2) * 0.5;
    const z = (poi.position.y - pack.map.height / 2) * 0.5;
    mesh.position.set(x, 0.1, z);
    scene.add(mesh);
    poiMeshes.push({ id: poi.id, mesh, label: poi.label });
  }

  const keys = new Set<string>();
  const onKeyDown = (e: KeyboardEvent) => keys.add(e.key);
  const onKeyUp = (e: KeyboardEvent) => keys.delete(e.key);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const speed = 0.08;
    if (keys.has("ArrowUp") || keys.has("w")) player.position.z -= speed;
    if (keys.has("ArrowDown") || keys.has("s")) player.position.z += speed;
    if (keys.has("ArrowLeft") || keys.has("a")) player.position.x -= speed;
    if (keys.has("ArrowRight") || keys.has("d")) player.position.x += speed;

    for (const poi of poiMeshes) {
      if (player.position.distanceTo(poi.mesh.position) < 1.2) {
        onPoi(poi.id, poi.label);
      }
    }
    camera.lookAt(player.position);
    renderer.render(scene, camera);
  };
  tick();

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      renderer.dispose();
      parent.removeChild(renderer.domElement);
    },
  };
}
