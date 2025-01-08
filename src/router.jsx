import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/404";
import ViBarcode from "./pages/ViBarcode";
import GuardScan from "./pages/GuardScan";

export const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "/vi",element: <Assistant />,errorElement: <NotFound />},
    {path: "/vi/barcode",element: <ViBarcode />,errorElement: <NotFound />},
    {path: "/guard/scan",element: <GuardScan />,errorElement: <NotFound />},
    {path: "*", element: <NotFound />}
])