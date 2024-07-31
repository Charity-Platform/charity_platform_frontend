
import HomeDash from '../../components/dashboard/HomeDash';
import RightSide from '../../components/dashboard/RightSide'



const DashBoard = () => {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-10">
        <HomeDash />
      </div>
      <div className="col-md-2">
        <RightSide />
      </div>
    </div>
  </div>
  );
}

export default DashBoard
