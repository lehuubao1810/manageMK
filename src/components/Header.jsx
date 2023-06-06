import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import ButtonUpload from './ButtonUpload';
import '../assets/css/header.css'

function Header(props) {

    const { logout} = useAuth();
    const [statusAdminBox, setStatusAdminBox] = useState(false)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch(err) {
            console.log(err);
            console.log('Failed to log out');
        }
    }

    return (
        <header className='header'>
            <div className="logo">HuuBao.</div>
            <div className="func">
                <ButtonUpload handleAdd={props.handleAdd}/>
                <div className="admin"
                    onClick={() => setStatusAdminBox(!statusAdminBox)}
                >
                    <i className="fas fa-user"></i>
                </div>
            </div>

            {
                statusAdminBox &&
                <div className="admin__box">
                    <div className="logoutBtn"
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                </div>
            }
        </header>
    )
}

export default Header