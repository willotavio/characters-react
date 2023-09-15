import Axios from 'axios';
import '../../Global.css';
import { useContext } from 'react';
import { CharacterContext } from './Character';

export const CharacterForm = () => {
    const {mangas, newCharacter, handleCharacter, handleMangaSelect, refetchCharacters} = useContext(CharacterContext);
    
    const createCharacter = async () => {
        let char = JSON.stringify(newCharacter);
        try{
            await Axios.post('http://localhost:8080/characters-api/character', char, {headers: {'Content-Type': 'application/json'}});
            refetchCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <input type="text" name="name" value={newCharacter.name} onChange={handleCharacter}></input>
            <input type="text" name="dateOfBirth" value={newCharacter.dateOfBirth} onChange={handleCharacter}></input>
            <select value={newCharacter.mangaId} onChange={handleMangaSelect}>
                <option value="">Select an option</option>
                {mangas?.map((manga) => (
                    <option key={manga.id} value={manga.id}>{manga.name}</option>
                ))}
            </select>
            <button onClick={createCharacter}>Submit</button>
        </div>
    );
}