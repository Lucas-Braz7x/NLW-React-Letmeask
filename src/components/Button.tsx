import {ButtonHTMLAttributes} from 'react' //Importa todos os atributos que um botão pode receber

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
  
export function Button (props: ButtonProps) { 
  return(
    <button className="button" {...props} />
  )
}
