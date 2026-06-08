import { NavLink, useLocation } from "react-router-dom"
import { LuLink } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

export const Navbar = () => {
    const location = useLocation();
    return (
        <div className="my-4 mx-10 p-5 shadow-lg rounded-lg bg-white flex justify-between">
            <div className="flex items-center">
                <h1 className="mr-2"><LuLink className="text-primary text-lg"/></h1>
                <h1 className="text-lg">LinkShort</h1>
            </div>
            <div className="flex gap-6">
                <NavLink to="/"  className={`flex items-center gap-1 ${location.pathname === "/" ? "text-primary" : "text-gray-600"}`}> 
                    <IoHomeOutline />
                    <h1 >Home</h1>
                </NavLink>
                <NavLink  to="/dashboard" className={`flex items-center gap-1 ${location.pathname === "/dashboard" ? "text-primary" : "text-gray-600"}`}>
                    <MdDashboard />
                    <h1 >Dashboard</h1>
                </NavLink>
            </div>
        </div>
    )
}