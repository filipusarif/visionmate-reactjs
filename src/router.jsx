import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Assistant from "./pages/Assistant";

export const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {
        path: "/assistant",
        element: <Assistant />,
        errorElement: 
        <div className='flex justify-center items-center w-screen h-screen'>
            <p>file notfound</p>
        </div>  
    }
])