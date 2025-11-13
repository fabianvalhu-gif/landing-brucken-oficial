import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import IntranetDashboard from "./pages/intranet/Dashboard";
import Pipeline from "./pages/intranet/Pipeline";
import Boards from "./pages/intranet/Boards";
import Contacts from "./pages/intranet/Contacts";
import Companies from "./pages/intranet/Companies";
import Activities from "./pages/intranet/Activities";
import Analytics from "./pages/intranet/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas privadas (intranet) */}
        <Route
          path="/intranet"
          element={
            <ProtectedRoute>
              <IntranetDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intranet/pipeline"
          element={
            <ProtectedRoute>
              <Pipeline />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intranet/boards"
          element={
            <ProtectedRoute>
              <Boards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intranet/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intranet/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intranet/activities"
          element={
            <ProtectedRoute>
              <Activities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intranet/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
