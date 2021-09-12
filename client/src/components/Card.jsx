import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardStyle = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    width: calc(25% - 20px);
    height: 450px;
    border-radius: 20px;
    background-color: #4CA771;

    img {
      border-radius: 20px;
      height: 200px;
      object-fit: cover;
    }
`;

const MiniCard = styled.div`
   padding: 15px;
   color: white;
`;

const Title = styled.h1`
   margin: 0;
   border-bottom: 1px solid white;
   font-size: 25px;
`;

const Info = styled.h3`
    margin: 0;
    font-weight: 300;
`;

export default function Card({ dog }) {
  return (
    <CardStyle>
        <img src={dog.image.url} alt="" />
        <MiniCard>
          <Title>{dog.name}</Title>
          <Info>{dog.temperament}</Info>
          <Info>{dog.weight.metric}kg</Info>
        </MiniCard>
      </CardStyle>
  )
}