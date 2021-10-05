import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const handleClick = async () => {
    const res = await fetch("/api/");
    const data = await res.json();
    setMessage(data.message);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <button className="App-link" onClick={handleClick}>
          Load data
        </button>
      </header>
    </div>
  );
}

export default App;
