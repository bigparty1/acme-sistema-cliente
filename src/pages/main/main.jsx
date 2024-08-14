import './main.css';

import React, { useState } from 'react';
import NavegationBar from '../../components/navegationBar/navegationBar';
import navegationBarData from '../../data/navegationBarData';

export default function Main() {

    const [currentPage, setCurrentPage] = useState(navegationBarData[0]);

    const handleRouteChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='main-page'>
            <NavegationBar title="ACME" 
                    subTitle="Sistema de Gestão de Tratamentos" 
                    onRouteChange={handleRouteChange}
                    initalPage={0}
            />

            <div className='page-content'>
                {currentPage.pageComponent}
            </div>
        </div>
    );
}