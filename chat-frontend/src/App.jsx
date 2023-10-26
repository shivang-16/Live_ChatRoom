import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chat";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
