import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../Global.css';

export const CharacterForm = () => {
    
    const getMangas = async () => {
        try{
            const result = await Axios.get('http://localhost:8080/characters-api/manga');
            setMangas(result.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const [character, setCharacter] = useState({name: "", dateOfBirth: "", mangaId: ""});
    const handleCharacter = (event) => {
        const { name, value } = event.target;
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    }
    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        getMangas();
    }, []);
    const handleMangaSelect = (event) => {
        const mangaId = event.target.value;
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            mangaId: mangaId,
        }));
    }

    const createCharacter = async () => {
        let { name, dateOfBirth, mangaId } = character;
        let newCharacter = {name, dateOfBirth, mangaId};
        newCharacter = JSON.stringify(newCharacter);
        try{
            await Axios.post('http://localhost:8080/characters-api/character', newCharacter, {headers: {'Content-Type': 'application/json'}});
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <input type="text" name="name" value={character.name} onChange={handleCharacter}></input>
            <input type="text" name="dateOfBirth" value={character.dateOfBirth} onChange={handleCharacter}></input>
            <select value={character.mangaId} onChange={handleMangaSelect}>
                <option value="">Select an option</option>
                {mangas.map((manga) => (
                    <option key={manga.id} value={manga.id}>{manga.name}</option>
                ))}
            </select>
            <button onClick={createCharacter}>Submit</button>
        </div>
    );
}