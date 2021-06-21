import React from 'react'; //Importa o react
import ReactDOM from 'react-dom';
import App from './App'; //Importa o "App.tsx"

import './services/firebase';

ReactDOM.render(//"Renderiza o elemento xml(JSX) no index.html"
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);