import { IconMenu2 } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../../Service/Slices/Auth/AuthSlice';
// import { clearToken } from '../../store/authSlice'; // Adjust the path

type Props = {
  setIsNavBarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const ATMAppHeader = ({ setIsNavBarExpanded }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the token from Redux store
  // const token = useSelector((state: any) => state.auth.token);
  const userName = localStorage.getItem('userName') || 'Guest'; // You can replace this with a Redux state for userName if necessary

  // Logout function to clear token and userName from Redux store and localStorage
  const handleLogout = () => {
    dispatch(clearToken()); // Clear the token from Redux store
    localStorage.removeItem('userName'); // Optionally remove userName if stored in localStorage
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className="flex items-center justify-between h-full px-5 py-5 border-b bg-gray-50">
      <div className="flex items-center gap-3">
        <IconMenu2
          className="font-bold cursor-pointer"
          onClick={() => setIsNavBarExpanded((prevState) => !prevState)}
        />
        <div className="text-2xl font-bold text-primary-main">Logo</div>
      </div>

      {/* Right Side: Display user's name and logout button */}
      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold text-gray-700">
          Welcome, {userName}!
        </div>
        <button
          onClick={handleLogout}
          className="font-semibold text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ATMAppHeader;
