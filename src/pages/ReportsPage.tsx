import maskGroup from '@assets/Mask group.svg';
import doodle from '@assets/doodle-4 1.svg';
import { useEffect, useState } from 'react';
import { FaRegDotCircle } from 'react-icons/fa';
import { GoDot } from 'react-icons/go';
import { GrView } from 'react-icons/gr';
import { IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ReporModal from '../components/ReportModal';
import { getReports } from '../features/reports/reportSlice';

const ReportsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { reports } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (user) dispatch(getReports());
  }, [dispatch, user]);
  console.log(reports);
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
        <ReporModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <div className="w-[calc(100%-20px)] mx-[10px] mt-[35px]! pt-[20px]! flex-1 bg-[#FFFFFF] rounded-t-[40px] shadow-[0px_4px_4px_0px_#4444444D] flex flex-col items-center justify-start gap-[5px]">
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-[55px]! rounded-[40px] text-[15px] leading-[55px] text-center font-bold border border-[#44444426] text-[#44444480] px-[10px]! mb-[15px]!"
          >
            Nuevo Reporte
          </button>

          {reports?.map(
            (report, i) =>
              report.receiverId._id === user?._id && (
                <div
                  key={i}
                  className={`w-[calc(100%-40px)] h-[119px] ${report.status ? 'bg-[#39B54A1A]' : 'bg-[#E615871A]'} rounded-[20px] relative flex flex-col items-start justify-center p-[15px]!`}
                >
                  <div
                    className={`w-[4px] h-[77px] absolute ${report.status ? 'bg-[#39B54A]' : 'bg-[#E61587]'} rounded-r-[10px] left-0 top-1/2 -translate-y-1/2`}
                  ></div>
                  <div
                    className={`w-auto h-[30px] absolute rounded-[40px] ${report.status ? 'bg-[#39B54A33]' : 'bg-[#E6158733]'} right-[15px] top-[15px] px-[10px]! flex items-center`}
                  >
                    <span
                      className={`text-[12px] leading-[100%] ${report.status ? 'text-[#39B54A]' : 'text-[#E61587]'}`}
                    >
                      {report.status ? 'Respondido' : 'No respondido'}
                    </span>{' '}
                    <div
                      className={`w-[6px] h-[6px] rounded-full ms-[5px]! ${report.status ? 'bg-[#39B54A]' : 'bg-[#E61587]'}`}
                    ></div>
                  </div>
                  <Link
                    to={`/reports/${report._id}`}
                    className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer hover:bg-white hover:opacity-50 hover:rounded-full"
                  >
                    <GrView size={32} />
                  </Link>

                  <span className="text-[14px] font-bold text-[#444444]">
                    {report.receiverId.fullname}
                  </span>
                  <p className=" h-[68px] text-[14px] text-[#444444] leading-[17px]">
                    <span className="font-bold">Rol:</span>{' '}
                    {report.receiverId.role.role.charAt().toUpperCase() +
                      report.receiverId.role.role.slice(1).toLowerCase()}{' '}
                    <br />
                    <span className="font-bold">Motivo:</span> {report.subject}{' '}
                    <br />
                    <span className="font-bold">Email:</span>{' '}
                    {report.receiverId.email}
                    <br />
                    <span className="font-bold">Fecha ingreso:</span>{' '}
                    {formatDate(report.createdAt)}
                  </p>
                </div>
              ),
          )}
        </div>
      </div>

      <div className="hidden md:flex w-dvw h-dvh items-center justify-end">
        <div className="w-[calc(100dvw-312px)] h-[calc(100dvh-80px)] bg-[#FFFFFF] me-[40px]! rounded-[35px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] relative">
          <header className="w-full h-[184px] bg-[#F5F6F7] rounded-t-[35px] ps-[65px]! pt-[30px]! relative flex flex-col justify-start">
            <img
              src={doodle}
              alt="Doodle"
              className="absolute w-[180px] right-[109px] -top-[34px] -rotate-10"
            />
            <h1 className="text-[50px] font-medium text-[#444444] h-[73px]">
              Reportes
            </h1>
            <p className="text-[20px] text-[#444444] mb-[8px]!">
              Chequea los reportes de los usuarios
            </p>
          </header>
          <div className="w-[calc(100%-70px)] h-[calc(100%-177px)] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] absolute left-1/2 bottom-[40px] -translate-x-1/2 z-40">
            <div className="flex flex-col h-full justify-start flex-1 overflow-hidden relative">
              <img
                src={maskGroup}
                alt="MaskGroup"
                className="fixed w-[314px] right-[35px] top-[-100px] z-20"
              />
              <nav className="pt-[25px]! ps-[20px]! flex justify-start flex-0 z-40">
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
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-[150px] h-[55px] bg-[#FFFFFF] rounded-[40px] ms-[5px]! border border-[#44444426] text-[#44444480] font-bold cursor-pointer"
                >
                  Nuevo reporte
                </button>

                <ReporModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
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
                    {reports?.map(
                      (report, i) =>
                        report.receiverId._id === user?._id && (
                          <div
                            key={i}
                            className={`h-[60px] ${report.status ? 'bg-[#39B54A1A]' : 'bg-[#E615871A]'} grid grid-cols-6 items-center relative`}
                          >
                            <div className="text-[14px] font-normal text-[#444444] text-center relative">
                              <div
                                className={`w-[4px] h-[40px] font-bold absolute ${report.status ? 'bg-[#39B54A]' : 'bg-[#E61587]'}  rounded-r-[10px] left-0 top-1/2 -translate-y-1/2`}
                              ></div>
                              {report.receiverId.fullname}
                            </div>
                            <div className="text-[14px] text-[#444444] text-center">
                              {report.subject}
                            </div>
                            <div className="text-[14px] text-[#444444] text-center">
                              {report.receiverId.role.role
                                .charAt(0)
                                .toUpperCase() +
                                report.receiverId.role.role
                                  .slice(1)
                                  .toLowerCase()}
                            </div>
                            <div className="text-[14px] text-[#444444] text-center">
                              {formatDate(report.createdAt)}
                            </div>
                            <div className="text-[14px] text-[#444444] text-center">
                              {report.receiverId.email}
                            </div>
                            <div>
                              <div
                                className={`w-[100px] h-[20px] flex items-center justify-center ${report.status ? 'bg-[#39B54A33]' : 'bg-[#E6158733]'} rounded-[40px] px-[7px]! mx-auto!`}
                              >
                                <span
                                  className={`h-[20x] leading-[20px] text-[12px] ${report.status ? 'text-[#39B54A]' : 'text-[#E61587]'}`}
                                >
                                  {report.status
                                    ? 'Verificado'
                                    : 'No verificado'}
                                </span>
                                <div
                                  className={`w-[6px] h-[6px] ${report.status ? 'bg-[#39B54A]' : 'bg-[#E61587]'} rounded-full ms-[5px]!`}
                                ></div>
                              </div>
                            </div>
                            <Link
                              to={`/reports/${report._id}`}
                              className="absolute right-3 cursor-pointer hover:bg-white hover:opacity-50 hover:rounded-full"
                            >
                              <GrView size={32} />
                            </Link>
                          </div>
                        ),
                    )}
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
