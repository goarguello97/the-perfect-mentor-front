import selector from "@assets/Mask group 2.svg";
import tmpLogo from "@assets/TPM.svg";
import { BiExit } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuChartColumnBig } from "react-icons/lu";
import { TbUsersPlus } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav className="w-full h-[82px] bg-[#444444] fixed z-20 bottom-0 rounded-t-[40px] flex justify-evenly items-center md:hidden">
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <Link to="/users">
            <TbUsersPlus
              size={25}
              color={`${
                location.pathname == "/users" ? "#BFD732" : "#BFD73250"
              }`}
            />
          </Link>
          <img
            src={selector}
            alt="selector"
            className={`absolute bottom-0 ${
              location.pathname == "/users" ? "" : "hidden"
            }`}
          />
        </div>
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <Link to="/stadistics">
            <LuChartColumnBig
              size={25}
              color={`${
                location.pathname == "/stadistics" ? "#BFD732" : "#BFD73250"
              }`}
            />
          </Link>
          <img
            src={selector}
            alt="selector"
            className={`absolute bottom-0 ${
              location.pathname == "/stadistics" ? "" : "hidden"
            }`}
          />
        </div>
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <Link to="/reports">
            <HiOutlineDocumentReport
              size={25}
              color={`${
                location.pathname == "/reports" ? "#BFD732" : "#BFD73250"
              }`}
            />
          </Link>
          <img
            src={selector}
            alt="selector"
            className={`absolute bottom-0 ${
              location.pathname == "/reports" ? "" : "hidden"
            }`}
          />
        </div>
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <Link to="/profile">
            <FiUser
              size={25}
              color={`${
                location.pathname == "/profile" ? "#BFD732" : "#BFD73250"
              }`}
            />
          </Link>
          <img
            src={selector}
            alt="selector"
            className={`absolute bottom-0 ${
              location.pathname == "/profile" ? "" : "hidden"
            }`}
          />
        </div>
      </nav>

      <nav className="hidden md:flex flex-col w-[272px] h-dvh items-center justify-start py-[81px]! bg-[#BFD732] absolute">
        <img src={tmpLogo} alt="The Perfect Mentor" className="w-[200px]" />
        <ul className="mt-[36px]!">
          <Link to="/users"
            className={`flex w-[272px] h-[71px] items-center justify-start px-[36px]! relative ${
              location.pathname == "/users" ? "bg-[#444444]" : "bg-none"
            }`}
          >
            <TbUsersPlus
              size={25}
              color={`${
                location.pathname == "/users" ? "#BFD732" : "#44444490"
              }`}
              className="me-[15px]!"
            />
            <li
              className={`text-[15px] font-medium ${
                location.pathname == "/users"
                  ? "text-[#BFD732]"
                  : "text-[#44444490]"
              }`}
            >
              Usuarios
            </li>
            <img
              src={selector}
              alt="selector"
              className={`absolute right-[-24px] -rotate-90 ${
                location.pathname == "/users" ? "" : "hidden"
              }`}
            />
          </Link>
          <Link to="/stadistics"
            className={`flex w-[272px] h-[71px] items-center justify-start px-[36px]! relative ${
              location.pathname == "/stadistics" ? "bg-[#444444]" : "bg-none"
            }`}
          >
            <LuChartColumnBig
              size={25}
              color={`${
                location.pathname == "/stadistics" ? "#BFD732" : "#44444490"
              }`}
              className="me-[15px]!"
            />
            <li className={`text-[15px] font-medium ${
                location.pathname == "/stadistics"
                  ? "text-[#BFD732]"
                  : "text-[#44444490]"
              }`}>
              Estadísticas
            </li>
            <img
              src={selector}
              alt="selector"
              className={`absolute right-[-24px] -rotate-90 ${
                location.pathname == "/stadistics" ? "" : "hidden"
              }`}
            />
          </Link>
          <Link to="/reports"
            className={`flex w-[272px] h-[71px] items-center justify-start px-[36px]! relative ${
              location.pathname == "/reports" ? "bg-[#444444]" : "bg-none"
            }`}
          >
            <HiOutlineDocumentReport
              size={25}
              color={`${
                location.pathname == "/reports" ? "#BFD732" : "#44444490"
              }`}
              className="me-[15px]!"
            />
            <li className={`text-[15px] font-medium ${
                location.pathname == "/reports"
                  ? "text-[#BFD732]"
                  : "text-[#44444490]"
              }`}>
              Reportes
            </li>
            <img
              src={selector}
              alt="selector"
              className={`absolute right-[-24px] -rotate-90 ${
                location.pathname == "/reports" ? "" : "hidden"
              }`}
            />
          </Link>
          <Link to="/profile"
            className={`flex w-[272px] h-[71px] items-center justify-start px-[36px]! relative ${
              location.pathname == "/profile" ? "bg-[#444444]" : "bg-none"
            }`}
          >
            <FiUser
              size={25}
              color={`${
                location.pathname == "/profile" ? "#BFD732" : "#44444490"
              }`}
              className="me-[15px]!"
            />
            <li className={`text-[15px] font-medium ${
                location.pathname == "/profile"
                  ? "text-[#BFD732]"
                  : "text-[#44444490]"
              }`}>Perfil</li>
            <img
              src={selector}
              alt="selector"
              className={`absolute right-[-24px] -rotate-90 ${
                location.pathname == "/profile" ? "" : "hidden"
              }`}
            />
          </Link>
        </ul>
        <div className="flex-1 flex items-end">
          <button className="w-[272px] flex items-center justify-start px-[36px]!">
            <BiExit size={25} color="#44444490" className="me-[15px]!" />
            <span className="text-[#44444490] text-[15px] font-medium">
              Salir
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
