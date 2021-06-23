import { useContext, FormEvent, useState } from 'react';

import {Link, useHistory} from 'react-router-dom';//Mudar de endereço atraves de um link

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/global.scss';
import '../styles/auth.scss';

import { Button } from '../components/Button';

import {AuthContext} from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import userEvent from '@testing-library/user-event';


export function NewRoom(){
  const {user, signInWithGoogle} = useAuth();//Recuperando o valor do contexto
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  //Criando as salas
  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() == ''){
      return;
    }
    //Escrevendo no firebase
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleCreateRoom}> 
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)} //Pega o valor de cada mudança realizada no input
              value={newRoom}
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