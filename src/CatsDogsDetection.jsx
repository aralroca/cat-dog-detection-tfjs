import { h } from "preact";
import { useState } from "preact/hooks";
import * as tf from "@tensorflow/tfjs";
import useLoadCatsDogsModel from "./hooks/useLoadCatsDogsModel";

export default function CatsDogsDetection() {
  const [model, pretrainedModel] = useLoadCatsDogsModel();
  const [previewUrl, setPreviewUrl] = useState();
  const [predictionStatus, setPredictionStatus] = useState();

  function onLoadPreview(e) {
    const image = e.target.files[0]
    if (!image) return
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(image));
    setPredictionStatus("predicting");
  }

  async function predict() {
    const pixels = tf.browser.fromPixels(document.querySelector("img"));
    const image = tf.reshape(pixels, [1, 224, 224, 3]).toFloat().div(tf.scalar(127)).sub(
      tf.scalar(1),
    );
    const modelPrediction = model.predict(pretrainedModel.predict(image));
    const [dog, cat] = Array.from(modelPrediction.dataSync());
    setPredictionStatus(dog >= cat ? '🐶' : '😸');
  }

  if (!model) return "Loading the model...";

  return (
    <div>
      <h1>Choose a dog or cat image</h1>
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
      {predictionStatus === "predicting" ? "Predicting..." : <div style={{ fontSize: 50 }}>{predictionStatus}</div>}
    </div>
  );
}
