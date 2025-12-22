import selector from "@assets/Mask group 2.svg";
import tmpLogo from "@assets/TPM.svg";
import { BiExit } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuChartColumnBig } from "react-icons/lu";
import { TbUsersPlus } from "react-icons/tb";

const Navbar = () => {
  return (
    <>
      <nav className="w-full h-[82px] bg-[#444444] fixed z-20 bottom-0 rounded-t-[40px] flex justify-evenly items-center md:hidden">
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <TbUsersPlus size={25} color="#BFD732" />
          <img src={selector} alt="selector" className="absolute bottom-0" />
        </div>
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <LuChartColumnBig size={25} color="#BFD73250" />
          <img
            src={selector}
            alt="selector"
            className="absolute bottom-0 hidden"
          />
        </div>
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <HiOutlineDocumentReport size={25} color="#BFD73250" />
          <img
            src={selector}
            alt="selector"
            className="absolute bottom-0 hidden"
          />
        </div>
        <div className="relative w-[72px] h-[82px] flex items-center justify-center">
          <FiUser size={25} color="#BFD73250" />
          <img
            src={selector}
            alt="selector"
            className="absolute bottom-0 hidden"
          />
        </div>
      </nav>

      <nav className="hidden md:flex flex-col w-[272px] h-dvh items-center justify-start py-[81px]! bg-[#BFD732] absolute">
        <img src={tmpLogo} alt="The Perfect Mentor" className="w-[200px]" />
        <ul className="mt-[36px]!">
          <div className="flex w-[272px] h-[71px] bg-[#444444] items-center justify-start px-[36px]! relative">
            <TbUsersPlus size={25} color="#BFD732" className="me-[15px]!" />
            <li className="text-[#BFD732] text-[15px] font-medium">Usuarios</li>
            <img
              src={selector}
              alt="selector"
              className="absolute right-[-24px] -rotate-90"
            />
          </div>
          <div className="flex w-[272px] h-[71px] items-center justify-start px-[36px]!">
            <LuChartColumnBig
              size={25}
              color="#44444490"
              className="me-[15px]!"
            />
            <li className="text-[#44444490] text-[15px] font-medium">
              Estadísticas
            </li>
          </div>
          <div className="flex w-[272px] h-[71px] items-center justify-start px-[36px]!">
            <HiOutlineDocumentReport
              size={25}
              color="#44444490"
              className="me-[15px]!"
            />
            <li className="text-[#44444490] text-[15px] font-medium">
              Reportes
            </li>
          </div>
          <div className="flex w-[272px] h-[71px] items-center justify-start px-[36px]!">
            <FiUser size={25} color="#44444490" className="me-[15px]!" />
            <li className="text-[#44444490] text-[15px] font-medium">Perfil</li>
          </div>
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
