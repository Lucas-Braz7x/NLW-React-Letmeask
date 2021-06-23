import {useParams} from 'react-router-dom';

import { Button } from '../components/Button'; 
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';

type RoomParams ={
  id: string;
}

type FirebaseQuestions = Record<string,{
  author:{
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}>

type Question = {
  id: string,
  author:{
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}

export function Room(){
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id;

  useEffect(() => {//Dispara uma função sempre que algo mudar
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const dataBaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = dataBaseRoom.questions ?? {}; 
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
        return{
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });
      setTitle(dataBaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault(); //Para ele não recarregar a tela
    if(newQuestion.trim() == ''){
      return;
    }
    if(!user){
      throw new Error('you must be logged in');
    }

    const question ={
      content: newQuestion,
      author:{
        name: user.name,
        avatar: user.avatar,
      },
      isHighligted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question );
    setNewQuestion('');
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event =>setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça o seu login</button></span>
            )}
            
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>

    </div>

  )
}