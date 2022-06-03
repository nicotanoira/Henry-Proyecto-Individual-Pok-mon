import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Home from './components/home/Home';
//import Detail from './src/components/detail/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/home' element={<Home/>}/>
          {/* <Route exact path='/pokemons/:idPokemon' element={<Detail/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
