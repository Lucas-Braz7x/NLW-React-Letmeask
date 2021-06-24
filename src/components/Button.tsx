import {ButtonHTMLAttributes} from 'react' //Importa todos os atributos que um botão pode receber
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}
  
export function Button ({isOutlined = false, ...props}: ButtonProps) { 
  return(
    <button className={`button ${isOutlined ? 'outlined' : '' }`} {...props} />
  )
}
