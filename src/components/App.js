import '../App.css';
import { CharacterList } from './character/CharacterList';
import { Manga } from './manga/Manga';
import { MangaList } from './manga/MangaList';

function App() {
  
  return (
    <div className="App">
      <CharacterList />
      <Manga />
    </div>
  );
}

export default App;
