import React from 'react'
import NavBar from '../../components/HomePage/NavBar/NavBar';
import Back from '../../components/Back/Back';
import CourcesComponent from '../../components/Cources/Cources';

const Cources = () => {
  return (
    <div>
      <NavBar/>
      <Back title='مبادرة واعى'/>
      <CourcesComponent/>
    </div>
  )
}

export default Cources
