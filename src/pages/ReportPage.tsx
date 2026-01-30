import maskGroup from '@assets/Mask group.svg';
import doodle from '@assets/doodle-4 1.svg';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addReport,
  addReportMessage,
  answerReport,
  getReport,
} from '../features/reports/reportSlice';
import useForm from '../hooks/useFormHook';
import { REPORT_MESSAGE_INITIAL_VALUES } from '../constants';
import { reportMessageValidation } from '../helpers/validations';

const ReportPage = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const { report } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();

  const handleAddReportMessage = (values: { content: string }) => {
    if (id && user) {
      return addReportMessage({
        authorId: user._id,
        reportId: id,
        content: values.content,
      });
    }
  };

  const { values, handleSubmit, handleChange, setValues } = useForm(
    REPORT_MESSAGE_INITIAL_VALUES,
    handleAddReportMessage,
    reportMessageValidation,
  );

  const isInitialLoad = useRef(true);
  const isInitialMobLoad = useRef(true);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const chatContainerMobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValues(REPORT_MESSAGE_INITIAL_VALUES);
  }, [report?.messages]);

  useEffect(() => {
    const scrollContainer = chatContainerMobRef.current;
    if (scrollContainer && report) {
      if (report?.messages.length > 0) {
        if (isInitialMobLoad.current) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'auto',
          });
          isInitialMobLoad.current = false;
        } else {
          scrollContainer?.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    }

    return () => {
      isInitialMobLoad.current = true;
    };
  }, [report?.messages]);

  useEffect(() => {
    const scrollContainer = chatContainerRef.current;
    if (scrollContainer && report) {
      if (report?.messages.length > 0) {
        if (isInitialLoad.current) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'auto',
          });
          isInitialLoad.current = false;
        } else {
          scrollContainer?.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    }

    return () => {
      isInitialLoad.current = true;
    };
  }, [report?.messages]);

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
                {report.subject}
              </h1>
              <p className="text-[14px] text-[#444444] z-20">
                {report.senderId.fullname}
              </p>
            </header>
            <div
              ref={chatContainerMobRef}
              className="w-[calc(100%-20px)] mx-[10px] mt-[35px]! pt-[20px]! flex-1 bg-[#FFFFFF] rounded-t-[40px] shadow-[0px_4px_4px_0px_#4444444D] flex flex-col justify-start gap-[5px] px-[20px]! pb-[92px]!"
            >
              {report.messages?.map((message: any, i: number) => {
                const isMe = message.authorId === user?._id;

                const messageDate = new Date(message.createdAt);
                const timeString = messageDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                const previousMessage = report.messages[i - 1];
                const previousDate = previousMessage
                  ? new Date(previousMessage.createdAt)
                  : null;
                const previousTimeSTring = previousDate
                  ? previousDate.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : null;

                const showTime = timeString !== previousTimeSTring;

                return (
                  <div
                    key={i}
                    className={`flex flex-col mb-1 ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    {showTime && (
                      <span className="w-full text-center text-[10px] text-gray-400 my-2 uppercase font-semibold tracking-wider">
                        {timeString}
                      </span>
                    )}

                    <div
                      className={`
          relative max-w-[80%] px-4 py-2 rounded-xl shadow-sm
          ${
            isMe
              ? 'bg-[#EBF7ED] text-[#444444] rounded-tr-none p-[4px]!'
              : 'bg-[#F5F6F7] text-[#444444] rounded-tl-none p-[4px]!'
          }
        `}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              })}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col mt-[20px]!"
              >
                <textarea
                  className="h-auto bg-[#F5F6F7] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] mb-[20px]! p-[30px]!"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#444444] hover:bg-[#666666] rounded-full px-[20px]! h-[40px] text-white font-bold text-[15px] mb-[10px]! z-10 cursor-pointer self-end"
                >
                  Enviar
                </button>
              </form>

              <Toggle reportStatus={report.status} reportId={report._id} />
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
                  {report.subject}
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

                  <div
                    ref={chatContainerRef}
                    className="flex-1 min-h-0 flex flex-col justify-start gap-[6px] text-[#444444] p-[30px]! z-30 overflow-y-auto"
                  >
                    {report.messages?.map((message: any, i: number) => {
                      const isMe = message.authorId === user?._id;

                      const messageDate = new Date(message.createdAt);
                      const timeString = messageDate.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      });

                      const previousMessage = report.messages[i - 1];
                      const previousDate = previousMessage
                        ? new Date(previousMessage.createdAt)
                        : null;
                      const previousTimeSTring = previousDate
                        ? previousDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : null;

                      const showTime = timeString !== previousTimeSTring;

                      return (
                        <div
                          key={i}
                          className={`flex flex-col mb-1 ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          {showTime && (
                            <span className="w-full text-center text-[10px] text-gray-400 my-2 uppercase font-semibold tracking-wider">
                              {timeString}
                            </span>
                          )}

                          <div
                            className={`
          relative max-w-[80%] px-4 py-2 rounded-xl shadow-sm
          ${
            isMe
              ? 'bg-[#EBF7ED] text-[#444444] rounded-tr-none p-[4px]!'
              : 'bg-[#F5F6F7] text-[#444444] rounded-tl-none p-[4px]!'
          }
        `}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col mt-[20px]!"
                  >
                    <textarea
                      className="h-auto bg-[#F5F6F7] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] mx-[30px]! mb-[20px]! p-[30px]!"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-[#444444] hover:bg-[#666666] rounded-full px-[20px]! me-[30px]! h-[40px] text-white font-bold text-[15px] mb-[10px]! z-10 cursor-pointer self-end"
                    >
                      Enviar
                    </button>
                  </form>

                  <Toggle reportStatus={report.status} reportId={report._id} />
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
  reportStatus,
  reportId,
}: {
  reportStatus: boolean;
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
    <label className="w-full flex items-center cursor-pointer justify-end gap-3 mb-[20px]! md:pe-[30px]!">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={reportStatus}
          name="answered"
          disabled={status.report === 'loading'}
          onChange={handleChange}
        />
        <div
          className={`block w-12 h-7 rounded-full transition-colors ${reportStatus ? 'bg-[#39B54A1A]' : 'bg-[#E615871A]'}`}
        ></div>

        <div
          className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${reportStatus ? 'translate-x-5' : 'translate-x-0'}`}
        ></div>
      </div>
      <span className="ml-3 text-gray-700 font-medium w-[106px]">
        {reportStatus ? 'Respondido' : 'No respondido'}
      </span>
    </label>
  );
};
