import { Link } from "react-router-dom"

export default function Back({title, to}){
    return (
        <div className="flex justify-between items-center pt-5 lg:hidden">
            <Link to={to}>
                <img src="/assets/images/menu/back.svg" alt="Back" className="w-6 h-6" />
            </Link>
            <h1 className="font-bold text-lg text-dark">{title}</h1>
            <span></span>
        </div>
    )
}