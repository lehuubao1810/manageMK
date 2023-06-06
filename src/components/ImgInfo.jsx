import React from 'react'
import { useState } from 'react'

import '../assets/css/imgInfo.css'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'

function ImgInfo(props) {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    // form data: 
    // src: '/img/wed/wed.webp',
    // category: 'wedding',
    // time: '2021-09-02'
    const bgColor = props.index % 2 === 0 ? 'even' : 'odd'

    function handleDeleteImg() {
        props.handleDelete(props.index, props.img);
    }

    return (
        <div className={`${bgColor} imgInfo`}>
            <div className="img">
                <img src={props.img.src} alt="" />
            </div>
            <div className="category">
                {props.img.category}
            </div>
            <div className="time">
                {props.img.time}
            </div>
            <div className="imgTools">
                <div className="edit" onClick={() => setShowModalEdit(true)}>
                    <i className="fas fa-edit"></i>
                    {
                        showModalEdit &&
                        <ModalEdit
                            img={props.img}
                            index = {props.index}
                            setShowModalEdit={setShowModalEdit}
                            handleChangeCategory={props.handleChangeCategory}
                        />
                    }
                </div>
                <div className="delete" onClick={() => setShowModalDelete(true)}>
                    <i className="fas fa-trash-alt"></i>
                    {
                        showModalDelete &&
                        <ModalDelete
                            handleDeleteImg={handleDeleteImg}
                            setShowModalDelete={setShowModalDelete}
                            showModalDelete={showModalDelete}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ImgInfo