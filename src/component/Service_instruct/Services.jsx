import React from 'react';
import NavBar from '../HomePage/NavBar/NavBar';
import Back from '../Back/Back';
import Card_services from './Card-services';
const Services = () => {
  return (
    <>
      <NavBar />
      <Back title={'الاستشارات'} /> 
      <Card_services/>
    
    </>
  );
}

export default Services;
