import './button.css';

export default function Button({content, onClick, style}) {
    return (
        <button onClick={onClick} style={style} className="component-button">
            {content}
        </button>
    );
}