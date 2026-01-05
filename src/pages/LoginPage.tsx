import doodle2 from "@assets/doodle-4 1.svg";
import doodle from "@assets/doodle-5 1.svg";
import email from "@assets/email.svg";
import group from "@assets/Mask group.svg";
import password from "@assets/password.svg";
import saly from "@assets/Saly-2.svg";
import salybug from "@assets/Saly-30.svg";
import tmpLogo from "@assets/TPM.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { LOGIN_INITIAL_VALUES } from "../constants";
import { loginUser, resetAuthState } from "../features/auth/authSlice";
import { validationLogin } from "../helpers/validations";
import useHook from "../hooks/useFormHook";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, ok, isLoading } = useAppSelector((state) => state.auth);

  const { values, handleChange, handleSubmit, errors } = useHook(
    LOGIN_INITIAL_VALUES,
    loginUser,
    validationLogin
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (error) {
      timer = setTimeout(() => {
        dispatch(resetAuthState());
      }, 5000);
    } else if (ok) {
      timer = setTimeout(() => {
        navigate("/users");
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dispatch, error, ok, isLoading]);

  return (
    <>
      <div className="bg-[#BFD732] h-dvh w-screen flex items-center justify-center flex-col md:hidden">
        <div className="w-[315px] relative">
          <img src={tmpLogo} alt="The Perfect Mentor" className="w-[200.62]" />
          <img
            src={doodle}
            alt="Doodle"
            className="absolute left-[160px] top-[-40px] -rotate-90"
          />
          <img
            src={salybug}
            alt="Doodle"
            className="absolute w-[108px] left-[100px] top-[-55px]"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-[315px] h-[361px] border-2 border-[#444444] rounded-[40px] mt-[20.58px]! mb-[25px]! flex flex-col items-center justify-center">
            <h1 className="w-[265px] font-extrabold text-[30px] text-[#444444] mb-[19px]!">
              Iniciar Sesión
            </h1>
            <div className="w-[285px] h-0 border-dashed border border-[#444444] mb-[19px]!"></div>

            <h2 className="w-[265px] font-normal text-[30px] text-[#444444] mb-[13px]!">
              Hola!
            </h2>

            <div className="relative h-[55px] mb-[15px]!">
              <span className="absolute left-[27px] top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={email} alt="Email" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={values.email}
                onChange={handleChange}
                className="w-[265px] h-[55px] border rounded-[40px] font-normal text-[14px] text-[#444444] pl-[53px]!"
                required
              />
            </div>
            <div className="relative h-[55px]">
              <span className="absolute left-[27px] top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={password} alt="Password" />
              </span>
              <input
                type="password"
                name="password"
                placeholder="contraseña"
                value={values.password}
                onChange={handleChange}
                className="w-[265px] h-[55px] border rounded-[40px] font-normal text-[14px] text-[#444444] pl-[53px]!"
                required
              />
            </div>
            <a
              href=""
              className="w-[265px] text-[12px] mt-[15px]! text-[#444444]"
            >
              ¿No recuerdas tu contraseña?
            </a>
          </div>
          <button className="bg-[#444444] rounded-full w-full max-w-[315px] h-[55px] md:h-[60px] text-white font-bold text-[15px] z-10 px-4">
            Iniciar Sesión
          </button>
        </form>
        {Object.keys(errors).length !== 0 && (
          <div className="absolute w-dvw h-dvh left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#FFFFFF90] z-30">
            <div className="w-[315px] h-auto min-h-[100px] bg-[#444444] rounded-[40px] flex items-center justify-center text-white">
              {Object.keys(errors).length !== 0}
              {Object.values(errors).map((error: any, i: number) => (
                <p key={i} className="p-3!">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}
        {error && (
          <div className="absolute w-dvw h-dvh left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#FFFFFF90] z-30">
            <div className="w-[315px] h-auto min-h-[100px] bg-[#444444] rounded-[40px] flex items-center justify-center text-white">
              <p className="p-3!">{error}</p>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="absolute w-dvw h-dvh left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#FFFFFF90] z-30">
            <BounceLoader color="#39B54A" />
          </div>
        )}
      </div>

      <div className="hidden md:flex bg-[#BFD732] h-screen w-screen items-center justify-center">
        <div className="w-[886px] h-[514px] border-2 rounded-[40px] border-[#444444] flex justify-end items-center relative py-[32px]! px-[20px]!">
          <img
            src={group}
            alt="Group"
            className="absolute left-1/20 top-0 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={saly}
            alt="Saly"
            className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={doodle2}
            alt="Doodle2"
            className="absolute -rotate-25 left-1/9 top-8/10 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={doodle}
            alt="Doodle"
            className="absolute rotate-200 left-4/10 top-1/3 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={salybug}
            alt="Salybug"
            className="w-[245px] absolute rotate-150 left-4/10 top-0 -translate-x-1/2 -translate-y-1/2"
          />
          <form
            onSubmit={handleSubmit}
            className="w-[50%] h-full border-s-2 border-[#444444] flex items-center justify-center flex-col relative"
          >
            <img
              src={tmpLogo}
              alt="The Perfect Mentor"
              className="absolute left-1/3 -top-1/4 -translate-x-1/2 -translate-y-1/2"
            />
            <h1 className="w-[323px] h-[59px] font-extrabold text-[40px] text-[#444444] mb-[19px]!">
              Iniciar Sesión
            </h1>
            <div className="w-[323px] h-0 border-dashed border border-[#444444] mb-[20px]!"></div>
            <h2 className="w-[265px] font-normal text-[30px] text-[#444444] mb-[13px]!">
              Hola!
            </h2>
            <div className="relative h-[55px] mb-[15px]!">
              <span className="absolute left-[27px] top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={email} alt="Email" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={values.email}
                onChange={handleChange}
                className="w-[323px] h-[55px] border rounded-[40px] font-normal text-[14px] text-[#444444] pl-[53px]!"
                required
              />
            </div>
            <div className="relative h-[55px]">
              <span className="absolute left-[27px] top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={password} alt="Password" />
              </span>
              <input
                type="password"
                name="password"
                placeholder="contraseña"
                value={values.password}
                onChange={handleChange}
                className="w-[323px] h-[55px] border rounded-[40px] font-normal text-[14px] text-[#444444] pl-[53px]!"
                required
              />
            </div>

            <a
              href=""
              className="w-[323px] text-[12px] mt-[15px]! text-[#444444]"
            >
              ¿No recuerdas tu contraseña?
            </a>

            <button
              type="submit"
              className="bg-[#444444] hover:bg-[#666666] rounded-full w-full max-w-[323px] h-[55px] md:h-[60px] text-white font-bold text-[15px] z-10 px-4 mt-[20px]! cursor-pointer"
            >
              Iniciar sesión
            </button>
          </form>

          {Object.keys(errors).length !== 0 && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
              <div className="w-[50%] h-auto min-h-[100px] flex items-center justify-center bg-[#444444] p-3! rounded-[40px] text-white">
                {Object.keys(errors).length !== 0}
                {Object.values(errors).map((error: any, i: number) => (
                  <p key={i} className="p-3!">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          )}
          {error && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
              <div className="w-[50%] h-auto min-h-[100px] flex items-center justify-center bg-[#444444] p-3! rounded-[40px] text-white">
                <p className="p-3!">{error}</p>
              </div>
            </div>
          )}
          {isLoading && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
              <BounceLoader color="#39B54A" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
