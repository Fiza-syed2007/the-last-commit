import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";

import Hero from "./sections/Hero";
import GitHistory from "./sections/GitHistory";
import Tracks from "./sections/Tracks";
import Prizes from "./sections/Prizes";
import FinalCommit from "./sections/FinalCommit";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <GitHistory />
        <Tracks />
        <Prizes />
        <FinalCommit />
      </main>
    </>
  );
}



function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050505] text-white">
        <AnimatePresence>
          {loading && (
            <LoadingScreen onComplete={() => setLoading(false)} />
          )}
        </AnimatePresence>

        {!loading && (
          <>
            <CursorGlow />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;