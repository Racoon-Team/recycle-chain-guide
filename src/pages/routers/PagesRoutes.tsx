import ResponsiveAppBar from "@components/NavBar"
import { ExperiencesPage } from "@pages/ExperiencesPage"
import { GuidePage } from "@pages/GuidePage"
import { HomePage } from "@pages/HomePage"
import { RecycleMapPage } from "@pages/RecycleMapPage"
import { PrivateRoute } from "@routes/PrivateRoute"
import { Navigate, Route, Routes } from "react-router-dom"

export const PagesRoutes = () => {
  return (
    <>
    <ResponsiveAppBar/>

    <Routes>
          <Route element={<PrivateRoute />}>
            
              <Route path="/home" element={<HomePage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/recycle-map" element={<RecycleMapPage />} />
              <Route path="/*" element={<Navigate to="/home"/>} />

          </Route>
    
        </Routes>
    
    </>
  )
}
