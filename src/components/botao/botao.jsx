import './botao.css';

export default function Botao({content, onClick, style}) {
    return (
        <button onClick={onClick} style={style} className="botao">
            {content}
        </button>
    );
}