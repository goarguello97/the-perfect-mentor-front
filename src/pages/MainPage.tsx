import doodle2 from "@assets/doodle-4 1.svg";
import doodle from "@assets/doodle-5 1.svg";
import ellipseImage from "@assets/Ellipse 15.svg";
import salyImage from "@assets/Saly-1.svg";
import salybug from "@assets/Saly-30.svg";
import tmpLogo from "@assets/TPM.svg";

const MainPage = () => {
  return (
    <>
      <div className="bg-[#BFD732] h-screen w-screen flex items-center justify-end flex-col relative md:hidden">
        <img
          src={tmpLogo}
          alt="The Perfect Mentor"
          className="absolute left-[30.68px] top-[71px] z-10 w-[200.62]"
        />
        <div className="relative w-screen h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={salyImage}
            alt="Saly"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={ellipseImage}
            alt="Ellipse"
            className="absolute top-[15%] left-[20%]"
          />
          <img src={doodle} alt="Doodle" className="absolute top-[15%]" />
          <img
            src={salybug}
            alt="SalyBug"
            className="absolute bottom-[10%] left-[30%]"
          />
        </div>

        <button className="bg-[#444444] rounded-full w-full max-w-[315px] h-[55px] md:h-[60px] text-white font-bold text-[15px] mb-[10px]! z-10 px-4">
          Registrarse
        </button>
        <button className="border-2 border-[#444444] rounded-full w-full max-w-[315px] h-[55px] md:h-[60px] text-[#444444] font-bold text-[15px] mb-[71px]! px-4">
          Iniciar sesión
        </button>
      </div>

      <div className="hidden md:flex bg-[#BFD732] h-screen w-screen items-center justify-center">
        <div className="w-[886px] h-[514px] border-2 rounded-[40px] border-[#444444] flex justify-end items-center relative">
          <img
            src={salyImage}
            alt="Saly"
            className="absolute w-[560px] left-[20%] top-[48%] -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={doodle}
            alt="Doodle"
            className="absolute left-0 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={salybug}
            alt="SalyBug"
            className="absolute w-[245px] left-full rotate-64 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={doodle2}
            alt="Doodle2"
            className="absolute top-[-10%] left-[40%] -translate-x-1/2 -translate-y-1/2"
          />
          <div className="w-[50%] h-full flex flex-col justify-between">
            <img
              src={tmpLogo}
              alt="The Perfect Mentor"
              className="max-w-[248.37px] mt-[110px]!"
            />
            <div className="mb-[98px]!">
              <button className="bg-[#444444] rounded-full w-full max-w-[315px] h-[55px]  text-white font-bold text-[15px] mb-[10px]! z-10 px-4">
                Registrarse
              </button>
              <button className="border-2 border-[#444444] rounded-full w-full max-w-[315px] h-[55px] text-[#444444] font-bold text-[15px] px-4">
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
