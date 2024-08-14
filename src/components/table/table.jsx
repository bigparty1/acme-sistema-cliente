import './table.css';
import React, {useState} from 'react';

export default function Table({columns, data, showActionButton = false, 
    actionButtonData = [], canSelectRow = false, onRowSelect, style})
{

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
        if(canSelectRow) {
            setSelectedRow(index);
            if(onRowSelect) {
                onRowSelect(index);
            }
        }
    }

    return (
        <table className='component-table' style={style}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                    {showActionButton && <th>Ações</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr
                        key={index}
                        className={selectedRow === index ? 'selected' : ''}
                        onClick={() => handleRowClick(index)}
                    >
                        {columns.map((column, index) => (
                            <td key={index}>{(item)[column]}</td>
                        ))}
                        {showActionButton && (
                            <td className="component-table-actions-column">{
                            actionButtonData.map((btn) => (
                                
                                    <button className={'component-table-' + btn.label + '-btn'} onClick={() => btn.action(item)} title={btn.tooltip}>
                                        <span className='icon' style={btn.style}>{btn.icon}</span>
                                    </button>
                            ))
                        }</td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );

}
