import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';


type Props = {
  children: React.ReactNode; // Better type for children
};

const Auth = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [token, navigate]); // Include navigate in dependencies

  return <div>{children}</div>;
};

export default Auth;
