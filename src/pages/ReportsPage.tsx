import maskGroup from "@assets/Mask group.svg";
import { IoSearchOutline } from "react-icons/io5";

const ReportsPage = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col items-center md:hidden">
        <header className="w-full h-[93px] bg-[#BFD732] rounded-br-[45px] ps-[30px]! flex flex-col items-start justify-center relative">
          <img
            src={maskGroup}
            alt="Mask group"
            className="w-[119px] absolute right-9"
          />
          <h1 className="text-[30px] font-extrabold text-[#444444] h-[32px] mb-[5px]!">
            Reportes
          </h1>
          <p className="text-[14px] text-[#444444] mb-[35px]!">
            Chequea los reportes de los usuarios
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
              placeholder="buscar por id"
            />
          </div>
        </header>

        <div className="w-[calc(100%-20px)] mx-[10px] mt-[35px]! pt-[20px]! flex-1 bg-[#FFFFFF] rounded-t-[40px] shadow-[0px_4px_4px_0px_#4444444D] flex flex-col items-center justify-start gap-[5px]">
          <div className="w-[calc(100%-40px)] h-[119px] bg-[#E615871A] rounded-[20px] relative flex flex-col items-start justify-center p-[15px]!">
            <div className="w-[4px] h-[77px] absolute bg-[#E61587] rounded-r-[10px] left-0 top-1/2 -translate-y-1/2"></div>
            <div className="w-auto h-[30px] absolute rounded-[40px] bg-[#E6158733] right-[15px] top-[15px] px-[10px]! flex items-center">
              <span className="text-[12px] leading-[100%] text-[#E61587]">
                No respondido
              </span>{" "}
              <div className="w-[6px] h-[6px] rounded-full ms-[5px]! bg-[#E61587]"></div>
            </div>

            <span className="text-[14px] font-bold text-[#444444]">
              Michael David
            </span>
            <p className=" h-[68px] text-[14px] text-[#444444] leading-[17px]">
              <span className="font-bold">Rol:</span> Mentor <br />
              <span className="font-bold">Motivo:</span> Subir mi información{" "}
              <br />
              <span className="font-bold">Email:</span> ma.da@gmail.com <br />
              <span className="font-bold">Fecha ingreso:</span> Ene 13, 2025
            </p>
          </div>

          <div className="w-[calc(100%-40px)] h-[119px] bg-[#39B54A1A] rounded-[20px] relative flex flex-col items-start justify-center p-[15px]!">
            <div className="w-[4px] h-[77px] absolute bg-[#39B54A] rounded-r-[10px] left-0 top-1/2 -translate-y-1/2"></div>
            <div className="w-auto h-[30px] absolute rounded-[40px] bg-[#39B54A33] right-[15px] top-[15px] px-[10px]! flex items-center">
              <span className="text-[12px] leading-[100%] text-[#39B54A]">
                Respondido
              </span>{" "}
              <div className="w-[6px] h-[6px] rounded-full ms-[5px]! bg-[#39B54A]"></div>
            </div>

            <span className="text-[14px] font-bold text-[#444444]">
              Micaela Tamos
            </span>
            <p className=" h-[68px] text-[14px] text-[#444444] leading-[17px]">
              <span className="font-bold">Rol:</span> Mentor <br />
              <span className="font-bold">Motivo:</span> Otro <br />
              <span className="font-bold">Email:</span> micatamos@gmail.com{" "}
              <br />
              <span className="font-bold">Fecha ingreso:</span> Ene 13, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsPage;
