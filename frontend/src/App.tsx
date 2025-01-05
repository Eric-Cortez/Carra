import "./App.css"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./app/Home"
import NotFound from "./app/NotFound"
import PrivateRoute from "./components/PrivateRoute"
import LoginPage from "@/app/login/page"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
