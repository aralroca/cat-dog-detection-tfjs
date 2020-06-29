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
    const image = pixels.expandDims(0).toFloat().div(tf.scalar(127)).sub(
      tf.scalar(1),
    );
    const pretrainedModelPrediction = pretrainedModel.predict(image);
    const modelPrediction = model.predict(pretrainedModelPrediction);
    const [prediction] = modelPrediction.as1D().argMax().dataSync();

    console.log(prediction); // It's always 0...
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
      {predictionStatus === "predicting" && "Predicting..."}
    </div>
  );
}
