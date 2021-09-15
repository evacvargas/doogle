import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const NavWraper = styled.nav`
  background-color: #eaf9e7;
  padding: 25px;
  border-radius: 20px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .navButton {
    background-color: #4ca771;
    padding: 12px;
    color: white;
    border-radius: 20px;
    font-size: 16px;
    border: none;
  }
`;

export default function Nav() {
  return (
    <NavWraper>
      <Link to='/home'> DOOGLE </Link>
      <Link to='/createBreed'>
        <button className='navButton'> Create your dog </button>
      </Link>
    </NavWraper>
  )
};

