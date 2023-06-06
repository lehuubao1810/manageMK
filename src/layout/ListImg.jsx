import React from 'react'

import ImgInfo from '../components/ImgInfo';

function ListImg(props) {    

    return (
        <div className="listImg">
            {
                props.listImg.map((img, index) => (
                    <ImgInfo key={index} img={img} index={index} />
                ))
            }
        </div>
    )
}

export default ListImg