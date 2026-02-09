import { use, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { REPORT_INITIAL_VALUES } from '../constants';
import { getMatches } from '../features/match/matchSlice';
import { addReport } from '../features/reports/reportSlice';
import { reportValidation } from '../helpers/validations';
import useForm from '../hooks/useFormHook';

const ReporModal = ({ isOpen, onClose }:{isOpen:boolean; onClose: ()=>void; }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { status, matches } = useAppSelector((state) => state.matches);
  const reports = useAppSelector((state) => state.report);

  const { handleSubmit, values, handleChange, setValues } = useForm(
    REPORT_INITIAL_VALUES,
    addReport,
    reportValidation,
  );

  useEffect(() => {
    if (auth.user) {
      dispatch(getMatches({ id: auth.user._id }));
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (reports.status.report === 'succeeded') {
      setValues(REPORT_INITIAL_VALUES);
      onClose();
    }
  }, [reports.status.report, dispatch, onClose]);

  if (!isOpen) return null;
  return (
    <>
      <div className="flex w-dvw h-dvh flex-col items-center justify-center md:hidden fixed inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 backdrop-blur-sm z-50">
        <div className="bg-[#FFFFFF] w-[calc(100%-20px)] h-[90%] rounded-[40px] shadow-xl overflow-hidden px-[20px]! flex flex-col">
          <div className="w-full h-[55px] border-b border-gray-200 flex justify-between items-center px-[5px]!">
            <h3 className="text-[20px] font-semibold text-[#444444]">
              Enviar reporte nuevo
            </h3>
            <button
              onClick={onClose}
              className="text-[#444444] hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full flex-1 items-center justify-center"
          >
            <label className="text-[15px] text-[#3A3D46] w-[calc(100%-10px)] mb-[10px]!">
              Destinatario: <br />
              {status.matches === 'loading' ? (
                <>
                  <p>Cargando...</p>
                </>
              ) : (
                <select
                  name="receiverId"
                  value={values.receiverId}
                  onChange={handleChange}
                  className="font-bold text-[15px] text-[#444444] bg-[#FFFFFF] border-2 border-[#444444] rounded-[20px] w-full  h-[30px] mt-[5px]! px-[20px]"
                  required
                >
                  <option className="font-bold text-[15px] text-[#444444] w-full my-[5px]!">
                    Selecciona un destinatario
                  </option>
                  {matches?.map((match, i) => (
                    <option
                      key={i}
                      value={match._id}
                      className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                    >
                      {match.fullname}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <label className="text-[15px] text-[#3A3D46] w-[calc(100%-10px)] mb-[10px]!">
              Asunto: <br />
              <input
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                className="w-full h-[30px] bg-[#FFFFFF] border-2 border-[#444444] rounded-[20px] px-[20px]!"
              />
            </label>
            <label className="text-[15px] text-[#3A3D46] w-[calc(100%-10px)] mb-[10px]!">
              Descripción:{' '}
            </label>
            <textarea
              name="content"
              value={values.content}
              onChange={handleChange}
              className="w-[calc(100%-10px)] h-full bg-[#FFFFFF] border-2 border-[#444444] rounded-[20px] mb-[20px]! py-[10px]! px-[20px]!"
            ></textarea>

            <div className="flex w-full justify-center gap-[20px]">
              <button
                type="button"
                onClick={onClose}
                className="border-2 border-[#444444] hover:bg-[#44444470]  rounded-full px-[20px]! h-[55px] text-[#444444] font-bold text-[15px] flex items-center justify-center cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#444444] hover:bg-[#666666] rounded-full px-[20px]! h-[55px] text-white font-bold text-[15px] mb-[10px]! z-10 flex items-center justify-center cursor-pointer"
              >
                Enviar Reporte
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden fixed inset-0 z-50 md:flex w-full items-center justify-center rounded-[40px] backdrop-blur-sm p-[20px]!">
        <div className="bg-[#F5F6F7] w-[calc(100%-70px)] h-full rounded-[40px] shadow-xl overflow-hidden px-[20px]! flex flex-col">
          <div className="w-full h-[55px] border-b border-gray-200 flex justify-between items-center px-[5px]!">
            <h3 className="text-[20px] font-semibold text-[#444444]">
              Enviar reporte nuevo
            </h3>
            <button
              onClick={onClose}
              className="text-[#444444] hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full flex-1 items-center justify-center"
          >
            <label className="text-[15px] text-[#3A3D46] w-[calc(100%-10px)] mb-[10px]!">
              Destinatario: <br />
              {status.matches === 'loading' ? (
                <>
                  <p>Cargando...</p>
                </>
              ) : (
                <select
                  name="receiverId"
                  value={values.receiverId}
                  onChange={handleChange}
                  className="font-bold text-[15px] text-[#444444] bg-[#FFFFFF] border-2 border-[#444444] rounded-[20px] w-full  h-[30px] mt-[5px]! px-[20px]"
                  required
                >
                  <option className="font-bold text-[15px] text-[#444444] w-full my-[5px]!">
                    Seleccione un destinatario
                  </option>
                  {matches?.map((match, i) => (
                    <option
                      key={i}
                      value={match._id}
                      className="font-bold text-[15px] text-[#444444] w-full my-[5px]!"
                    >
                      {match.fullname}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <label className="text-[15px] text-[#3A3D46] w-[calc(100%-10px)] mb-[10px]!">
              Asunto: <br />
              <input
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                className="w-full h-[30px] bg-[#FFFFFF] border-2 border-[#444444] rounded-[20px] px-[20px]!"
              />
            </label>
            <label className="text-[15px] text-[#3A3D46] w-[calc(100%-10px)] mb-[10px]!">
              Descripción:{' '}
            </label>
            <textarea
              name="content"
              value={values.content}
              onChange={handleChange}
              className="w-[calc(100%-10px)] h-full bg-[#FFFFFF] border-2 border-[#444444] rounded-[20px] mb-[20px]! py-[10px]! px-[20px]! required"
            ></textarea>

            <div className="flex w-full justify-center gap-[20px]">
              <button
                type="button"
                onClick={onClose}
                className="border-2 border-[#444444] hover:bg-[#44444470]  rounded-full px-[20px]! h-[55px] text-[#444444] font-bold text-[15px] flex items-center justify-center cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#444444] hover:bg-[#666666] rounded-full px-[20px]! h-[55px] text-white font-bold text-[15px] mb-[10px]! z-10 flex items-center justify-center cursor-pointer"
              >
                Enviar Reporte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReporModal;
