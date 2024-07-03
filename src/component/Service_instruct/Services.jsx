import React from 'react';
import NavBar from '../HomePage/NavBar/NavBar';
import Back from '../Back/Back';
import Card_services from './Card-services';
import Paralex from '../Paralex/Paralex';
import Footer from '../HomePage/Footer/Footer';
const Services = () => {
  return (
    <>
      <NavBar />
      <Back title={'الاستشارات'} /> 
      <Card_services/>
      <Paralex/>
      <Footer/>
    </>
  );
}

export default Services;
