import { useEffect, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { useAppSelector } from '../app/hooks';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isPersisted, status, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {}, []);

  if (status.persistance == 'loading')
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
        <BounceLoader color="#39B54A" />
      </div>
    );

  if (!isPersisted)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (!user?.isComplete) {
    if (location.pathname === '/user-data') {
      return <>{children}</>;
    }
    return <Navigate to="/user-data" replace />;
  }

  if (user?.isComplete && location.pathname === '/user-data') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
