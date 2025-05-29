import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { GuidePage } from "../pages/GuidePage";
import { ExperiencesPage } from "../pages/ExperiencesPage";
import { RecycleMapPage } from "../pages/RecycleMapPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/experiences" element={<ExperiencesPage />} />
      <Route path="/recycle-map" element={<RecycleMapPage />} />
    </Routes>
  );
}
