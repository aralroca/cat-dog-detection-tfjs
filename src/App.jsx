import { h } from "preact";
import logo from "./logo.png";
import "./App.css";
import SkinDetection from "./SkinDetection";

function App() {
  return (
    <div className="App">
      <SkinDetection />
      <div className="alert">
        <b>Important:</b>
        This application should not be used as something medical, since we have
        used a very small dataset and it has no scientific review. This is only
        for educational purpose from a software point of view.
        {" "}
        <a
          href="https://aralroca.com/blog/skin-cancer-detection"
        >
          Read the tutorial
        </a>
      </div>
    </div>
  );
}

export default App;
