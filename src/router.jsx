import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Assistant from "./pages/VI/Assistant";
import RegisterVI from "./pages/VI/RegisterVI";
import LoginSelection from "./pages/LoginSelection";
import RegisterSelection from "./pages/RegisterSelection";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Login from "./pages/VI/Login";
import GuardPage from "./pages/Penjaga/GuardPage";
import LoginGuard from "./pages/Penjaga/LoginGuard";
import RegisterGuard from "./pages/Penjaga/RegisterGuard";
import Notfound from "./pages/NotFound";
import Barcode from "./pages/VI/Barcode";
import Scan from "./pages/Penjaga/Scan";
import Monitoring from "./pages/Penjaga/Monitoring";


export const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "*", element: <Notfound />},
    {path: "/login", element: <LoginSelection /> },
    {path: "/login/vi", element: <Login/>},
    {path: "/login/guard", element: <LoginGuard/>},
    {path: "/register/", element: <RegisterSelection />},
    {path: "/register/vi", element: <RegisterVI />},
    {path: "/register/guard", element: <RegisterGuard />},
    {
        path: "/vi",
        element: (
                <Assistant />
            // <ProtectedRoute allowedRoles={["VI"]}>
            // </ProtectedRoute>
        ),
        errorElement: (
            <Notfound />
        ),
    },
    {
        path: "/vi/barcode",
        element: (
                <Barcode />
        ),
        errorElement: (
            <Notfound />
        ),
    },
    {
        path: "/guard",
        element: (
            <ProtectedRoute allowedRoles={["Guard"]}>
                <GuardPage />
            </ProtectedRoute>
        ),
        errorElement: (
            <Notfound />
        ),
    },
    {
        path: "/guard/scan",
        element: (
            <ProtectedRoute allowedRoles={["Guard"]}>
                <Scan />
            </ProtectedRoute>
        ),
        errorElement: (
            <Notfound />
        ),
    },
    {
        path: "/guard/monitoring",
        element: (
                <Monitoring />
            // <ProtectedRoute allowedRoles={["Guard"]}>
            // </ProtectedRoute>
        ),
        errorElement: (
            <Notfound />
        ),
    },
])