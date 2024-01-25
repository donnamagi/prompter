import { React, useContext } from 'react';
import Search from '@/components/Search';
import Modal from '@/components/Modal';
import { StateContext } from '@/context/StateContext';

export default function Templates() {
  const {templates} = useContext(StateContext);
  
  return (
    <>
    <Search templates= {templates} /> 
    <Modal /> 
    </>
  )
}
