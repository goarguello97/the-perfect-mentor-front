import { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isPersisted, status } = useAppSelector((state) => state.auth);

  useEffect(() => {}, []);

  if (status.persistance == "loading")
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
        <BounceLoader color="#39B54A" />
      </div>
    );

  return isPersisted ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
