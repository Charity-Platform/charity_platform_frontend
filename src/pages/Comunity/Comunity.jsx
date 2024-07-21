import '../../components/Comunity/Comunity.css';
import Sidebar from '../../components/Comunity/Sidebar';
import PostList from '../../components/Comunity/PostList';
import RightSide from '../../components/Comunity/RightSide';
const Comunity = () => {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 left-sidbar">
        <Sidebar />
      </div>
      <div className="col-md-7 ">
        <PostList />
      </div>
      <br/>
      <div className="col-md-2 right-sidbar ">
        <RightSide />
      </div>
    </div>
  </div>
  )
}

export default Comunity
