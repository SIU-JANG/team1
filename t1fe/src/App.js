import { Route, BrowserRouter, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SecondPage from "./pages/SecondPage";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";
import IntroPage from "./pages/IntroPage";
import SurveyPage from "./pages/SurveyPage";
import SkeletonPage from "./pages/SkeletonPage";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/skeleton" element={<SkeletonPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
