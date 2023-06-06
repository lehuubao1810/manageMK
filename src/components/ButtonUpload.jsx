import React from 'react'
import { useState } from 'react';

import ModalUpload from './ModalUpload';

function ButtonUpload(props) {

    const [showModal, setShowModal] = useState(false);

    function handleShowModal() {
        console.log('click');
        setShowModal(!showModal);
    }

    return (
        <>
            <div className="upload" onClick={handleShowModal}>
                <i className="fas fa-cloud-upload-alt"></i>
                <span className="upload__text">Upload</span>
            </div>
            {
                showModal &&
                <ModalUpload
                    handleShowModal={handleShowModal}
                    handleAdd={props.handleAdd}
                />
            }
        </>
    )
}

export default ButtonUpload