import { Link } from "react-router-dom"

export default function Back({title, to}){
    return (
        <div className="flex fixed top-0 w-full justify-between items-center pt-5 lg:hidden">
            <Link to={to}>
                <img src="/assets/images/menu/back.svg" alt="Back" className="w-6 h-6" />
            </Link>
            <h1 className="font-bold text-lg text-[#0D2352] -translate-x-10">{title}</h1>
            <span></span>
        </div>
    )
}