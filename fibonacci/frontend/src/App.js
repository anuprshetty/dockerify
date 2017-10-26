import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Fib from "./Fib";
import ThankYou from "./ThankYou";
import Error from "./Error";
import { APP_URL } from "./config";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={`${APP_URL}/`} element={<Fib />} />
        <Route path={`${APP_URL}/thankyou`} element={<ThankYou />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
