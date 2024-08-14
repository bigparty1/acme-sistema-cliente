import './formFooter.css';

export default function FormFooter({ onCancel, onSave, nameLeft = 'Cancelar', nameRight = 'Salvar',  style }) 
{
    return (
        <div className='component-form-footer' style={style}>
            <button className='component-form-footer-cancel-btn' onClick={onCancel}>{nameLeft}</button>
            <button className='component-form-footer-save-btn' onClick={onSave}>{nameRight}</button>
        </div>
    );
}
