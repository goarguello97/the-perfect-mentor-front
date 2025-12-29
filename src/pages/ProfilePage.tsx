import avatar from "@assets/avatar.svg";
import doodle from "@assets/doodle-4 1.svg";
import doodle2 from "@assets/doodle-5 1.svg";
import maskGroup from "@assets/Mask group.svg";
import saly from "@assets/Saly-30.svg";
import { FaEyeSlash } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";

const ProfilePage = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col items-center md:hidden relative">
        <header className="w-full h-[185px] bg-[#BFD732] rounded-br-[45px] ps-[30px]! flex flex-col items-start relative">
          <h1 className="h-[63px] text-[30px] font-extrabold text-[#444444] leading-[63px] mb-[5px]!">
            Perfil
          </h1>
          <button className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-[#FFFFFF] border-3 border-[#44444490] absolute left-[125px] top-[10px]">
            <TbEditCircle size={35} color="#44444490" />
          </button>
        </header>
        <div className="w-[136px] h-[136px] absolute bg-[#94F0F0] rounded-full top-[15px] right-[31px] overflow-hidden flex items-center justify-center z-10">
          <img
            src={avatar}
            alt="Avatar"
            className="h-full object-cover rounded-full"
          />
        </div>
        <div className="w-[calc(100%-20px)] h-[calc(100dvh-63px)] mx-[10px] bg-[#FFFFFF] rounded-t-[40px] shadow-[0px_4px_4px_0px_#4444444D] flex flex-col items-center justify-start absolute left-1/2 bottom-0 -translate-x-1/2 overflow-y-auto">
          <form className="w-[calc(100%-40px)] mt-[100px]! flex flex-col items-start justify-center pb-[87px]!">
            <label className="text-[12px] text-[#3A3D46] w-full">
              Tu nombre: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="text"
                placeholder="David Gordon"
                name="name"
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <label className="text-[12px] text-[#3A3D46] w-full">
              Tu email: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="text"
                placeholder="davidgordon@gmail.com"
                name="email"
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <label className="text-[12px] text-[#3A3D46] w-full relative">
              Tu contraseña: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="password"
                placeholder="********"
                name="password"
              />
              <FaEyeSlash
                size={14}
                color="#444444"
                className="absolute top-1/2 -translate-y-1/2 right-[5.5px]"
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <label className="text-[12px] text-[#3A3D46] w-full">
              Edad: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="number"
                placeholder="35"
                name="age"
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <label className="text-[12px] text-[#3A3D46] w-full">
              Rol: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="text"
                placeholder="Mentor"
                name="rol"
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-dvw h-dvh items-center justify-end">
        <div className="w-[calc(100dvw-312px)] h-[calc(100dvh-80px)] bg-[#FFFFFF] me-[40px]! rounded-[35px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] relative">
          <header className="w-full h-[184px] bg-[#F5F6F7] rounded-t-[35px] pt-[30px]! relative flex flex-col justify-start items-center">
            <h1 className="text-[50px] font-medium text-[#444444] h-[73px]">
              Perfil
            </h1>
          </header>
          <div className="w-[calc(100%-580px)] h-[calc(100%-177px)] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] absolute left-1/2 bottom-[40px] -translate-x-1/2 flex flex-col justify-start items-center">
            <img
              src={maskGroup}
              alt="MaskGroup"
              className="absolute rotate-85 w-[240px] -right-[103px] -top-[54px]"
            />
            <img
              src={doodle}
              alt="Doodle"
              className="absolute w-[180px] -right-[174px] top-[206px]"
            />
            <img
              src={doodle2}
              alt="Doodle2"
              className="absolute w-[180px] -left-[183px] top-[22px]"
            />
            <img
              src={saly}
              alt="Saly"
              className="absolute w-[286px] -left-[160px] -top-[130px] -rotate-110"
            />
            <div className="w-[136px] h-[136px] absolute bg-[#94F0F0] rounded-full -top-[28px] left-1/2 -translate-x-1/2 overflow-hidden flex items-center justify-center">
              <img
                src={avatar}
                alt="Avatar"
                className="h-full object-cover rounded-full"
              />
            </div>

            <button className="w-auto h-[35px] flex items-center justify-center mt-[128px]! px-[24px]! py-[5px]! border border-[#44444426] rounded-[16px] text-[#44444480] font-bold">
              Editar{" "}
              <TbEditCircle size={18} color="#44444490" className="ms-[9px]!" />
            </button>

            <form className="w-[calc(100%-40px)] mt-[20px]! flex flex-col items-start justify-center">
              <label className="text-[12px] text-[#3A3D46] w-full">
                Tu nombre: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="text"
                  placeholder="David Gordon"
                  name="name"
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full">
                Tu email: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="text"
                  placeholder="davidgordon@gmail.com"
                  name="email"
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full relative">
                Tu contraseña: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="password"
                  placeholder="********"
                  name="password"
                />
                <FaEyeSlash
                  size={14}
                  color="#444444"
                  className="absolute top-1/2 -translate-y-1/2 right-[5.5px]"
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full">
                Edad: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="number"
                  placeholder="35"
                  name="age"
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full">
                Rol: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="text"
                  placeholder="Mentor"
                  name="rol"
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
