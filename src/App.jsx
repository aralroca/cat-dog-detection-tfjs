import { h } from "preact";
import logo from "./logo.png";
import "./App.css";
import CatsDogsDetection from "./CatsDogsDetection";

function App() {
  return (
    <div className="App">
      <div className="alert">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://aralroca.com/blog/cat-dog-classifier"
        >
          Read the tutorial
        </a>
      </div>
      <CatsDogsDetection />
    </div>
  );
}

export default App;
