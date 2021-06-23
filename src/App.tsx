//Para realizar a navegação de páginas
import {BrowserRouter, Route} from 'react-router-dom';

import {AuthContextProvider} from './contexts/AuthContext';

//Importando 'pages'
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route />
      </AuthContextProvider>
      
    </BrowserRouter>
  );
}

export default App;
