import './main.css';

import React, { useState } from 'react';
import NavegationBar from '../../components/navegationBar/navegationBar';
import navegationBarData from '../../data/navegationBarData';

export default function Main() {

    let initialPageIndex = 0;

    const [currentPage, setCurrentPage] = useState(navegationBarData[initialPageIndex]);

    const handleRouteChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='main-page'>
            <NavegationBar title="ACME" 
                    subTitle="Sistema de Gestão de Tratamentos" 
                    navbarData={navegationBarData}
                    initialPage={initialPageIndex}
                    onRouteChange={handleRouteChange}
            />

            <div className='page-content'>
                {currentPage.pageComponent}
            </div>
        </div>
    );
}