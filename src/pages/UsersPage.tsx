import doodle2 from "@assets/doodle-4 1.svg";
import doodle from "@assets/doodle-5 1.svg";
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { TbEditCircle } from "react-icons/tb";

const UsersPage = () => {
  return (
    <div className="flex w-full h-full flex-col items-center">
      <header className="w-full h-[93px] bg-[#BFD732] rounded-br-[45px] ps-[30px]! flex flex-col items-start justify-center relative">
        <img
          src={doodle}
          alt="Doodle"
          className="absolute w-[135px] right-20 -top-18"
        />
        <img
          src={doodle2}
          alt="Doodle2"
          className="absolute w-[256px] -rotate-20 -right-18 -bottom-23"
        />
        <h1 className="text-[30px] font-extrabold text-[#444444] h-[32px] mb-[5px]!">
          Usuarios
        </h1>
        <p className="text-[14px] text-[#444444] mb-[35px]!">
          Ver todos los usuarios
        </p>
        <div className="w-[315px] h-[55px] absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
          <IoSearchOutline
            size={25}
            color="#444444"
            className="absolute left-[25px] top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            className="w-full h-full text-[14px] text-[#444444] bg-[#FFFFFF] rounded-[25px] pl-[49px]!"
            placeholder="buscar usuarios"
          />
        </div>
      </header>
      <div className="w-[calc(100%-20px)] mx-[10px] mt-[35px]! flex-1 bg-[#FFFFFF] rounded-t-[40px] shadow-[0px_4px_4px_0px_#4444444D] flex flex-col items-center justify-start">
        <nav className="w-[calc(100%-40px)] h-[50px] bg-[#F5F6F7] rounded-[40px] mt-[10px]! flex items-center justify-between">
          <span className="text-[15px] font-bold w-[43px] ms-[20px]! text-[#444444]">
            Filtros
          </span>
          <div className="flex">
            <button className="w-[92px] h-[40px] rounded-[40px] text-[15px] font-bold text-[#44444430] border border-[#44444430] me-[10px]!">
              Age
            </button>
            <button className="w-[92px] h-[40px] rounded-[40px] text-[15px] font-bold text-[#DADADA] bg-[#444444] me-[5px]! px-[16px]! flex items-center ">
              Status <IoMdClose size={20} />
            </button>
          </div>
        </nav>

        <div className="w-[calc(100%-40px)] h-[102px] mt-[10px]! bg-[#E615871A] rounded-[20px] relative flex flex-col items-start justify-center p-[15px]!">
          <div className="w-[4px] h-[60px] absolute bg-[#E61587] rounded-r-[10px] left-0 top-1/2 -translate-y-1/2"></div>
          <div className="w-auto h-[20px] absolute rounded-[40px] bg-[#E6158733] right-[15px] top-[15px] px-[10px]! flex items-center">
            <span className="text-[12px] leading-[100%] text-[#E61587]">
              No verificado
            </span>{" "}
            <div className="w-[6px] h-[6px] rounded-full ms-[5px]! bg-[#E61587]"></div>
          </div>
          <button className="absolute right-[15px] bottom-[24px] w-[35px] h-[35px] flex items-center justify-center rounded-full bg-[#FFFFFF]">
            <TbEditCircle size={30} color="#44444440" />
          </button>
          <span className="text-[14px] font-bold text-[#444444]">
            Michael David | 25 años
          </span>
          <p className=" h-[51px] text-[14px] text-[#444444] leading-[17px]">
            <span className="font-bold">Email:</span> ma.da@gmail.com <br />
            <span className="font-bold">Rol:</span> Mentor <br />
            <span className="font-bold">Fecha ingreso:</span> Ene 13, 2025
          </p>
        </div>

        <div className="w-[calc(100%-40px)] h-[102px] mt-[10px]! bg-[#39B54A1A] rounded-[20px] relative flex flex-col items-start justify-center p-[15px]!">
          <div className="w-[4px] h-[60px] absolute bg-[#39B54A] rounded-r-[10px] left-0 top-1/2 -translate-y-1/2"></div>
          <div className="w-auto h-[20px] absolute rounded-[40px] bg-[#39B54A33] right-[15px] top-[15px] px-[10px]! flex items-center">
            <span className="text-[12px] leading-[100%] text-[#39B54A]">
              Verificado
            </span>{" "}
            <div className="w-[6px] h-[6px] rounded-full ms-[5px]! bg-[#39B54A]"></div>
          </div>
          <button className="absolute right-[15px] bottom-[24px] w-[35px] h-[35px] flex items-center justify-center rounded-full bg-[#FFFFFF]">
            <TbEditCircle size={30} color="#44444440" />
          </button>
          <span className="text-[14px] font-bold text-[#444444]">
            Micaela Tamos | 30 años
          </span>
          <p className=" h-[51px] text-[14px] text-[#444444] leading-[17px]">
            <span className="font-bold">Email:</span> micatamos@gmail.com <br />
            <span className="font-bold">Rol:</span> Mentor <br />
            <span className="font-bold">Fecha ingreso:</span> Ene 13, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
