import { useContext } from 'react';

import {Link} from 'react-router-dom';//Mudar de endereço atraves de um link

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/global.scss';
import '../styles/auth.scss';

import { Button } from '../components/Button';

import {AuthContext} from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';


export function NewRoom(){
  const {user, signInWithGoogle} = useAuth();//Recuperando o valor do contexto
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
          <h2>Criar uma nova sala</h2>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button className="button" type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}