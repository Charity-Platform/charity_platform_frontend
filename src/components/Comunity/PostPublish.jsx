import React, { useState } from 'react';
import './Comunity.css';

const PostPublish = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (title && content) {
        // Prepare FormData to handle file upload and other data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
          formData.append('image', image); // Append the image file
        }

        // Call addPost with formData
        addPost(formData);

        setTitle('');
        setContent('');
        setImage(null);
      } else {
        console.error("Title and content cannot be empty");
      }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Use the file object instead of URL
    };

    return (
      <div className="card mb-3 card-comunity">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
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
};

export default PostPublish;
