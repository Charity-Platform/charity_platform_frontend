import React from 'react'
import video from '../../assets/blog.mp4'
const Blog_video = () => {
  return (
    <div className='video-blog'>
       <video autoPlay muted loop id="video-background">
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="content-overlay">
        <h1>مرحبا بكم ف أكبر مجمع للتعارف الوظيفى </h1>
        <p>إبنى مدونتك وانطلق للمشاركة </p>
      </div>
    </div>
  )
}

export default Blog_video
