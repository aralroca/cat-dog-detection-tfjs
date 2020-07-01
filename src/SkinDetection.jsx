import { h } from "preact";
import { useState } from "preact/hooks";
import * as tf from "@tensorflow/tfjs";
import useLoadSkinDetectionModel from "./hooks/useLoadSkinDetectionModel";

export default function SkinDetection() {
  const [model, pretrainedModel] = useLoadSkinDetectionModel();
  const [previewUrl, setPreviewUrl] = useState();
  const [predictionStatus, setPredictionStatus] = useState();

  function onLoadPreview(e) {
    const image = e.target.files[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(image));
    setPredictionStatus("predicting");
  }

  async function predict() {
    const pixels = tf.browser.fromPixels(document.querySelector("img"));
    const image = tf.reshape(pixels, [1, 224, 224, 3]).toFloat();
    const modelPrediction = model.predict(pretrainedModel.predict(image));
    const [benign, malignant] = Array.from(modelPrediction.dataSync());
    setPredictionStatus(benign > malignant ? 'Benign 😊' : 'Malignant 😞');
  }

  if (!model) return "Loading the model...";

  return (
    <div>
      <h1>Choose image of skin</h1>
      <input type="file" onChange={onLoadPreview} accept="image/*" />
      {previewUrl &&
        <div style={{ marginTop: 10 }}>
          <img
            src={previewUrl}
            onLoad={predict}
            width={224}
            height={224}
            alt="preview"
          />
        </div>}
      {predictionStatus === "predicting" ? "Predicting..." : predictionStatus}
    </div>
  );
}
