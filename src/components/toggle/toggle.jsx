import React, { useState } from 'react';
import './toggle.css';

export default function Toggle({content, value, onChange, style}) {

    const [isActive, setIsActive] = useState(value);

    const handleClick = () => {

        setIsActive(prevIsAcitive => {
            const newValue = !prevIsAcitive;
            if(onChange) {
                onChange(newValue);
            }
            return newValue;
        });
    }

    return (
        <button  
            className={`component-toogle-button ${isActive ? 'active' : ''}`} 
            onClick={handleClick}
            style={style}>
            {content}
        </button>
    );
}