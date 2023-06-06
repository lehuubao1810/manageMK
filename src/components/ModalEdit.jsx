import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, updateDoc, arrayUnion, serverTimestamp, FieldValue } from 'firebase/firestore';
import { format } from 'date-fns';

import { auth, db, storage } from '../firebase';
import '../assets/css/modalEdit.css';

const ModalEdit = (props) => {
  const [category, setCategory] = useState(props.img.category);
  const [error, setError] = useState('');

  const closeModal = () => {
    props.setShowModalEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === props.img.category) {
      closeModal();
      return;
    } else {
      props.handleChangeCategory(props.index, props.img, category)
      console.log(category)
      closeModal();
    }
  };


  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modalEdit" onClick={(e) => e.stopPropagation()}>
        <div className="modalEdit__header">
          <h3 className="modalEdit__title">Edit</h3>
        </div>
        <div className="modalEdit__body">
          <form action="edit">
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
              <div className="previewImg">
                <img src={`${props.img.src}`} alt="" />
              </div>
              <button
                className="btnSave"
                onClick={(e) => handleSubmit(e)}
              >
                <span>Save</span>
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

export default ModalEdit;
