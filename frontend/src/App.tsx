import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import Users from "./app/Users";
import NotFound from "./app/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "@/app/login/page";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <PrivateRoute element={<Navbar />} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
