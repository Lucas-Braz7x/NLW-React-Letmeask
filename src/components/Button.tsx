/* type ButtonProps = {
  text?: string; //O "?" torna a propriedade opcional
} */

import { useState } from "react";

export function Button (/* props: ButtonProps */) {
 //let counter = 0;
 const [counter, setCounter] = useState(0);//Criando estado


 function increment(){
   setCounter(counter + 1);
 }
 
 
  return(
    <button onClick={increment}>{/* {props.text || "Default"} */}
      {counter}
    </button>
  )
}
