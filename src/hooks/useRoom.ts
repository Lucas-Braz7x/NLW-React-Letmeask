import { useEffect } from "react";
import { useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
  id: string,
  author:{
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
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


export function useRoom(roomId: string){
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

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

  return {questions, title};

}