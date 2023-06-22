import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import styles from './add.module.css';

function AddMovie() {
  const [uploaded, setUploaded] = useState(false);

  const onDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:3001/addmovies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploaded(true);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('File upload failed!');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Movie CSV</h1>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag and drop CSV file here or click to select</p>
      </div>
      {uploaded && <p className={styles.successMessage}>File uploaded!</p>}
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
    </div>
  );
}

export default AddMovie;
