import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../actions/index.actions';
import styled from 'styled-components';


const SearchB = styled.div`
    margin-bottom: 50px;

    form {
       display: flex;
    }
`;

const Input = styled.input`
   border-radius: 20px 0 0 20px; 
   background-color: #F8F9F8;
   border: none;
   padding: 12px 20px;
   color: #575d58;
   font-size: 16px;
   flex: 1;

   &::placeholder {
      color: #575d58;
      font-size: 16px;
   }

   &:focus {
      outline: none;
   }
`;

const Button = styled.button`
   background-color: #4ca771;
   padding: 12px;
   color: white;
   border-radius: 0 20px 20px 0;
   font-size: 16px;
   border: none;
`;

export default function SearchBar() {
   const dispatch = useDispatch()
   const [name, setName] = useState('');


   function handleChange(e) {
      e.preventDefault()
      setName(e.target.value)
   }

   function handleSubmit(e) {
      e.preventDefault();
      dispatch(getDogsByName(name))
   }

   return (
      <SearchB>
         <form onSubmit={handleSubmit}>
            <Input type="search" placeholder="Doogle your dog" aria-label="Search" onChange={(e) => handleChange(e)} />
            <Button type='submit'> Doogle </Button>
         </form>
      </SearchB>
   )
}

