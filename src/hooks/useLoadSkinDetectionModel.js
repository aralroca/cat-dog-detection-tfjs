import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "preact/hooks";

const pretrainedModel = {
  url:
    "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json",
  layer: "conv_pw_13_relu",
};

export default function useLoadSkinDetectionModel() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function loadModel() {
      const mobilenet = await tf.loadLayersModel(pretrainedModel.url);
      const layer = mobilenet.getLayer(pretrainedModel.layer);
      const pretrained = await tf.model({
        inputs: [mobilenet.inputs[0]],
        outputs: layer.output,
      });

      const model = await tf.loadLayersModel(
        "./model/ml-classifier-malignant-benign.json",
      );

      setState([model, pretrained]);
    }
    loadModel();
  }, []);

  return state;
}
