import avatar from "@assets/avatar.svg";
import doodle from "@assets/doodle-4 1.svg";
import doodle2 from "@assets/doodle-5 1.svg";
import maskGroup from "@assets/Mask group.svg";
import saly from "@assets/Saly-30.svg";
import { useEffect } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { COMPLETE_USER_DATA_INITIAL_VALUES } from "../constants";
import { updateUser } from "../features/auth/authSlice";
import { getRoles } from "../features/roles/rolesSlice";
import { validationCompleteUserData } from "../helpers/validations";
import useForm from "../hooks/useFormHook";

const CompleteUserDataPage = () => {
  const dispatch = useAppDispatch();
  const { errors, status, roles } = useAppSelector((state) => state.roles);

  const { formErrors, handleChange, handleSubmit, values } = useForm(
    COMPLETE_USER_DATA_INITIAL_VALUES,
    updateUser,
    validationCompleteUserData
  );

  useEffect(() => {
    if (!roles) {
      dispatch(getRoles());
    }
  }, [errors.roles, status.roles]);

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
          <form
            onSubmit={handleSubmit}
            className="w-[calc(100%-40px)] mt-[100px]! flex flex-col items-center justify-center pb-[87px]!"
          >
            <label className="text-[12px] text-[#3A3D46] w-full">
              Tu nombre: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="text"
                placeholder="David"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <label className="text-[12px] text-[#3A3D46] w-full">
              Tu apellido: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="text"
                placeholder="Gordon"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <label className="text-[12px] text-[#3A3D46] w-full">
              Tu fecha de nacimiento: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="date"
                placeholder="davidgordon@gmail.com"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <label className="text-[12px] text-[#3A3D46] w-full relative">
              Tu país: <br />
              <input
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                type="country"
                placeholder="Argentina"
                name="country"
                value={values.country}
                onChange={handleChange}
              />
              <FaEyeSlash
                size={14}
                color="#444444"
                className="absolute top-1/2 -translate-y-1/2 right-[5.5px]"
              />
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>

            <label className="text-[12px] text-[#3A3D46] w-full">
              Rol: <br />
              <select
                name="role"
                id=""
                className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                value={values.role}
                onChange={handleChange}
              >
                <option
                  value="{role._id}"
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                ></option>
                {roles?.map((role: any, i) => (
                  <option
                    key={i}
                    value={role._id}
                    className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  >
                    {role.role.charAt(0).toUpperCase() +
                      role.role.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
            </label>
            <button className="bg-[#444444] rounded-full w-full max-w-[315px] h-[55px] md:h-[60px] text-white font-bold text-[15px] z-10 px-4">
              Guardar
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-dvw h-dvh items-center justify-center">
        <div className="w-[calc(100dvw-312px)] h-[calc(100dvh-80px)] bg-[#FFFFFF] me-[40px]! rounded-[35px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] relative">
          <header className="w-full h-[184px] bg-[#F5F6F7] rounded-t-[35px] pt-[30px]! relative flex flex-col justify-start items-center">
            <h1 className="text-[50px] font-medium text-[#444444] h-[73px]">
              Perfil
            </h1>
          </header>
          <div className="w-full max-w-[548px] h-[calc(100%-177px)] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] absolute left-1/2 bottom-[40px] -translate-x-1/2 flex flex-col justify-start items-center">
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

            <form
              onSubmit={handleSubmit}
              className="w-[calc(100%-40px)] mt-[148px]! flex flex-col items-center justify-center"
            >
              <label className="text-[12px] text-[#3A3D46] w-full">
                Tu nombre: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="text"
                  placeholder="David"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full">
                Tu apellido: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="text"
                  placeholder="Gordon"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full">
                Tu fecha de nacimiento: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="date"
                  lang="es-ES"
                  placeholder="davidgordon@gmail.com"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full relative">
                Tu país: <br />
                <input
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  type="text"
                  placeholder="Argentina"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                />
                <FaEyeSlash
                  size={14}
                  color="#444444"
                  className="absolute top-1/2 -translate-y-1/2 right-[5.5px]"
                />
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <label className="text-[12px] text-[#3A3D46] w-full">
                Rol: <br />
                <select
                  name="role"
                  className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  value={values.role}
                  onChange={handleChange}
                >
                  <option
                    value="{role._id}"
                    className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                  ></option>
                  {roles?.map((role: any, i) => (
                    <option
                      key={i}
                      value={role._id}
                      className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                    >
                      {role.role.charAt(0).toUpperCase() +
                        role.role.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                <div className="w-full border-b border-[#4444444D] mb-[15px]!"></div>
              </label>
              <button
                type="submit"
                className="bg-[#444444] hover:bg-[#666666] rounded-full w-full max-w-[323px] h-[55px] md:h-[60px] text-white font-bold text-[15px] z-10 px-4 mt-[20px]! cursor-pointer"
              >
                Guardar
              </button>
            </form>
            {Object.keys(formErrors).length !== 0 && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
                <div className="w-[50%] h-auto min-h-[100px] flex items-center justify-center bg-[#444444] p-3! rounded-[40px] text-white">
                  {Object.keys(formErrors).length !== 0}
                  {Object.values(formErrors).map((error: any, i: number) => (
                    <p key={i} className="p-3!">
                      {error}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteUserDataPage;
