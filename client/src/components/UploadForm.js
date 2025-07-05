import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('✅ Uploaded:', res.data.imageUrl);
      alert('✅ Image uploaded!');
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert('❌ Failed to upload image.');
    }
  };

  return (
    <div className="upload-section">
      <h3>Upload Outfit Image</h3>
      <input type="file" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '150px', marginTop: '10px' }} />}
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadForm;
