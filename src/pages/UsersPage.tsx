import doodle2 from '@assets/doodle-4 1.svg';
import doodle from '@assets/doodle-5 1.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaRegDotCircle } from 'react-icons/fa';
import { GoDot } from 'react-icons/go';
import {
  IoCheckmark,
  IoClose,
  IoPersonAddOutline,
  IoPersonAddSharp,
  IoSearchOutline,
} from 'react-icons/io5';
import { TbEditCircle } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { SEARCH_PASS_INITIAL_VALUES } from '../constants';
import { getMessages, setActiveChat } from '../features/chat/chatSlice';
import {
  getMatches,
  getMatchesReq,
  match,
  responseMatch,
} from '../features/match/matchSlice';
import { getUsers } from '../features/users/usersSlice';
import { validationSearch } from '../helpers/validations';
import useDebounce from '../hooks/useDebounceHook';
import useForm from '../hooks/useFormHook';
interface FilterState {
  search: string;
  verify: boolean;
  age: boolean;
  page: string;
}
const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { status, users, page, totalPages } = useAppSelector(
    (state) => state.users,
  );

  const auth = useAppSelector((state) => state.auth);
  const matches = useAppSelector((state) => state.matches);

  const [mobilePage, setMobilePage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { handleChange, setValues, values } = useForm(
    SEARCH_PASS_INITIAL_VALUES,
    getUsers,
    validationSearch,
  );

  const debouncedValues = useDebounce<FilterState>(values, 500);

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = [
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dic.',
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      const params = new URLSearchParams({
        ...debouncedValues,
        page: newPage.toString(),
      } as any).toString();

      dispatch(getUsers(params));
    }
  };

  const fetchNextPage = useCallback(() => {
    if (mobilePage < (totalPages || 0) && status.users !== 'loading') {
      const nextPage = mobilePage + 1;
      setMobilePage(nextPage);

      const params = new URLSearchParams({
        ...(debouncedValues as any),
        page: nextPage.toString(),
        limit: '6',
        isScrolling: 'true',
      }).toString();

      dispatch(getUsers(params));
    }
  }, [mobilePage, totalPages, status.users, debouncedValues, dispatch]);

  const handleMatch = async (receiverId: string, receiverName: string) => {
    const isMobile = window.innerWidth < 768;
    try {
      await dispatch(match({ senderId: auth.user!._id, receiverId })).unwrap();

      dispatch(getMatches());
      dispatch(getMatchesReq());

      Swal.fire({
        position: isMobile ? 'center' : 'top-end',
        icon: 'success',
        title: `Solicitud enviada a ${receiverName}`,
        showConfirmButton: false,
        timer: 2000,
        toast: !isMobile,
      });
    } catch (error) {
      Swal.fire({
        position: isMobile ? 'center' : 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo enviar la solicitud',
        showConfirmButton: false,
        timer: 2000,
        toast: !isMobile,
      });
    }
  };

  const handleAccept = async (id: string) => {
    const isMobile = window.innerWidth < 768;
    try {
      await dispatch(
        responseMatch({
          senderId: id,
          receiverId: auth.user!._id,
          response: true,
        }),
      ).unwrap();

      dispatch(getMatches());
      dispatch(getMatchesReq());

      Swal.fire({
        position: isMobile ? 'center' : 'top-end',
        icon: 'success',
        title: `Solicitud aceptada`,
        showConfirmButton: false,
        timer: 2000,
        toast: !isMobile,
      });
    } catch (error) {
      Swal.fire({
        position: isMobile ? 'center' : 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo aceptar la solicitud',
        showConfirmButton: false,
        timer: 2000,
        toast: !isMobile,
      });
    }
  };

  const handleReject = async (id: string) => {
    const isMobile = window.innerWidth < 768;
    try {
      await dispatch(
        responseMatch({
          senderId: id,
          receiverId: auth.user!._id,
          response: false,
        }),
      ).unwrap();

      dispatch(getMatches());
      dispatch(getMatchesReq());

      Swal.fire({
        position: isMobile ? 'center' : 'top-end',
        icon: 'success',
        title: `Solicitud rechazada`,
        showConfirmButton: false,
        timer: 2000,
        toast: !isMobile,
      });
    } catch (error) {
      Swal.fire({
        position: isMobile ? 'center' : 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo rechazar la solicitud',
        showConfirmButton: false,
        timer: 2000,
        toast: !isMobile,
      });
    }
  };

  const getFriendshipStatus = (user: any) => {
    const isFriend = matches.matches?.some((m) => m._id === user._id);
    if (isFriend) return 'FRIENDS';

    const sentByMe = matches.matchesReq?.sentByMe.some(
      (m) => m.receiverId === user._id || m.receiverId?._id == user._id,
    );
    if (sentByMe) return 'SENT_BY_ME';

    const receivedByMe = matches.matchesReq?.receivedByMe.some(
      (m) => m.senderId === user._id || m.senderId?._id === user._id,
    );
    if (receivedByMe) return 'RECEIVED_BY_ME';

    return 'NONE';
  };

  useEffect(() => {
    const queryString = new URLSearchParams(debouncedValues as any).toString();

    setMobilePage(1);
    dispatch(getUsers(queryString));
  }, [debouncedValues, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage]);

  useEffect(() => {
    if (!matches.matches) {
      dispatch(getMatches());
      dispatch(getMatchesReq());
    }
  }, [
    matches.status.matches,
    matches.errors.matches,
    dispatch,
    matches.matches,
    matches.matchesReq,
  ]);
  return (
    <>
      <div className="flex w-full h-full flex-col items-center md:hidden">
        <header className="w-full h-[93px] bg-[#BFD732] rounded-br-[45px] ps-[30px]! flex flex-col items-start justify-center relative">
          <img
            src={doodle}
            alt="Doodle"
            className="absolute w-[135px] right-20 -top-18"
          />
          <img
            src={doodle2}
            alt="Doodle2"
            className="absolute w-[256px] -rotate-20 -right-18 -bottom-23 z-10"
          />
          <h1 className="text-[30px] font-extrabold text-[#444444] h-[32px] mb-[5px]!">
            Usuarios
          </h1>
          <p className="text-[14px] text-[#444444] mb-[35px]!">
            Ver todos los usuarios
          </p>
          <div className="w-[315px] h-[55px] absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 z-20">
            <IoSearchOutline
              size={25}
              color="#444444"
              className="absolute left-[25px] top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              name="search"
              value={values.search}
              onChange={handleChange}
              className="w-full h-full text-[14px] text-[#444444] bg-[#FFFFFF] rounded-[25px] pl-[49px]!"
              placeholder="buscar usuarios"
              minLength={1}
              maxLength={30}
            />
          </div>
        </header>
        <div className="w-[calc(100%-20px)] mx-[10px] mt-[35px]! flex-1 bg-[#FFFFFF] rounded-t-[40px] shadow-[0px_4px_4px_0px_#4444444D] flex flex-col items-center justify-start pb-[92px]!">
          <nav className="w-[calc(100%-40px)] h-[50px] bg-[#F5F6F7] rounded-[40px] mt-[10px]! flex items-center justify-between z-30">
            <span className="text-[15px] font-bold w-[43px] ms-[20px]! text-[#444444]">
              Filtros
            </span>
            <div className="flex">
              <label className="w-[92px] h-[40px] flex">
                <input
                  type="checkbox"
                  name="age"
                  checked={values.age}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <span
                  className="w-[92px]! h-[40px]! rounded-[40px] text-[15px] leading-[40px] text-center font-bold text-[#44444430] border border-[#44444430] me-[10px]! transition-all
                      peer-checked:bg-[#444444] peer-checked:text-[#DADADA] peer-checked:border-[#444444]"
                >
                  Edad
                </span>
              </label>
              <label className="w-[92px] h-[40px] flex">
                <input
                  type="checkbox"
                  name="verify"
                  checked={values.verify}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <span
                  className="w-[92px]! h-[40px]! rounded-[40px] text-[15px] leading-[40px] text-center font-bold text-[#44444430] border border-[#44444430] me-[10px]! transition-all
                      peer-checked:bg-[#444444] peer-checked:text-[#DADADA] peer-checked:border-[#444444]"
                >
                  Estado
                </span>
              </label>
            </div>
          </nav>

          {users &&
            users
              .filter((user) => user._id !== auth.user?._id)
              .map((user, i) => (
                <div
                  key={user._id ?? i}
                  className={`w-[calc(100%-40px)] h-[102px] mt-[10px]! rounded-[20px] relative flex flex-col items-start justify-center p-[15px]! ${
                    user.verify ? 'bg-[#39B54A1A]' : 'bg-[#E615871A]'
                  }`}
                >
                  <div
                    className={`w-[4px] h-[60px] absolute rounded-r-[10px] left-0 top-1/2 -translate-y-1/2 ${
                      user.verify ? 'bg-[#39B54A]' : 'bg-[#E61587]'
                    }`}
                  ></div>

                  <div
                    className={`w-auto h-[20px] absolute rounded-[40px] right-[15px] top-[15px] px-[10px]! flex items-center ${
                      user.verify ? 'bg-[#39B54A33]' : 'bg-[#E6158733]'
                    }`}
                  >
                    <span
                      className={`text-[12px] leading-[100%] ${
                        user.verify ? 'text-[#39B54A]' : 'text-[#E61587]'
                      }`}
                    >
                      {user.verify ? 'Verificado' : 'No verificado'}
                    </span>
                    <div
                      className={`w-[6px] h-[6px] rounded-full ms-[5px]! ${
                        user.verify ? 'bg-[#39B54A]' : 'bg-[#E61587]'
                      }`}
                    ></div>
                  </div>

                  <div className="absolute right-[15px] bottom-[24px] w-[35px] h-[35px] flex items-center justify-center rounded-full">
                    {(() => {
                      const status = getFriendshipStatus(user);
                      if (status === 'FRIENDS')
                        return (
                          <button className="text-gray-500">
                            <TbEditCircle
                              size={32}
                              onClick={() => {
                                dispatch(
                                  getMessages({
                                    senderId: auth.user!._id,
                                    receiverId: user._id,
                                  }),
                                );
                                dispatch(setActiveChat(user));
                              }}
                            />
                          </button>
                        );

                      if (status === 'SENT_BY_ME')
                        return (
                          <button
                            disabled
                            className="text-black-500 opacity-50"
                          >
                            <IoPersonAddSharp size={32} />
                          </button>
                        );

                      if (status === 'RECEIVED_BY_ME')
                        return (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAccept(user._id)}
                              className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
                            >
                              <IoCheckmark size={20} />
                            </button>
                            <button
                              onClick={() => handleReject(user._id)}
                              className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <IoClose size={20} />
                            </button>
                          </div>
                        );
                      if (status === 'NONE')
                        return (
                          <button
                            className="transition-all hover:bg-[#39B54A33] cursor-pointer rounded-full p-1"
                            onClick={() => handleMatch(user._id, user.fullname)}
                          >
                            <IoPersonAddOutline size={32} />
                          </button>
                        );
                    })()}
                  </div>

                  <span className="text-[14px] font-bold text-[#444444]">
                    {user.fullname ? user.fullname : 'N/A'} |
                    {user.date ? ` ${calculateAge(user.date)} años` : ' N/A'}
                  </span>

                  <p className="h-[51px] text-[14px] text-[#444444] leading-[17px]">
                    <span className="font-bold">Email:</span> {user.email}
                    <br />
                    <span className="font-bold">Rol:</span>{' '}
                    {user.role.role.charAt(0).toUpperCase() +
                      user.role.role.slice(1).toLowerCase()}
                    <br />
                    <span className="font-bold">Fecha ingreso:</span>{' '}
                    {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                  </p>
                </div>
              ))}

          <div
            ref={loaderRef}
            className="w-full h-10 flex items-center justify-center mt-4!"
          >
            {mobilePage < (totalPages || 0) ? (
              <span className="text-[12px] text-gray-400 animate-pulse">
                Cargando más usuarios...
              </span>
            ) : (
              <span className="text-[12px] text-gray-300 italic">
                Fin de la lista
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-dvw h-dvh items-center justify-end">
        <div className="w-[calc(100dvw-312px)] h-[calc(100dvh-80px)] bg-[#FFFFFF] me-[40px]! rounded-[35px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] relative z-20">
          <header className="w-full h-[184px] bg-[#F5F6F7] rounded-t-[35px] ps-[65px]! pt-[30px]! relative flex flex-col justify-start">
            <img
              src={doodle}
              alt="Doodle"
              className="absolute w-[194px] right-20 -top-16"
            />

            <h1 className="text-[50px] font-medium text-[#444444] h-[73px]">
              Usuarios
            </h1>
            <p className="text-[20px] text-[#444444]">Ver todos los usuarios</p>
          </header>
          <div className="w-[calc(100%-70px)] h-[calc(100%-177px)] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] absolute left-1/2 bottom-[40px]  -translate-x-1/2 z-20">
            <img
              src={doodle2}
              alt="Doodle2"
              className="absolute w-[368px] -rotate-20 -right-18 -top-45 z-10"
            />
            <div className="flex flex-col h-full justify-start flex-1 overflow-hidden">
              <nav className="pt-[25px]! ps-[20px]! flex justify-start flex-0 ">
                <form className="w-full flex">
                  <div className="w-full max-w-[513px] h-[55px] shadow-[0px_4px_4px_0px_#4444444D] rounded-[40px] text-[14px] text-[#444444] relative">
                    <IoSearchOutline
                      size={25}
                      color="#444444"
                      className="absolute left-[25px] top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    <input
                      type="text"
                      name="search"
                      value={values.search}
                      onChange={handleChange}
                      className="w-full h-full text-[14px] text-[#444444] bg-[#FFFFFF] rounded-[25px] pl-[49px]!"
                      placeholder="buscar usuarios"
                      minLength={1}
                      maxLength={30}
                    />
                  </div>

                  <div className="w-full max-w-[400px] h-[55px] bg-[#FFFFFF] flex items-center justify-center shadow-[0px_4px_4px_0px_#4444444D] rounded-[40px] p-[7px]! ms-[20px]! z-30">
                    <button
                      type="button"
                      onClick={() => setValues(SEARCH_PASS_INITIAL_VALUES)}
                      className="w-[150px] h-[40px] rounded-[40px] border border-[#44444426] text-[#44444480] font-bold cursor-pointer"
                    >
                      Limpiar filtros
                    </button>
                    <label className="cursor-pointer mx-[5px]!">
                      <input
                        type="checkbox"
                        name="age"
                        checked={values.age}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <span
                        className="h-[40px] rounded-[40px] border border-[#44444426] px-[24px]! text-[#44444480] font-bold flex items-center transition-all 
                      peer-checked:bg-[#444444] peer-checked:text-[#DADADA] peer-checked:border-[#444444]"
                      >
                        Edad
                      </span>
                    </label>
                    <label className="cursor-pointer mx-[5px]">
                      <input
                        type="checkbox"
                        name="verify"
                        checked={values.verify}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <span
                        className="h-[40px] rounded-[40px] border border-[#44444426] px-[24px]! text-[#44444480] font-bold flex items-center transition-all 
      peer-checked:bg-[#444444] peer-checked:text-[#DADADA] peer-checked:border-[#444444]"
                      >
                        Estado
                      </span>
                    </label>
                  </div>
                </form>
              </nav>
              <div className="flex flex-col flex-1 min-h-0 mt-[20px]! px-[20px]!">
                <div className="flex flex-col flex-1 shadow-[0px_4px_4px_0px_#00000040] rounded-[20px] overflow-hidden">
                  <div className="bg-[#F5F6F7] h-[40px] grid grid-cols-7 items-center">
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Nombre
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Edad
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Email
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Rol
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Fecha ingreso
                    </div>
                    <div className="text-[14px] text-[#44444480] font-normal text-center">
                      Estado
                    </div>
                    <div> </div>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-[6px] z-40">
                    {users &&
                      users
                        .filter((user) => user._id !== auth.user?._id)
                        .map((user, i) => (
                          <div
                            key={i}
                            className={`min-h-[60px] max-h-[75px] flex-1 grid grid-cols-7 items-center ${
                              user.verify ? 'bg-[#39B54A1A]' : 'bg-[#E615871A]'
                            }`}
                          >
                            <div className="text-[14px] font-normal text-[#444444] text-center relative">
                              <div
                                className={`w-[4px] h-[40px] absolute rounded-r-[10px] left-0 top-1/2 -translate-y-1/2 ${
                                  user.verify ? 'bg-[#39B54A]' : 'bg-[#E61587]'
                                }`}
                              ></div>
                              {user.fullname ? user.fullname : 'N/A'}
                            </div>
                            <div className="text-[14px] font-bold text-[#444444] text-center">
                              {user.date ? calculateAge(user.date) : 'N/A'}
                            </div>
                            <div className="text-[14px] font-bold text-[#444444] text-center">
                              {user.email}
                            </div>
                            <div className="text-[14px] font-bold text-[#444444] text-center">
                              {user.role.role.charAt(0).toUpperCase() +
                                user.role.role.slice(1).toLowerCase()}
                            </div>
                            <div className="text-[14px] font-bold text-[#444444] text-center">
                              {user.createdAt
                                ? formatDate(user.createdAt)
                                : 'N/A'}
                            </div>
                            <div>
                              <div
                                className={`w-[100px] h-[20px] flex items-center justify-center rounded-[40px] px-[7px]! mx-auto! ${
                                  user.verify
                                    ? 'bg-[#39B54A33]'
                                    : 'bg-[#E6158733]'
                                }`}
                              >
                                <span
                                  className={`h-[20x] leading-[20px] text-[12px] ${
                                    user.verify
                                      ? 'text-[#39B54A]'
                                      : 'text-[#E61587]'
                                  }`}
                                >
                                  {user.verify ? 'Verificado' : 'No verificado'}
                                </span>
                                <div
                                  className={`w-[6px] h-[6px] rounded-full ms-[5px]! ${
                                    user.verify
                                      ? 'bg-[#39B54A]'
                                      : 'bg-[#E61587]'
                                  }`}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center">
                              {(() => {
                                const status = getFriendshipStatus(user);
                                if (status === 'FRIENDS')
                                  return (
                                    <button
                                      className="text-black-500 cursor-pointer hover:bg-[#39B54A33] rounded-full"
                                      onClick={() => {
                                        dispatch(
                                          getMessages({
                                            senderId: auth.user!._id,
                                            receiverId: user._id,
                                          }),
                                        );
                                        dispatch(setActiveChat(user));
                                      }}
                                    >
                                      <TbEditCircle size={32} />
                                    </button>
                                  );

                                if (status === 'SENT_BY_ME')
                                  return (
                                    <button
                                      disabled
                                      className="text-black-500 opacity-50"
                                    >
                                      <IoPersonAddSharp size={32} />
                                    </button>
                                  );

                                if (status === 'RECEIVED_BY_ME')
                                  return (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleAccept(user._id)}
                                        className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
                                      >
                                        <IoCheckmark size={20} />
                                      </button>
                                      <button
                                        onClick={() => handleReject(user._id)}
                                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                      >
                                        <IoClose size={20} />
                                      </button>
                                    </div>
                                  );
                                if (status === 'NONE')
                                  return (
                                    <button
                                      className="transition-all text-black-500 hover:bg-[#39B54A33] cursor-pointer rounded-full p-1"
                                      onClick={() =>
                                        handleMatch(user._id, user.fullname)
                                      }
                                    >
                                      <IoPersonAddOutline size={32} />
                                    </button>
                                  );
                              })()}
                            </div>
                          </div>
                        ))}
                  </div>

                  <div className="bg-[#F5F6F7] h-[40px] grid grid-cols-7 items-center">
                    <div className="text-[#44444480] text-[14px] text-center">
                      Página {page} / {totalPages}
                    </div>
                  </div>
                </div>
                <div className="h-[40px]! flex justify-end items-center me-[45px]! mt-[10px]!">
                  {Array.from({ length: totalPages ?? 0 }).map((_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === page;

                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNumber)}
                        className="cursor-pointer hover:scale-125 transition-transform"
                        title={`Ir a la página ${pageNumber}`}
                      >
                        {isActive ? (
                          <FaRegDotCircle key={i} color="#444444" size={16} />
                        ) : (
                          <GoDot key={i} color="#D9D9D9" size={16} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
