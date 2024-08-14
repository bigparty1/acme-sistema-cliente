import './tableNavegation.css';
import Table from '../table/table';
import { PiArrowRightBold, PiArrowLineRightBold, PiArrowLeftBold, PiArrowLineLeftBold } from "react-icons/pi";

export default function TableNavegation({columns, data, showActionButton = false, 
    actionButtonData = [], canSelectRow = false, onRowSelect, onNext, onPrev, onFirst,
    onLast, currentPage = 1, totalPages = 1, style})
{
    return (
        <div style={style}>
            <div className='component-table-navegation-container'>
                <Table 
                    columns={columns}
                    data={data}
                    showActionBtn={showActionButton}
                    canSelectRow={canSelectRow}
                    onRowSelect={onRowSelect}
                    actionBtnData={actionButtonData}
                />
            </div>
            
            <div className='component-table-navegation'> 
                <button className='component-table-navegation-first-btn' onClick={onFirst}>
                    <PiArrowLineLeftBold className="icon" />
                </button>
                <button className='component-table-navegation-prev-btn' onClick={onPrev}>
                    <PiArrowLeftBold className="icon" />
                </button>
                <label className='component-table-navegation-page-label'>{currentPage} de {totalPages}</label>             
                <button className='component-table-navegation-next-btn' onClick={onNext}>
                    <PiArrowRightBold className="icon" />
                </button>
                <button className='component-table-navegation-last-btn' onClick={onLast}>
                    <PiArrowLineRightBold className="icon" />
                </button>
            </div>
        </div>
    );  
}
