import { ExperiencesPage } from "@pages/ExperiencesPage";
import { GuidePage } from "@pages/GuidePage";
import { HomePage } from "@pages/HomePage";
import { RecycleMapPage } from "@pages/RecycleMapPage";

import { Route, Routes } from "react-router-dom";

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
