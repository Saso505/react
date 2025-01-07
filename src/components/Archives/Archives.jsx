/* eslint-disable */

import React, { useEffect, useState } from 'react';
import style from './Archives.module.css';

export default function Archives() {
    // Example state initialization (if needed)
    const [first, setFirst] = useState('');

    useEffect(() => {
        // Example logic (if needed)
        console.log('Component mounted');
    }, []);

    return < >
        <div className="archives bg h-screen">
            Archives
        </div>

    </>
        ;
}
