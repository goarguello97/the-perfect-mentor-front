import maskGroup from "@assets/Mask group.svg";
import doodle from "@assets/doodle-4 1.svg"
import { FaRegDotCircle } from "react-icons/fa";
import { GoDot } from "react-icons/go";
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

      <div className="hidden md:flex w-dvw h-dvh items-center justify-end">
        <div className="w-[calc(100dvw-312px)] h-[calc(100dvh-80px)] bg-[#FFFFFF] me-[40px]! rounded-[35px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] relative">
          <header className="w-full h-[184px] bg-[#F5F6F7] rounded-t-[35px] ps-[65px]! pt-[30px]! relative flex flex-col justify-start">
            <img src={doodle} alt="Doodle" className="absolute w-[180px] right-[109px] -top-[34px] -rotate-10" />
            <img
              src={maskGroup}
              alt="MaskGroup"
              className="absolute w-[314px] right-[35px] top-[33px] z-20"
            />
            <h1 className="text-[50px] font-medium text-[#444444] h-[73px]">
              Reportes
            </h1>
            <p className="text-[20px] text-[#444444] mb-[8px]!">
              Chequea los reportes de los usuarios
            </p>
          </header>
          <div className="w-[calc(100%-70px)] h-[calc(100%-177px)] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] absolute left-1/2 bottom-[40px]  -translate-x-1/2">
            <div className="flex flex-col h-full justify-start flex-1 overflow-hidden">
              <nav className="pt-[25px]! ps-[20px]! flex justify-start flex-0 ">
                <div className="w-full max-w-[513px] h-[55px] shadow-[0px_4px_4px_0px_#4444444D] rounded-[40px] text-[14px] text-[#444444] relative">
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
              </nav>
              <div className="flex flex-col flex-1 min-h-0 mt-[20px]! px-[20px]!">
                <div className="flex flex-col flex-1 shadow-[0px_4px_4px_0px_#00000040] rounded-[20px] overflow-hidden">
                  <div className="bg-[#F5F6F7] h-[40px] grid grid-cols-6 items-center">
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Nombre
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Motivo
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Rol
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Fecha ingreso
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Email
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Estado
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-[6px]">
                    <div className="h-[60px] bg-[#E615871A] grid grid-cols-6 items-center">
                      <div className="text-[14px] font-normal text-[#444444] text-center relative">
                        <div className="w-[4px] h-[40px] font-bold absolute bg-[#E61587] rounded-r-[10px] left-0 top-1/2 -translate-y-1/2"></div>
                        Michael David
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        Subir mi información
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        Mentor
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        Ene. 12, 2022
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        ma.da@gmail.com
                      </div>
                      <div>
                        <div className="w-[100px] h-[20px] flex items-center justify-center bg-[#E6158733] rounded-[40px] px-[7px]! mx-auto!">
                          <span className="h-[20x] leading-[20px] text-[12px] text-[#E61587]">
                            No verificado
                          </span>
                          <div className="w-[6px] h-[6px] bg-[#E61587] rounded-full ms-[5px]!"></div>
                        </div>
                      </div>
                    </div>

                    <div className="h-[60px] bg-[#39B54A1A] grid grid-cols-6 items-center">
                      <div className="text-[14px] font-normal text-[#444444] text-center relative">
                        <div className="w-[4px] h-[40px] font-bold absolute bg-[#39B54A] rounded-r-[10px] left-0 top-1/2 -translate-y-1/2"></div>
                        Micaela Tamos
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        Otro
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        Mentor
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        Ene. 12, 2022
                      </div>
                      <div className="text-[14px] text-[#444444] text-center">
                        micatamos@gmail.com
                      </div>
                      <div>
                        <div className="w-[100px] h-[20px] flex items-center justify-center bg-[#39B54A33] rounded-[40px] px-[7px]! mx-auto!">
                          <span className="h-[20x] leading-[20px] text-[12px] text-[#39B54A]">
                            Verificado
                          </span>
                          <div className="w-[6px] h-[6px] bg-[#39B54A] rounded-full ms-[5px]!"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F5F6F7] h-[40px] grid grid-cols-7 items-center">
                    <div className="text-[#44444480] text-[14px] text-center">
                      Página 1 / 2
                    </div>
                  </div>
                </div>
                <div className="h-[40px]! flex justify-end items-center me-[45px]! mt-[10px]!">
                  <FaRegDotCircle color="#444444" size={16} />
                  <GoDot color="#D9D9D9" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsPage;
