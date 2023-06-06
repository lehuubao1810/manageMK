import React from 'react'

import '../assets/css/modalDelete.css'

function ModalDelete(props) {

  const closeModal = () => {
    props.setShowModalDelete(false);
    console.log('close modal');
    console.log(props.showModalDelete);
  };

  const handleDeleteImg = () => {
    props.handleDeleteImg();
    closeModal();
  }
 
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modalDelete" onClick={(e) => e.stopPropagation()}>
        <div className="title">Delete This Image?</div>
        <div className="remind">
          Are you sure you want to delete
          the image?
          This action will remove all columns
          and tasks and cannot be reversed.
        </div>
        <div className="btnGroup">
          <button className="btnDelete btn" onClick={handleDeleteImg}>Delete</button>
          <button className="btnCancel btn" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>

  )
}

export default ModalDelete