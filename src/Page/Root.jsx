import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/header/Header';

export default function Root() {
    return (
        <div>
            <div className='header'><Header /></div>
            <div className='container'>
                <div className='sideBar'></div>
                <div className='main'>
                    <Outlet  />
                </div>
                <div className='sideBar'></div>
            </div>
        </div>
    );
}

