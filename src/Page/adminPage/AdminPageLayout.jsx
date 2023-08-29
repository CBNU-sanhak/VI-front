import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Header from '../../component/header/Header';
import styles from './AdminPageLayout.module.css'

export default function AdminPageLayout() {

    const [selectedItem, setSelectedItem] = useState(null);

    const navigate = useNavigate();
    const handleItemClick = (itemUrl) => {
        setSelectedItem(itemUrl);
        navigate(itemUrl); // URL 변경
    };

    const items = [
        {
            url:"/admin/customer-service",
            subject:"고객센터관리"
        },
        {
            url:"/admin/board",
            subject:"게시판관리"
        },
        {
            url:"/admin/studygroup",
            subject:"스터디그룹관리"
        },
        {
            url:"/admin/interview",
            subject:"가상면접관리"
        }
    ]

    return (
        <div>
            <div className='header'><Header /></div>
            <div className='container'>
                <div className={styles.sideBar}>
                    {items.map((item)=> {
                    return <div
                        className={`${styles.list} ${selectedItem === item.url ? styles.selected : ''}`}
                        onClick={() => handleItemClick(item.url)}
                    ><Link to={item.url}
                    >
                        {item.subject}
                    </Link></div>
                    })}
                </div>
                
                <div className={styles.main}>
                    <Outlet  />
                </div>
            </div>
        </div>
    );
}

