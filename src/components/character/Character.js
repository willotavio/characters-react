import Axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import { CharacterList } from './CharacterList';
import { CharacterForm } from './CharacterForm';

export const CharacterContext = createContext();

export const Character = () => {
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

    

    /* const [characterAdd, setCharacterAdd] = useState({name: "", dateOfBirth: "", mangaId: ""});
    const handleCharacter = (event) => {
        const { name, value } = event.target;
        setCharacterAdd((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    }
    const getMangas = async () => {
        try{
            const result = await Axios.get('http://localhost:8080/characters-api/manga');
            setMangas(result.data);
        }
        catch(err){
            console.log(err);
        }
    }
    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        getMangas();
    }, []);
    const handleMangaSelect = (event) => {
        const mangaId = event.target.value;
        setCharacterAdd((prevCharacter) => ({
            ...prevCharacter,
            mangaId: mangaId,
        }));
    }
    const updateCharacters = (newCharacter) => {
        setCharacters([...characters, newCharacter]);
        getCharacters();
        getMangas();
    } */
    return(
        <div>
            <CharacterContext.Provider value={{characters}}>
                <CharacterList />
                {/* <CharacterForm /> */}
            </CharacterContext.Provider>
        </div>
    );
}