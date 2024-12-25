import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/components/home";
import CommunityView from "@/components/community/CommunityView";
import HospitalsView from "@/components/hospitals/HospitalsView";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityView />} />
        <Route path="/hospitals" element={<HospitalsView />} />
      </Routes>
    </Suspense>
  );
}

export default App;
