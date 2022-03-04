import "./App.css";
import List from "./components/List";
import Wallet from "./components/Wallet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
