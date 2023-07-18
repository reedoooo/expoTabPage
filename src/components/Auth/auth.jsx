import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth/authContext';

function Auth({ children, capability }) {
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;
  const canDo = capability ? authContext.can(capability) : true;

  // Only render children if conditions are met
  return isLoggedIn && canDo ? children : null;
}

export default Auth;
