import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const FirstTimeLogIn = ({ children }) => {
  const Demo = Cookies.get('Demo');

  if (Demo !== 'true') {
    return <Navigate to="/main" />; // Redirect to /main if not a first-time user
  }

  return children; // Render the protected component if Demo is 'true'
};

export default FirstTimeLogIn;
