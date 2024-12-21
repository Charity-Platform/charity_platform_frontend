
import HomeDash from '../../components/dashboard/HomeDash';
import RightSide from '../../components/dashboard/RightSide'
import imagbg from '../../../src/assets/بنرات الموقع  [جديد ]-09.jpg'

const DashBoard = () => {
  return (
    <div className="container-fluid"   style={{ 
      backgroundImage:`url(${imagbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', // Ensure the background covers the entire screen height
    }}>
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
