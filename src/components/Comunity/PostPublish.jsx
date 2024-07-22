import React, { useState } from 'react';
import './Comunity.css';
const PostPublish = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);


    const handleSubmit = (e) => {
      e.preventDefault();
      if (title && content || image) {
        addPost({ title, content ,image});
        setTitle('');
        setContent('');
       
      }
    };
    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
      };
  
    return (
      <div className="card mb-3 card-comunity">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control "
                placeholder="العنوان"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="اكتب ماذا تفكر"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
               </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
            </div>
            <button type="submit" className="btn btn-publisher">نشر</button>
          </form>
        </div>
      </div>
    );
}

export default PostPublish
