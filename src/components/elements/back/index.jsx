import { Link } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Back({title, to, out}){
    const { logOut } = UserAuth();
    const navigate = useNavigate();
    

    const handleLogOut = async () => {
        try {
            await logOut();
            if (window.location.pathname === "/") {
                window.location.reload(); 
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    return (
        <div className="flex fixed top-0 w-full justify-between items-center pt-5 lg:hidden">
            <Link to={to}>
                <img src="/assets/images/menu/back.svg" alt="Back" className="w-6 h-6" />
            </Link>
            { out === "profile" ? (
                <>
                <h1 className="font-bold text-lg text-[#0D2352]">{title}</h1>
                <button
                onClick={handleLogOut}
                className="flex items-center gap-0 justify-start mr-7
                "
                >
                    <img src="/assets/images/logout.svg" alt="" />
                </button>
                </>
            ):(
                <>
                <h1 className="font-bold text-lg text-[#0D2352] -translate-x-10">{title}</h1>
                <span></span>
                </>
            ) }
        </div>
    )
}