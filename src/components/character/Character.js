import Axios from 'axios';
import { useState, createContext } from 'react';
import { CharacterList } from './CharacterList';
import { CharacterAddForm } from './CharacterAddForm';
import { useQuery } from '@tanstack/react-query';
import '../../Global.css';
import { CharacterUpdateForm } from './CharacterUpdateForm';

export const CharacterContext = createContext();

export const Character = () => {
    const { data: characters, refetch: refetchCharacters } = useQuery(['characters'], async () => {
        return Axios.get('http://localhost:8080/characters-api/character').then((res) => res.data).catch((err) => console.log(err));
    });
    const { data: mangas, refetch: refetchMangas } = useQuery(['mangas'], () => {
        return Axios.get('http://localhost:8080/characters-api/manga').then((res) => res.data).catch((err) => console.log(err));
    });
    
    
    const addCharacter = async (character) => {
        let char = JSON.stringify(character);
        try{
            await Axios.post('http://localhost:8080/characters-api/character', char, {headers: {'Content-Type': 'application/json'}});
            refetchCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteCharacter = async (characterId) => {
        try{
            await Axios.delete(`http://localhost:8080/characters-api/character/${characterId}`);
            refetchCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    const [selectedCharacter, setSelectedCharacter] = useState({});
    const editCharacter = async (characterId) => {
        let result = characters.filter((character) => character.id === characterId)[0];
        const updatedCharacter = {
            id: result.id,
            name: result.name,
            dateOfBirth: result.dateOfBirth.split("--")[1],
            mangaId: result.manga?.id
        };
        setSelectedCharacter(updatedCharacter);
    }

    const updateCharacter = async (characterId, character) => {
        try{
            await Axios.put(`http://localhost:8080/characters-api/character/${characterId}`, character, {headers: {'Content-Type': 'application/json'}});
            setSelectedCharacter({});
            refetchCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <CharacterContext.Provider value={{characters, mangas, addCharacter, editCharacter, deleteCharacter}}>
                <CharacterList />
                <CharacterAddForm />
                {selectedCharacter.name && <CharacterUpdateForm  selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} updateCharacter={updateCharacter}/>}
            </CharacterContext.Provider>
        </div>
    );
}