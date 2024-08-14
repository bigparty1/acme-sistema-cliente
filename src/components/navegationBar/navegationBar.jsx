import './navegationBar.css';
import './navegationBarModel';

import React, { useState } from 'react';

export default function NavegationBar({ navbarData, title, subTitle, initialPage, onRouteChange }) {
    
    const [activeIndex, setActiveIndex] = useState(initialPage);

    const handleItemClick = (index) => {
        
        if(onRouteChange) {
            onRouteChange(navbarData[index]);
        }
        
        setActiveIndex(index);
    };

    return (
        <nav className="component-navbar">
            <div className="component-navbar-title">
                {title}
            </div>
            <div className="component-navbar-subtitle">
                {subTitle}
            </div>

            <ul className="component-navbar-menu">
                {navbarData.map((item, index) => {
                    return (
                        <li className="component-navbar-menu-item" key={index}>
                            <span className={`component-navbar-link ${index === activeIndex ? 'active' : ''}`} 
                                onClick={() => handleItemClick(index)}
                            >
                                <span className="component-navbar-icon">{item.icon}</span>
                                {item.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

