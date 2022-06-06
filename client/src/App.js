import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import PokemonCreate from './components/form/PokemonCreate';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/home/:id' element={<Detail/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/pokemon' element={<PokemonCreate/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
