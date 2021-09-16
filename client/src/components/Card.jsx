import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const CardStyle = styled(Link)`
    margin: 10px;
    display: flex;
    flex-direction: column;
    width: calc(25% - 20px);
    height: 500px;
    border-radius: 20px;
    background-color: #4CA771;
    text-decoration: none;

    img {
      border-radius: 20px;
      height: 300px;
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
   text-decoration: none;
`;

const Info = styled.h3`
    margin: 0;
    font-weight: 300;
    text-decoration: none;
`;

export default function Card({ dog }) {
  return (
    <CardStyle to={'/breed/' + dog.id}>
      <img src={dog?.image?.url || "https://thumbs.dreamstime.com/b/group-twelve-dogs-24189584.jpg"} alt={dog.name} />
      <MiniCard>
        <Title>{dog.name}</Title>
        <Info>{dog.temperament}</Info>
        <Info>{dog.weight.metric || dog.weight} kg</Info>
      </MiniCard>
    </CardStyle>
  )
}