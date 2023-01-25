
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import './App.css'
import Home from './Home';
import Favorite from './Favorite';
import Details from './Details';
import Navbarr from './Navbar';


function App() {
  
  return (<>
          <Navbarr />
          <Container className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorite/' element={<Favorite/>} />
          <Route path='/details/:book' element={<Details/>} />
        </Routes>
        
      </Container>

  </>
     
  );
}

export default App;
