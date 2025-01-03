import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "/homepage", element: <Homepage />}
])