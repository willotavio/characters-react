import Axios from 'axios';
import '../../Global.css';
import { useState, useContext } from 'react';
import { CharacterContext } from './Character';

export const CharacterAddForm = () => {
    const {mangas, refetchCharacters} = useContext(CharacterContext);
    
    const [character, setCharacter] = useState({name: "", dateOfBirth: "", mangaId: ""});
    const handleCharacter = (event) => {
        const { name, value } = event.target;
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    }
    
    const handleMangaSelect = (event) => {
        const mangaId = event.target.value;
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            mangaId: mangaId,
        }));
    }
    const createCharacter = async () => {
        let char = JSON.stringify(character);
        try{
            await Axios.post('http://localhost:8080/characters-api/character', char, {headers: {'Content-Type': 'application/json'}});
            refetchCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    const clearInputs = () => {
        setCharacter({
            name: "",
            dateOfBirth: "",
            mangaId: ""
        });
    }

    return(
        <div>
            <input type="text" name="name" value={character.name} onChange={handleCharacter}></input>
            <input type="text" name="dateOfBirth" value={character.dateOfBirth} onChange={handleCharacter}></input>
            <select value={character.mangaId} onChange={handleMangaSelect}>
                <option value="">Select an option</option>
                {mangas?.map((manga) => (
                    <option key={manga.id} value={manga.id}>{manga.name}</option>
                ))}
            </select>
            <button onClick={() => {createCharacter(); clearInputs()}}>Submit</button>
        </div>
    );
}