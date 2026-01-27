import maskGroup from '@assets/Mask group.svg';
import doodle from '@assets/doodle-4 1.svg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { answerReport, getReport } from '../features/reports/reportSlice';

const ReportPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { report } = useAppSelector((state) => state.report);
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
    if (user && id) dispatch(getReport({ id }));
  }, [dispatch, user, id]);
  return (
    <>
      <div className="flex w-full h-full flex-col items-center md:hidden">
        {report ? (
          <>
            <header className="w-full h-[93px] bg-[#BFD732] rounded-br-[45px] ps-[30px]! flex flex-col items-start justify-center relative">
              <img
                src={maskGroup}
                alt="Mask group"
                className="w-[119px] absolute right-9"
              />
              <h1 className="text-[30px] font-extrabold text-[#444444] h-[32px] mb-[5px]! z-20">
                {report.issue}
              </h1>
              <p className="text-[14px] text-[#444444] z-20">
                {report.senderId.fullname}
              </p>
            </header>
            <div className="w-[calc(100%-20px)] mx-[10px] mt-[35px]! pt-[20px]! flex-1 bg-[#FFFFFF] rounded-t-[40px] shadow-[0px_4px_4px_0px_#4444444D] flex flex-col items-start justify-between gap-[5px] px-[20px]! pb-[92px]!">
              <p>{report.content}</p>

              <Toggle answered={report.answered} reportId={report._id} />
            </div>
          </>
        ) : null}
      </div>

      <div className="hidden md:flex w-dvw h-dvh items-center justify-end">
        <div className="w-[calc(100dvw-312px)] h-[calc(100dvh-80px)] bg-[#FFFFFF] me-[40px]! rounded-[35px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] relative">
          {report ? (
            <>
              <header className="w-full h-[184px] bg-[#F5F6F7] rounded-t-[35px] ps-[65px]! pt-[30px]! relative flex flex-col justify-start">
                <img
                  src={doodle}
                  alt="Doodle"
                  className="absolute w-[180px] right-[109px] -top-[34px] -rotate-10 "
                />
                <h1 className="text-[50px] font-medium text-[#444444] h-[73px]">
                  {report.issue}
                </h1>
                <p className="text-[20px] text-[#444444] mb-[8px]!">
                  {report.senderId.fullname}
                </p>
              </header>
              <div className="w-[calc(100%-70px)] h-[calc(100%-177px)] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] absolute left-1/2 bottom-[40px] -translate-x-1/2 z-40">
                <div className="flex flex-col h-full justify-start flex-1 overflow-hidden relative">
                  <img
                    src={maskGroup}
                    alt="MaskGroup"
                    className="fixed w-[314px] right-[35px] top-[-100px] z-20"
                  />

                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-between gap-[6px] text-[#444444] p-[30px]! z-30">
                    <p>{report.content}</p>
                    <Toggle answered={report.answered} reportId={report._id} />
                  </div>
                </div>
              </div>{' '}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ReportPage;

const Toggle = ({
  answered,
  reportId,
}: {
  answered: boolean;
  reportId: string;
}) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.report);

  useEffect(() => {
    dispatch(getReport({ id: reportId }));
  }, [dispatch]);

  const handleChange = async () => {
    if (status.report === 'loading') return;

    try {
      await dispatch(answerReport({ reportId })).unwrap();

      await dispatch(getReport({ id: reportId })).unwrap();
    } catch (error) {
      console.error('Error al actualizar el reporte:', error);
    }
  };

  return (
    <label className="w-full flex items-center cursor-pointer justify-end gap-3">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={answered}
          name="answered"
          disabled={status.report === 'loading'}
          onChange={handleChange}
        />
        <div
          className={`block w-12 h-7 rounded-full transition-colors ${answered ? 'bg-[#39B54A1A]' : 'bg-[#E615871A]'}`}
        ></div>

        <div
          className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${answered ? 'translate-x-5' : 'translate-x-0'}`}
        ></div>
      </div>
      <span className="ml-3 text-gray-700 font-medium w-[106px]">
        {answered ? 'Respondido' : 'No respondido'}
      </span>
    </label>
  );
};
