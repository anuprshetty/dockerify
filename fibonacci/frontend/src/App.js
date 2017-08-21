import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Fib from "./Fib";
import ThankYou from "./ThankYou";
import Error from "./Error";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Fib />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
