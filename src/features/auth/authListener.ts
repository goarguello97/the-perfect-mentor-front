import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { resetAuthState, validationUser } from './authSlice';

export const startAuthListener = (dispatch: any) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();

      dispatch(validationUser(token));
    } else {
      dispatch(resetAuthState());
    }
  });
};
