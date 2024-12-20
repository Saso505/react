/* eslint-disable */

import React, { useEffect, useState } from 'react';
import style from './Profile.module.css';

export default function Profile() {
    // Example state initialization (if needed)
    const [first, setFirst] = useState('');

    useEffect(() => {
        // Example logic (if needed)
        console.log('Component mounted');
    }, []);

    return (
        <div className={style.container}>
          Profile
        </div>
    );
}
