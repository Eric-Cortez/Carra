import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import Users from "./app/Users";
import NotFound from "./app/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import Login from "./app/login";
import Profile from "./app/Profile";
import Topic from "./app/Topic";
import UserProfile from "./app/UserProfile";

const App = () => {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <BrowserRouter>
        <PrivateRoute element={<Navbar />} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route path="/topics/:topicId" element={<Topic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
