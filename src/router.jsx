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
import EditProfile from "./pages/EditProfile";
import RedirectIfAuthenticated from "./middleware/RedirectIfAuthenticated";


export const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "*", element: <Notfound />},
    {
        path: "/login", 
        element: (
            <RedirectIfAuthenticated>
                <Login /> 
            </RedirectIfAuthenticated>
        )
    },
    {
        path: "/register", 
        element: (
            <RedirectIfAuthenticated>
                <Register /> 
            </RedirectIfAuthenticated>
        )
    },
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
        path: "/vi/profile",
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
        path: "/vi/profile/edit",
        element: (
            <ProtectedRoute allowedRoles={["VI"]}>
                <EditProfile/>
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
                <Monitoring />
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
        path: "/guard/editprofile",
        element: (
            <ProtectedRoute allowedRoles={["Guard"]}>
                <EditProfile/>
            </ProtectedRoute>
        ),
        errorElement: (
            <Notfound />
        ),
    },
])