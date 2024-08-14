import './formHeader.css';
import { MdOutlineClose } from "react-icons/md";

export default function FormHeader({ title, onClose, icon, style }) 
{
    return (
        <div className='component-form-header' style={style}>
            {icon}
            <label className='component-form-header-title'>{title}</label>
            <button className='component-form-header-close-btn' onClick={onClose}>
                <MdOutlineClose className="icon" />
            </button>
        </div>
    );
}
