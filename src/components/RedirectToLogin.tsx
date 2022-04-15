import React, { useEffect, useContext } from 'react';

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn }) => {
  useEffect(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);
  return null;
};

export default RedirectToLogin;