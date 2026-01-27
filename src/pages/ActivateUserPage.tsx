import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { activateUser, resetAuthState } from '../features/auth/authSlice';

const ActivateUserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { errors, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (token && status.activation == 'idle') {
      dispatch(activateUser(token));
    }

    if (status.activation == 'succeeded') {
      timer = setTimeout(() => {
        dispatch(resetAuthState());
        navigate('/login');
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [token, errors.activation, status.activation]);

  if (status.activation == 'loading')
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
        <BounceLoader color="#39B54A" />
      </div>
    );

  if (status.activation == 'failed')
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center bg-[#FFFFFF90] z-20">
        <div className="w-[50%] h-auto min-h-[100px] flex items-center justify-center bg-[#444444] p-3! rounded-[40px] text-white">
          <p className="p-3!">{errors.activation}</p>
        </div>
      </div>
    );

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-dvw h-dvh flex items-center justify-center z-20">
      <h1 className="font-extrabold text-[40px] text-[#444444]">
        ¡Tu cuenta ha sido activada!
      </h1>
    </div>
  );
};

export default ActivateUserPage;
