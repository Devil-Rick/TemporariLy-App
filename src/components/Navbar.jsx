import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/Images/Logo.png";

export default function Navbar() {
  const location = useLocation();

  const pathMatch = (route) => {
    console.log(route, location.pathname);
    if (location.pathname === route) {
      return true;
    }
  };

  return (
    <>
      <nav className="bg-white border-b-2 shadow-md sticky top-0 px-8 py-5 flex justify-between items-center">
        <div>
          <img className="h-8 cursor-pointer" src={Logo} alt="Company Logo" />
        </div>

        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer text-sm font-semibold  border-b-[3px] border-b-transparent ${
                pathMatch("/") ? "text-black border-b-red-500" : "text-gray-400"
              }`}
            >
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li
              className={`cursor-pointer text-sm font-semibold  border-b-[3px] border-b-transparent ${
                pathMatch("/offers") ? "text-black border-b-red-500" : "text-gray-400"
              }`}
            >
              <NavLink to={"/offers"}>Offers</NavLink>
            </li>
            <li
              className={`cursor-pointer text-sm font-semibold  border-b-[3px] border-b-transparent ${
                pathMatch("/sign-in") ? "text-black border-b-red-500" : "text-gray-400"
              }`}
            >
              <NavLink to={"/sign-in"}>Sign In</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}