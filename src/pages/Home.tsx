//useContext recupera o valor de um contexto
import {useContext} from 'react';

//Para criar navegação pelo button
import { useHistory } from 'react-router-dom';

//Importando imagens
import illustrationImg from '../assets/images/illustration.svg'; 
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

//Importando contexto
import { useAuth } from '../hooks/useAuth';
import {AuthContext} from '../contexts/AuthContext';

//Importando "css" 
import '../styles/global.scss';
import '../styles/auth.scss';

 //Importando componente Button
import { Button } from '../components/Button';


export function Home(){
  const history = useHistory();
  const {user, signInWithGoogle} =  useAuth();//Recuperando o valor do contexto

  async function handleCreateRoom (){
    if(!user){
      await signInWithGoogle();
    }
    
    //Redirecionando para outra 'pagina'
    history.push('/rooms/new');
  }
  
  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie a sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button className="button" type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}