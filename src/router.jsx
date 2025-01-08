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


export const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "/login", element: <LoginSelection /> },
    {path: "/login/vi", element: <Login/>},
    {path: "/login/guard", element: <LoginGuard/>},
    {path: "/register/", element: <RegisterSelection />},
    {path: "/register/vi", element: <RegisterVI />},
    {path: "/register/guard", element: <RegisterGuard />},
    {
        path: "/assistant",
        element: (
            <ProtectedRoute allowedRoles={["VI"]}>
                <Assistant />
            </ProtectedRoute>
        ),
        errorElement: (
            <div className="flex justify-center items-center w-screen h-screen">
                <p>File not found</p>
            </div>
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
            <div className="flex justify-center items-center w-screen h-screen">
                <p>File not found</p>
            </div>
        ),
    },
])