import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useState } from "react";
import DropDown from "./DropDown";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function Header(props) {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  
function closeMenu(){
  setIsMenuOpen(false)
}
  return (
    <div className="w-full">
      <Navbar className="bg-gray-900 ]flex justify-between z-30 h-[5rem] fixed top-0 w-full">
        <div className="flex justify-between logo-bar ml-5">
          <div>
            <p className="text-white text-[1.5rem] font-bold">ABS</p>
          </div>
        </div>


        <div className="menu">
          <div className="absolute top-4 right-4" onClick={toggleMenu}>
            {isMenuOpen ? (
              <span className="text-white cross">
                <RxCross2 fontSize={28} />
              </span>
            ) : (
              <span className="text-white bar">
                <FaBars fontSize={24} />
              </span>
            )}
          </div>
        </div>

        <div
          className={`flex items-center gap-8 justify-between navlinks mr-5 ${
            isMenuOpen ? "show" : ""
          }`}
        >
          <div className="flex items-center gap-4 navlinks">
            <NavLink to="/" className="text-white font-semibold"
             onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink to="/book/list" className="text-white font-semibold"
             onClick={closeMenu}>
              Add List
            </NavLink>
            <NavLink to="/book/orders" className="text-white font-semibold"
             onClick={closeMenu}
            >
              Order
            </NavLink>

            <div className="navitem-button">
              <div className="flex items-center border-red-500 gap-2 ">
                {!isLoggedIn && (
                  <NavLink to="/login">
                    <button className="bg-richblack-800 text-white px-[12px] py-[10px] rounded-[8px] border border-richblack-700">
                      Login
                    </button>
                  </NavLink>
                )}

                {!isLoggedIn && (
                  <NavLink to="/register">
                    <button className="bg-richblack-800 text-richblack-100 px-[12px] py-[10px] text-white rounded-[8px] border border-richblack-700">
                      Signup
                    </button>
                  </NavLink>
                )}
                {isLoggedIn && (
                  <NavLink to="/">
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        toast.success("Logged out");
                      }}
                      className="bg-richblack-800 text-richblack-100 px-[12px] py-[10px] text-white rounded-[8px] border border-richblack-700"
                    >
                      Log Out
                    </button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
export default Header;
