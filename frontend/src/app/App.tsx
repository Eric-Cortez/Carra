import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "@/app/Users";
import type React from "react";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
