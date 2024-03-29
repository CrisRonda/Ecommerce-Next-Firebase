import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import SessionReducer from './reducer';
import SessionContext from './context';
import { sessionTypes } from '../types';
import useSignIn from '#hooks/useSignin';
import { getLocalStorage, setLocalStorage } from '#src/utils/localstorage';

const SessionState = ({ children }) => {
  const initialState = getLocalStorage('session', { user: {}, session: {} });

  const [state, dispatch] = useReducer(SessionReducer, initialState);
  const { withEmail, signOut: _signOut, withFacebook, withGoogle } = useSignIn();
  const { replace } = useRouter();

  const signIn = async (type, email, password) => {
    let data = {};
    try {
      if (type === 'google') {
        const { error, user, session } = await withGoogle();
        data = { error, user, session };
      }
      if (type === 'facebook') {
        const { error, user, session } = await withFacebook();
        data = { error, user, session };
      }
      if (type === 'email') {
        const { error, user, session } = await withEmail(email, password);
        data = { error, user, session };
      }
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.user) {
        const payload = {
          user: data.user,
          session: data.session,
        };
        dispatch({
          type: sessionTypes.LOGIN,
          payload,
        });
        setLocalStorage('session', payload);
        replace('/');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };
  const signOut = async () => {
    dispatch({
      type: sessionTypes.LOGOUT,
    });
    await _signOut();
  };

  return (
    <SessionContext.Provider
      value={{
        state,
        signIn,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
SessionState.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SessionState;
