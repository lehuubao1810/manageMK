import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, updateDoc, arrayUnion, serverTimestamp, FieldValue } from 'firebase/firestore';
import { format } from 'date-fns';

import { auth, db, storage } from '../firebase';
import '../assets/css/modalUpload.css';

const ModalUpload = (props) => {
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState('wedding');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const closeModal = () => {
    props.handleShowModal();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image.length>0 && category) {
      setIsLoading(true);

      try {
        for (let i = 0; i < image.length; i++) {
          const imageSub = image[i];
          const storageRef = ref(storage, imageSub.name);
          await uploadBytes(storageRef, imageSub);
          const imageUrl = await getDownloadURL(storageRef);

          const imagesCollectionRef = collection(db, 'images');
          const docRef = doc(imagesCollectionRef, category);
          
          const newData = {
            src: imageUrl,
            category: category,
            time: format(new Date(), 'dd/MM/yyyy'), 
          };

          await updateDoc(docRef, {
            img: arrayUnion(newData)
          });

          props.handleAdd(newData);

          setImage(null);
          // setCategory('wedding');
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError("Đã có lỗi xảy ra, vui lòng thử lại sau!")
        setIsLoading(false);
      }
    } else {
      setError("Vui lòng chọn ảnh và chọn danh mục!")
    }
  };

  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modalUpload" onClick={(e) => e.stopPropagation()}>
        <div className="modalUpload__header">
          <h3 className="modalUpload__title">Upload</h3>
        </div>
        <div className="modalUpload__body">
          <form action="upload">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="wedding">Wedding</option>
                <option value="yearbook">Yearbook</option>
                <option value="anniversary">Anniversary</option>
              </select>
              <div className="dragdrop">
                <i className="fas fa-cloud-upload-alt"></i>
                <span>Drag & Drop your image here</span>
                <p>or</p>
                <p className="btnChooseFiles">Choose files</p>
                <input
                  type="file"
                  name=""
                  id=""
                  multiple={true}
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
              <p className="acceptText">Accepted File Types: .png, .jpg only</p>
              <button
                className="btnUpload"
                onClick={(e) => handleSubmit(e)}
                disabled={isLoading}
              >
                {
                  isLoading
                    ?
                    <div className="bounce-loading">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    :
                    <span>Upload</span>
                }
              </button>
              <span className="err">
                {error}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpload;
