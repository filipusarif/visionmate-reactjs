import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../components/context/AuthContext';

const GuardPage = () => {

  const {session, logOut} = UserAuth();
  const navigate = useNavigate();

  console.log(session);

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
    <>
    <div>GuardPage</div>
    <Link to="/guard/scan">scan</Link>
    <Link to="/guard/monitoring">Monitoring</Link>
    <button onClick={handleLogOut}>
      LOGOUT
    </button>
    </>
  )
}

export default GuardPage