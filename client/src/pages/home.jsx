import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import Cards from '../components/Cards';
import Filters from '../components/Filters';
import Nav from '../components/Nav';

const MyHome = styled.div`
  padding: 0 80px 80px 80px;
`;


export default function Home() {
  return (
    <MyHome>
      <Nav />
      <SearchBar />
      <Filters />
      <Cards />
    </MyHome>
  )
};

