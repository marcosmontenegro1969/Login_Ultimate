// Definição do componente InputLogin, que recebe várias (props) quando é usado.
function InputLogin({ type, name, label, value, onChange, onFocus }) {
  return (
    // Um div que envolve todo o input e sua label. A className do div é determinada pelo nome do campo.
    // Se for 'nome', a className será 'grupo_Input1', se naõ for, será 'grupo_Input2'.
    // <div className={`grupo_Inputs`}>
    <div className='grupo_Inputs'>  
      {/* O elemento input do HTML é criado aqui. As props 'type', 'name', 'value', 'onChange' e
      'onFocus' são passadas para ele. 'type' define o tipo do input (ex: texto, senha), 'name' define
      o nome, 'value' contém o valor atual do input, 'onChange' é um manipulador de
      eventos acionado quando o valor do input muda e 'onFocus' é acionado quando o input ganha foco. */}
      <input type={type} name={name} required value={value}
             onChange={onChange} onFocus={onFocus} />

      {/* Um div para a label flutuante do input.*/}
      <div className={`label_Contorno`}>
        {label}
      </div>
    </div>
  );
}

export default InputLogin; // Exporta o componente InputField para que possa ser usado em outros arquivos.