//Para realizar a navegação de páginas
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {AuthContextProvider} from './contexts/AuthContext';
import { AdiminRoom } from './pages/AdiminRoom';

//Importando 'pages'
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/adimin/rooms/:id" component={AdiminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
