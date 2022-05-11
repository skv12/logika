import React, { useEffect } from 'react';

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setLoginToken: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setLoginToken }) => {
  useEffect(() => {
    setIsLoggedIn(false);
    setLoginToken();
  }, [setIsLoggedIn, setLoginToken]);
  return null;
};

export default RedirectToLogin;