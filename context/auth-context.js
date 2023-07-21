import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_9g6Z4Hijn',
  ClientId: 'r5bbahnt3ftl9sf85b27osptp',
  AutoConfirmUser: true,
  AutoVerifyEmail: true,
};

const userPool = new CognitoUserPool(poolData);

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isAuthenticated: false,
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => { },
});

export const AuthProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const timeoutIdRef = useRef(null);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // let isAuthenticated = false;
    setAuthenticated(false);

    const currentUser = userPool.getCurrentUser();
    // console.log(currentUser);
    if (currentUser) {
      currentUser.getSession(async (err, session) => {
        if (err || !session.isValid()) {
          console.log('session invalid');
          await signOut();
          window.location.reload();
        }
        // console.log(session.accessToken.getExpiration());
        // get expiration time from token and set callback to expire session and sign out
        const expirationTime = session.accessToken.getExpiration() * 1000;
        const sessionTime = expirationTime - Date.now();
        timeoutIdRef.current = setTimeout(async () => {
          await signOut();
          // refresh page to redirect to sign in page
          window.location.reload();
        }, sessionTime);
      });
      setAuthenticated(true);

      // get current user sub, username, email from user attributes
      const user = await new Promise((resolve, reject) => {
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            resolve(attributes);
          }
        });
      });

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // const skip = () => {
  //   try {
  //     window.sessionStorage.setItem('authenticated', 'true');
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const user = {
  //     id: '5e86809283e28b96d2d38537',
  //     avatar: '/assets/avatars/avatar-anika-visser.png',
  //     name: 'Anika Visser',
  //     email: 'anika.visser@devias.io'
  //   };

  //   dispatch({
  //     type: HANDLERS.SIGN_IN,
  //     payload: user
  //   });
  // };

  // const signIn = async (email, password) => {
  //   if (email !== 'demo@devias.io' || password !== 'Password123!') {
  //     throw new Error('Please check your email and password');
  //   }

  //   try {
  //     window.sessionStorage.setItem('authenticated', 'true');
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const user = {
  //     id: '5e86809283e28b96d2d38537',
  //     avatar: '/assets/avatars/avatar-anika-visser.png',
  //     name: 'Anika Visser',
  //     email: 'anika.visser@devias.io'
  //   };

  //   dispatch({
  //     type: HANDLERS.SIGN_IN,
  //     payload: user
  //   });
  // };

  const signIn = async (email, password) => {
    const authenticationData = {
      Username: email,
      Password: password
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          const payload = accessToken.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));

          // Get the user attributes
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err);
            } else {
              const user = {
                id: attributes.find(attr => attr.getName() === 'sub').getValue(),
                name: attributes.find(attr => attr.getName() === 'name').getValue(),
                email: attributes.find(attr => attr.getName() === 'email').getValue()
              };
              setAuthenticated(true);

              dispatch({
                type: HANDLERS.SIGN_IN,
                payload: {
                  user
                }
              });

              resolve(user);
            }
          });
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  };

  const signUp = async (email, name, password) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      new CognitoUserAttribute({
        Name: 'name',
        Value: name
      })
    ];

    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const cognitoUser = result.user;

          dispatch({
            type: HANDLERS.SIGN_UP,
            payload: {
              cognitoUser
            }
          });

          resolve(cognitoUser);
        }
      });
    });
  };


  const signOut = async () => {
    const cognitoUser = userPool.getCurrentUser();
    console.log('signing out');
    if (cognitoUser) {
      cognitoUser.signOut();
      setAuthenticated(false);
    }
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
