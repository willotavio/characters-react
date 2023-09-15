import Axios from 'axios';
import '../App.css';
import { Character } from './character/Character';
import { Manga } from './manga/Manga';
import { useState, useEffect, createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const AppContext = createContext();

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      },
    },
  });
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
      getCharacters();
  }, []);

  const getCharacters = async () => {
      try{
          const result = await Axios.get('http://localhost:8080/characters-api/character');
          setCharacters(result.data);
      }
      catch(err){
          console.log(err);
      }
  }

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider value={{characters, setCharacters, getCharacters}}>
          <Router>
            <Routes>
              <Route path='/' element={<h1>HOME PAGE</h1>}></Route>
              <Route path='/mangas' element={<Manga />}></Route>
              {/* <Route path='/characters' element={<Character />}></Route> */}
              <Route path='*' element={<h1>PAGE NOT FOUND</h1>}></Route>
            </Routes>
          </Router>
        </AppContext.Provider>  
      </QueryClientProvider>
    </div>
  );
}

export default App;
