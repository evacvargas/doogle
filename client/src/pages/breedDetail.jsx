import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBreed } from '../actions/index.actions';
import { useHistory } from "react-router-dom";
import Nav from '../components/Nav';
import styled from 'styled-components';


const DetailWraper = styled.div`
  display: flex;

  img {
    width: 50%;
    height: 600px;
    object-fit: cover;
    border-radius: 20px 0 0 20px;
  }

`;

const Wraper = styled.div`
  padding: 0 80px 80px 80px;
`;

const Info = styled.div`
  padding: 20px;
  background-color: #4CA771;
  width: 50%;
  border-radius: 0 20px 20px 0;
  color: white;

  h1 {
    font-size: 40px;
    border-bottom: 1px solid white;
  }

  li {
    font-size: 20px;
  }
`;

const GoBack = styled.div`
  cursor: pointer;
  margin-bottom: 50px;
`;

export default function BreedDetail(props) {
  const dispatch = useDispatch()
  const detailDog = useSelector((state) => state.details)

  let history = useHistory();


  useEffect(() => {
    dispatch(getDetailBreed(props.match.params.id))
  }, [dispatch, props.match.params.id])


  return (

    <Wraper>
      <Nav />
      <GoBack onClick={() => history.goBack()}> {'<- Dog back'} </GoBack>
      <DetailWraper>
        <img src={detailDog[0]?.image?.url || "https://thumbs.dreamstime.com/b/group-twelve-dogs-24189584.jpg"} alt="" />
        <Info>
          <h1>{detailDog[0]?.name || detailDog?.name}</h1>
          <ul>
            {detailDog[0]?.temperament && <li> Temperament: {detailDog[0]?.temperament}</li>}
            <li> Weight: {detailDog[0]?.weight.metric || detailDog?.weight} kg</li>
            <li> Height: {detailDog[0]?.height.metric || detailDog?.height}</li>
            <li> Life Span: {detailDog[0]?.life_span || detailDog?.life_span}</li>
          </ul>
        </Info>
      </DetailWraper>
    </Wraper>
  )
};




