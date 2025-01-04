import React from 'react'
import { UserAuth } from '../components/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
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
    <div>
      <h1 className='text-center'>Home Page</h1>
      <p onClick={handleLogOut} className='' >Logout</p>
    </div>
  )
}

export default Homepage