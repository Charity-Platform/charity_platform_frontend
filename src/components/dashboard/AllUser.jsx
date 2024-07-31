import React from 'react'
import './DashBoard.css'
import RightSide from './RightSide'

const AllUser = () => {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-10">
        <h1>كل المستخدمين</h1>
      </div>
      <div className="col-md-2">
        <RightSide />
      </div>
    </div>
  </div>
  )
}

export default AllUser
