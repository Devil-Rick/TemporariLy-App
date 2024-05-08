import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/Images/Logo.png";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const location = useLocation();
  const auth = getAuth();

  const [pageState, setPageState] = useState('Sign In');

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user){
        setPageState('Profile')
      }else{
        setPageState('Sign In');
      }
    })
  }, [auth])

  const pathMatch = (route) => {
    if (location.pathname === route) {
      return true;
    }
  };

  return (
    <>
      <nav className="bg-white border-b-2 shadow-md sticky top-0 px-8 py-5 flex justify-between items-center">
        <div>
          <img className="h-4 md:h-8 cursor-pointer" src={Logo} alt="Company Logo" />
        </div>

        <div>
          <ul className="flex space-x-6 md:space-x-10">
            <li
              className={`cursor-pointer text-sm font-semibold border-b-[3px]  ${
                pathMatch("/") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
              }`}
            >
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li
              className={`cursor-pointer text-sm font-semibold border-b-[3px]  ${
                pathMatch("/offers") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
              }`}
            >
              <NavLink to={"/offers"}>Offers</NavLink>
            </li>
            <li
              className={`cursor-pointer text-sm font-semibold border-b-[3px]  ${
                (pathMatch("/sign-in") || pathMatch('/profile')) ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
              }`}
            >
              <NavLink to={"/profile"}>{pageState}</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
