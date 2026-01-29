import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { resetAuthState, validationUser } from './authSlice';

export const startAuthListener = (dispatch: any) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const token = await user.getIdToken();
        dispatch(validationUser(token));
      } catch (error) {
        console.error('Error al validar token en el listener', error);
      }
    } else {
      dispatch(resetAuthState());
    }
  });
};
