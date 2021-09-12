import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../actions/index.actions';

const SearchB = styled.div`
    
`;

const Input = styled.input`
   border-radius: 20px;
   background-color: #F8F9F8;
   border: none;
   padding: 12px;
   color: #b9c2ba;
   font-size: 16px;

   &::placeholder {
      color: #b9c2ba;
      font-size: 16px;
   }

   &:focus {
      outline: none;
   }
`;

export default function SearchBar() {
   const dispatch = useDispatch()
   const [name, setName] = useState('');

   function handleInputChange(e) {
      e.preventDefault()
      setName(e.target.value)
   }

   function handleSubmit(e) {
      e.preventDefault();
      dispatch(getDogsByName(name))
   }

   return (
      <SearchB>
         <form>
            <Input type="search" placeholder="Doogle your dog" aria-label="Search" onChange={(e) => handleInputChange(e)} />
            <button type='submit' onSubmit={(e) => handleSubmit(e)}> Doogle </button>
         </form>
      </SearchB>
   )
}

