const video = document.getElementById("webcam");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const loadingMessage = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

let model;
let lastDetectionTime = 0;

async function setupCamera() {
  console.log("Tentative d'accès à la caméra...");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    console.log("Accès à la caméra réussi");
    video.srcObject = stream;
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        console.log("Métadonnées vidéo chargées");
        resolve(video);
      };
    });
  } catch (error) {
    console.error("Erreur lors de l'accès à la caméra :", error);
    errorMessage.textContent =
      "Erreur lors de l'accès à la caméra : " + error.message;
    throw error;
  }
}

async function loadModel() {
  console.log("Début du chargement du modèle...");
  try {
    model = await cocoSsd.load();
    console.log("Modèle chargé avec succès");
    loadingMessage.style.display = "none";
  } catch (error) {
    console.error("Erreur lors du chargement du modèle :", error);
    errorMessage.textContent =
      "Erreur lors du chargement du modèle : " + error.message;
    throw error;
  }
}

async function detectObjects() {
  console.log("Détection d'objets en cours...");
  const now = Date.now();
  if (now - lastDetectionTime >= 333) {
    // ~3 FPS
    lastDetectionTime = now;
    try {
      const predictions = await model.detect(video);
      console.log("Prédictions reçues:", predictions);
      drawPredictions(predictions);
    } catch (error) {
      console.error("Erreur lors de la détection:", error);
    }
  }
  requestAnimationFrame(detectObjects);
}

function drawPredictions(predictions) {
  console.log("Dessin des prédictions...");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = "16px sans-serif";
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    const label = `${prediction.class} (${Math.round(
      prediction.score * 100
    )}%)`;

    console.log(`Dessin de la prédiction: ${label} à (${x}, ${y})`);

    ctx.strokeStyle = "#00BFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = "#00BFFF";
    const textWidth = ctx.measureText(label).width;
    ctx.fillRect(x, y, textWidth + 4, 20);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(label, x, y);
  });
}

async function run() {
  try {
    console.log("Démarrage de l'application...");
    await setupCamera();
    await loadModel();
    console.log("Début de la détection d'objets");
    detectObjects();
  } catch (error) {
    console.error("Erreur lors de l'exécution de l'application :", error);
  }
}

run();
