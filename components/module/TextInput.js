import React from 'react';
import styles from "@/module/TextInput.module.css"
import { p2e } from '@/utils/replaceNumber';

const TextInput = ({ title, name, profileData, setProfileData, textarea = false }) => {

    const changeHandelr = (evt) => {
        const { name, value } = evt.target
        setProfileData({ ...profileData, [name]: p2e(value) })
    }

    return (
        <div className={styles.container}>
            <p>{title}</p>
            {textarea ? (<textarea name={name} type="text" value={profileData[name]} onChange={changeHandelr} />)
                : (<input type="text" name={name} value={profileData[name]} onChange={changeHandelr} />)}
        </div>
    );
};

export default TextInput;