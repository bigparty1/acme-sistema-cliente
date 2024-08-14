import './overlay.scss';
import React from 'react';

export default function Overlay({children, isVisible}) {

    if(!isVisible)
        return null;
    
    return (
        <div className="component-overlay">
            <div className="component-overlay-content">
                {children}
            </div>
        </div>
    );
}