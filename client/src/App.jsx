import WeatherPage from "./WeatherPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <WeatherPage />
    </>
  );
}
