import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { GuidePage } from "../pages/GuidePage"
import { ExperiencesPage } from "../pages/ExperiencesPage"
import { RecycleMapPage } from "../pages/RecycleMapPage"


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/guide" element={<GuidePage/>} />
        <Route path="/experiences" element={<ExperiencesPage/>} />
        <Route path="/recycleMap" element={<RecycleMapPage/>} />


    </Routes>
  )
}
