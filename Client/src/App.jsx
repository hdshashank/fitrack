import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Calculators from "./pages/Calculators";
import Nutrition from "./pages/Nutrition";
import Workouts from "./pages/Workouts";
import PoseDetection from "./pages/poseDetection";
import Community from "./pages/Community";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { WorkoutsContextProvider } from "./context/WorkoutsContext";
import { useAuthContext } from "./hooks/useAuthContext";

export default function App() {
  const { user } = useAuthContext();
  return (
    <WorkoutsContextProvider>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route
              path="/workouts"
              element={!user ? <SignUp /> : <Workouts />}
            />
            <Route path="/poseDetection" element={<PoseDetection />} />
            <Route path="/community" element={<Community />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </WorkoutsContextProvider>
  );
}
