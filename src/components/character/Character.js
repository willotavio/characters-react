import Axios from 'axios';
import { useState, createContext } from 'react';
import { CharacterList } from './CharacterList';
import { CharacterAddForm } from './CharacterAddForm';
import { useQuery } from '@tanstack/react-query';
import '../../Global.css';

export const CharacterContext = createContext();

export const Character = () => {
    const { data: characters, refetch: refetchCharacters } = useQuery(['characters'], async () => {
        return Axios.get('http://localhost:8080/characters-api/character').then((res) => res.data).catch((err) => console.log(err));
    });
    const { data: mangas, refetch: refetchMangas } = useQuery(['mangas'], () => {
        return Axios.get('http://localhost:8080/characters-api/manga').then((res) => res.data).catch((err) => console.log(err));
    });
    const [newCharacter, setNewCharacter] = useState({name: "", dateOfBirth: "", mangaId: ""});
    const handleCharacter = (event) => {
        const { name, value } = event.target;
        setNewCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    }
    
    const handleMangaSelect = (event) => {
        const mangaId = event.target.value;
        setNewCharacter((prevCharacter) => ({
            ...prevCharacter,
            mangaId: mangaId,
        }));
    }
    
    const deleteCharacter = async (characterId) => {
        try{
            await Axios.delete(`http://localhost:8080/characters-api/character/${characterId}`)
            refetchCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <CharacterContext.Provider value={{characters, mangas, newCharacter, handleCharacter, handleMangaSelect, refetchCharacters, deleteCharacter}}>
                <CharacterList />
                <CharacterAddForm />
            </CharacterContext.Provider>
        </div>
    );
}