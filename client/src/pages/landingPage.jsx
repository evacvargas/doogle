import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    background-image: url('https://images.unsplash.com/photo-1543702303-71766260f6d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-decoration: none;
`;

const Button = styled.div`
    background-color: #4ca771;
    padding: 24px 36px;
    color: white;
    border-radius: 10px;
    font-size: 50px;
    margin: 50px;
`;

const Title = styled.h1`
    color: white; 
`;

export default function LandingPage() {
  return (
    <div>
      <Wrapper>
        <Title> WELCOME TO DOOGLE </Title>
        <Link to='/home'>
          <Button> INGRESAR </Button>
        </Link>
      </Wrapper >
    </div>
  )
};
