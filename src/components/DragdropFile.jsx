import React, { useEffect, useState } from 'react';
import { database } from './firebaseConfig';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = database.ref('images');
        const snapshot = await imagesRef.once('value');
        const data = snapshot.val();
        if (data) {
          const imageList = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setImages(imageList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.src} alt="" />
          <p>Category: {image.category}</p>
          <p>Time: {image.time}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
