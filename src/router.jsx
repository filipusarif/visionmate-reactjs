import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Assistant from "./pages/VI/Assistant";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuardPage from "./pages/Penjaga/GuardPage";
import Notfound from "./pages/NotFound";
import Barcode from "./pages/VI/Barcode";
import Scan from "./pages/Penjaga/Scan";
import Monitoring from "./pages/Penjaga/Monitoring";


export const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "*", element: <Notfound />},
    {path: "/login", element: <Login /> },
    {path: "/register", element: <Register />},
    {
        path: "/vi",
        element: (
            <ProtectedRoute allowedRoles={["VI"]}>
                <Assistant />
            </ProtectedRoute>
        ),
        errorElement: (
            <Notfound />
        ),
    },
    {
        path: "/vi/barcode",
        element: (
            <ProtectedRoute allowedRoles={["VI"]}>
                <Barcode />
            </ProtectedRoute>
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
            <ProtectedRoute allowedRoles={["Guard"]}>
                <Monitoring />
            </ProtectedRoute>
        ),
        errorElement: (
            <Notfound />
        ),
    },
])