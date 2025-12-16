import doodle from "../assets/doodle-5 1.svg";
import ellipseImage from "../assets/Ellipse 15.svg";
import salyImage from "../assets/Saly-1.svg";
import salybug from "../assets/Saly-30.svg";
import tmpLogo from "../assets/TPM.svg";

export const MainPage = () => {
  return (
    <div className="bg-[#BFD732] h-screen w-screen flex items-center justify-end flex-col relative">
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
        Sign Up
      </button>
      <button className="border-2 border-[#444444] rounded-full w-full max-w-[315px] h-[55px] md:h-[60px] text-[#444444] font-bold text-[15px] mb-[71px]! px-4">
        Login
      </button>
    </div>
  );
};
