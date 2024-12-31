import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAppSelector } from "./app/hooks"
import Home from "./pages/Home"
import Login from "./pages/Login"

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  return isAuthenticated ? element : <Navigate to="/" replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
