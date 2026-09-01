// --- THREE.JS SCENE SETUP ---
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x58a6ff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Interactive Visual Object (Placeholder for 3D Sign Language Avatar)
const geometry = new THREE.IcosahedronGeometry(1.8, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0x2f81f7,
  wireframe: true,
  roughness: 0.3,
  metalness: 0.8
});
const avatarPlaceholder = new THREE.Mesh(geometry, material);
scene.add(avatarPlaceholder);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  avatarPlaceholder.rotation.x += 0.003;
  avatarPlaceholder.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- UI FUNCTIONALITY STUBS ---
document.getElementById('btn-translate').addEventListener('click', () => {
  const input = document.getElementById('sign-input').value;
  if (input) {
    // Trigger 3D animation keyframes here
    avatarPlaceholder.material.wireframe = !avatarPlaceholder.material.wireframe;
  }
});

document.getElementById('btn-speak').addEventListener('click', () => {
  const text = document.getElementById('tts-input').value;
  if (text && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
});

document.getElementById('btn-listen').addEventListener('click', () => {
  const statusBox = document.getElementById('speech-status');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
      statusBox.textContent = "Listening...";
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      statusBox.textContent = `Heard: "${transcript}"`;
    };
    recognition.onerror = () => {
      statusBox.textContent = "Error recognizing speech.";
    };
    recognition.start();
  } else {
    statusBox.textContent = "Speech Recognition API is not supported in this browser.";
  }
});
