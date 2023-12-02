import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
        <ul className='flex my-auto'>
          <li className='p-2 text-white hover:text-amber-400'><Link to="/">Home</Link></li>
          <li className='p-2 text-white hover:text-amber-400'><Link to="/viewTournament">View Tournaments</Link></li>
          <li className='p-2 text-white hover:text-amber-400'><Link to="/scheduleTournament">Schedule Tournament</Link></li>
        </ul>
        <div className='flex mx-3 my-1'>
          <img src="../../logo.png" alt="" className='drop-shadow' />
          <span className='urdu mx-2 m-auto text-3xl text-white'>کھیل</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
