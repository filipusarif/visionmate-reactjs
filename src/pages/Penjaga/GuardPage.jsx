import React from 'react'
import { UserAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';


const GuardPage = () => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div>GuardPage
      <button onClick={handleLogOut}>
        logOut
      </button>
    </div>
  )
}

export default GuardPage