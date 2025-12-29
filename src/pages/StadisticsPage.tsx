import saly24 from "@assets/Saly-24.svg";
import saly30 from "@assets/Saly-30.svg";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const StadisticsPage = () => {
  const chartRefMobile = useRef<HTMLCanvasElement>(null);
  const chartRefDesktop = useRef<HTMLCanvasElement>(null);
  const chartInstanceRefMobile = useRef<Chart | null>(null);
  const chartInstanceRefDesktop = useRef<Chart | null>(null);

  useEffect(() => {
    // Gráfico para mobile
    if (chartRefMobile.current) {
      if (chartInstanceRefMobile.current) {
        chartInstanceRefMobile.current.destroy();
      }
      const ctx = chartRefMobile.current.getContext("2d");
      if (!ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "#BFD732");
      gradient.addColorStop(1, "#39B54A");

      chartInstanceRefMobile.current = new Chart(chartRefMobile.current, {
        type: "bar",
        data: {
          labels: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ],
          datasets: [
            {
              label: "Registros",
              data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
              backgroundColor: gradient,
              borderWidth: 0,
              maxBarThickness: 30,
              borderRadius: {
                topLeft: 5,
                topRight: 5,
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#444444",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#4444444D",
              },
            },
            x: {
              ticks: {
                color: "#444444",
                maxRotation: 90,
                minRotation: 90,
                font: {
                  size: 11,
                },
              },
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    // Gráfico para desktop
    if (chartRefDesktop.current) {
      if (chartInstanceRefDesktop.current) {
        chartInstanceRefDesktop.current.destroy();
      }
      const ctx = chartRefDesktop.current.getContext("2d");
      if (!ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "#BFD732");
      gradient.addColorStop(1, "#39B54A");

      chartInstanceRefDesktop.current = new Chart(chartRefDesktop.current, {
        type: "bar",
        data: {
          labels: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ],
          datasets: [
            {
              label: "Registros",
              data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
              backgroundColor: gradient,
              borderWidth: 0,
              maxBarThickness: 30,
              borderRadius: {
                topLeft: 5,
                topRight: 5,
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#444444",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#4444444D",
              },
            },
            x: {
              ticks: {
                color: "#444444",
                maxRotation: 90,
                minRotation: 90,
                font: {
                  size: 11,
                },
              },
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRefMobile.current) {
        chartInstanceRefMobile.current.destroy();
      }
      if (chartInstanceRefDesktop.current) {
        chartInstanceRefDesktop.current.destroy();
      }
    };
  }, []);
  return (
    <>
      <div className="flex w-full h-full flex-col items-center md:hidden">
        <header className="w-full h-[185px] bg-[#BFD732] rounded-br-[45px] ps-[30px]! flex flex-col items-start justify-start relative">
          <img
            src={saly24}
            alt="HandPhone"
            className="absolute w-[225px] bottom-0 right-[10px]"
          />
          <img
            src={saly30}
            alt="HandPhone"
            className="absolute w-[138px] top-[53px] -left-[32px]"
          />
          <h1 className="text-[30px] font-extrabold text-[#444444] h-[32px] mb-[5px]!">
            Estadísticas
          </h1>
          <p className="text-[14px] text-[#444444] mb-[35px]! w-[145px]">
            Consulta toda la actividad de tu página
          </p>
        </header>

        <div className="w-[calc(100%-20px)] mx-[10px] mt-[20px]! pt-[20px]! bg-[#FFFFFF] rounded-t-[40px] flex flex-1 items-center justify-center shadow-[0px_4px_4px_0px_#4444444D]">
          <div className="w-auto h-full flex flex-col gap-[11px]">
            <div className="flex gap-[11px]">
              <div className="w-[152px] h-[141px] bg-[#F5F6F7] rounded-[20px] flex justify-center items-center">
                <div>
                  <h2 className="text-[15px] text-[#444444] font-black">
                    TOTAL USUARIOS
                  </h2>
                  <div className="border-b border-dashed w-full border-[#444444]"></div>
                  <div className="w-full text-[14px] text-[#444444] flex justify-between">
                    <span className="font-bold text-[14px] text-[#444444]">
                      Mentees:
                    </span>{" "}
                    750 <br />
                  </div>
                  <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                  <div className="w-full text-[14px] text-[#444444] flex justify-between">
                    <span className="font-bold text-[14px] text-[#444444]">
                      Mentores:
                    </span>{" "}
                    250
                    <br />
                  </div>
                  <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                  <div className="w-full text-[14px] text-[#444444] flex justify-between">
                    <span className="font-bold text-[14px] text-[#444444]">
                      Total:
                    </span>{" "}
                    1000
                  </div>
                </div>
              </div>
              <div className="w-[152px] h-[141px] bg-[#F5F6F7] rounded-[20px] flex justify-center items-center">
                <div>
                  <h2 className="text-[15px] text-[#444444] font-black">
                    NUEVOS USUARIOS
                  </h2>
                  <div className="border-b border-dashed w-full border-[#444444]"></div>
                  <div className="w-full text-[14px] text-[#444444] flex justify-between">
                    <span className="font-bold text-[14px] text-[#444444]">
                      Mentees:
                    </span>{" "}
                    7 <br />
                  </div>
                  <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                  <div className="w-full text-[14px] text-[#444444] flex justify-between">
                    <span className="font-bold text-[14px] text-[#444444]">
                      Mentores:
                    </span>{" "}
                    10
                    <br />
                  </div>
                  <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                  <div className="w-full text-[14px] text-[#444444] flex justify-between">
                    <span className="font-bold text-[14px] text-[#444444]">
                      Total:
                    </span>{" "}
                    17
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[315px] min-h-0 flex-1 bg-[#F5F6F7] rounded-[20px] flex justify-center items-start px-[15px]! pt-[15px]!">
              <div className="w-full h-full flex flex-col pb-[107px]!">
                <h2 className="text-[15px] text-[#444444] font-black">
                  REGISTROS POR MES
                </h2>
                <div className="border-b border-dashed w-full border-[#444444] mt-[5px]! mb-[8px]!"></div>
                <div className="flex-1 min-h-0 w-full">
                  <canvas ref={chartRefMobile}></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-dvw h-dvh items-center justify-end">
        <div className="w-[calc(100dvw-312px)] h-[calc(100dvh-80px)] bg-[#FFFFFF] me-[40px]! rounded-[35px] shadow-[0px_0px_0px_0px_#0013331A,0px_2px_5px_0px_#0013331A,0px_9px_9px_0px_#00133317,0px_21px_13px_0px_#0013330D,0px_38px_15px_0px_#00133303,0px_59px_17px_0px_#00133300] relative">
          <img
            src={saly24}
            alt="Saly24"
            className="w-[309px] absolute -top-[62px] right-0 z-30"
          />
          <img
            src={saly30}
            alt="Saly30"
            className="w-[198px] absolute top-[28px] right-[266px] z-30"
          />
          <header className="w-full h-[184px] bg-[#F5F6F7] rounded-t-[35px] ps-[65px]! pb-[55px]! relative z-10 flex flex-col justify-end">
            <h1 className="text-[50px] font-medium text-[#444444] h-[73px]">
              Estadísticas
            </h1>
            <p className="text-[20px] text-[#444444]">
              Consulta toda la actividad de tu página
            </p>
          </header>
          <div className="w-[calc(100%-70px)] h-[calc(100%-177px)] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#44444440] rounded-[40px] absolute left-1/2 bottom-[40px]  -translate-x-1/2 z-20 pt-[109px]! pb-[20px]!">
            <div className="flex h-full justify-center items-center flex-1 overflow-hidden">
              <div className="w-full h-full flex flex-col items-center gap-[18px]">
                <div className="w-full flex justify-center gap-[11px]">
                  <div className="w-[calc(50%-29px)] h-[141px] bg-[#F5F6F7] rounded-[20px] flex justify-center items-center">
                    <div className="w-full px-[15px]!">
                      <h2 className="text-[15px] text-[#444444] font-black">
                        TOTAL USUARIOS
                      </h2>
                      <div className="border-b border-dashed w-full border-[#444444]"></div>
                      <div className="w-full text-[14px] text-[#444444] flex justify-between">
                        <span className="font-bold text-[14px] text-[#444444]">
                          Mentees:
                        </span>{" "}
                        750 <br />
                      </div>
                      <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                      <div className="w-full text-[14px] text-[#444444] flex justify-between">
                        <span className="font-bold text-[14px] text-[#444444]">
                          Mentores:
                        </span>{" "}
                        250
                        <br />
                      </div>
                      <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                      <div className="w-full text-[14px] text-[#444444] flex justify-between">
                        <span className="font-bold text-[14px] text-[#444444]">
                          Total:
                        </span>{" "}
                        1000
                      </div>
                    </div>
                  </div>
                  <div className="w-[calc(50%-29px)] h-[141px] bg-[#F5F6F7] rounded-[20px] flex justify-center items-center">
                    <div className="w-full px-[15px]!">
                      <h2 className="text-[15px] text-[#444444] font-black">
                        NUEVOS USUARIOS
                      </h2>
                      <div className="border-b border-dashed w-full border-[#444444]"></div>
                      <div className="w-full text-[14px] text-[#444444] flex justify-between">
                        <span className="font-bold text-[14px] text-[#444444]">
                          Mentees:
                        </span>{" "}
                        7 <br />
                      </div>
                      <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                      <div className="w-full text-[14px] text-[#444444] flex justify-between">
                        <span className="font-bold text-[14px] text-[#444444]">
                          Mentores:
                        </span>{" "}
                        10
                        <br />
                      </div>
                      <div className="border-b border-dashed w-full border-[#4444444D]"></div>
                      <div className="w-full text-[14px] text-[#444444] flex justify-between">
                        <span className="font-bold text-[14px] text-[#444444]">
                          Total:
                        </span>{" "}
                        17
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[calc(100%-40px)] min-h-0 flex-1 bg-[#F5F6F7] rounded-[20px] flex justify-center items-start px-[15px]! pt-[15px]!">
                  <div className="w-full h-full flex flex-col pb-[18px]!">
                    <h2 className="text-[15px] text-[#444444] font-black">
                      REGISTROS POR MES
                    </h2>
                    <div className="border-b border-dashed w-full border-[#444444] mt-[5px]! mb-[8px]!"></div>
                    <div className="flex-1 min-h-0 w-full">
                      <canvas ref={chartRefDesktop}></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StadisticsPage;
