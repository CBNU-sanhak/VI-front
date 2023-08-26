import React from 'react';
import styles from './DropDownNavBar.module.css'

export default function DropDownNavBar({items}) {
    return (
        <div className={styles.dropDownNavBar}>
            <ul>
                {items.map((item)=> <li>{item}</li>)}
            </ul>
        </div>
    );
}

