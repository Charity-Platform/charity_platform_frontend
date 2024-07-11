import React from 'react';
import NavBar from '../../components/HomePage/NavBar/NavBar';
import Back from '../../components/Back/Back';
import Card_services from '../../components/Service_instruct/Card-services';
import Paralex from '../../components/Paralex/Paralex';
import Footer from '../../components/HomePage/Footer/Footer';
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