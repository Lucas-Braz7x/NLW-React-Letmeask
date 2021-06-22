import {BrowserRouter, Route} from 'react-router-dom'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
      <Route />
    </BrowserRouter>
  );
}

export default App;
