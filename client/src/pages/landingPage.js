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
`;

const Button = styled.div`
    background-color: #4ca771;
    padding: 24px 36px;
    color: white;
    border-radius: 10px;
    font-size: 50px;
    margin: 50px;
`;

function LandingPage() {
    return (
        <div> 
            <Link to='/home'>
                <Wrapper>
                    <Button> INGRESAR </Button>
                </Wrapper >
            </Link>
        </div>
    )
};

export default LandingPage; 

// QUIERO COLOCARLE UN TITULO Y UN WELCOME
//usar imagen desde public