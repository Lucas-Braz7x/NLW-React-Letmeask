import {useParams} from 'react-router-dom';

import { Button } from '../components/Button'; 
import { RoomCode } from '../components/RoomCode';
import {Question} from '../components/Question/index';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';

type RoomParams ={
  id: string;
}

export function AdiminRoom(){
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;

  const {title, questions} = useRoom(roomId);
  
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
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        
        <div className="question-list">
          {questions.map(question =>{
            return(
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>

    </div>

  )
}