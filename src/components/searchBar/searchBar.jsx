import './searchBar.css';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, placeholder, onChange, onClick, style }) 
{
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };

    return (
        <div className="component-search-bar" style={style}>
            <input 
                type="text" 
                value={value} 
                placeholder={placeholder} 
                onChange={(e) => onChange(e.target.value)} 
                onKeyDown={handleKeyPress} 
            />
            <button onClick={onClick}>
                <FaSearch className="icon" />
            </button>
        </div>
    );
}