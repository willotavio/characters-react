import Axios from 'axios';
import { useEffect, useState, createContext, useContext } from 'react';
import { CharacterList } from './CharacterList';
import { CharacterForm } from './CharacterForm';
import { AppContext } from '../App';

export const CharacterContext = createContext();

export const Character = () => {
    const { characters, setCharacters, getCharacters, mangas, setMangas, getMangas } = useContext(AppContext);
    const [characterAdd, setCharacterAdd] = useState({name: "", dateOfBirth: "", mangaId: ""});
    const handleCharacter = (event) => {
        const { name, value } = event.target;
        setCharacterAdd((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    }
    
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
    }
    return(
        <div>
            <CharacterContext.Provider value={{characters, characterAdd, mangas, setMangas, handleCharacter, handleMangaSelect, updateCharacters}}>
                <CharacterList />
                <CharacterForm />
            </CharacterContext.Provider>
        </div>
    );
}