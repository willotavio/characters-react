import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../Global.css';
import { CharacterForm } from './CharacterForm';
export const CharacterList = () => {

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

    const [searchEntry, setSearchEntry] = useState("");

    const handleSearch = (event) => {
        setSearchEntry(event.target.value);
    }

    const [searchedName, setSearchedName] = useState("");

    const searchCharacter = () => {
        setSearchedName(searchEntry);
    }

    return(
        <div>
            <p>Get Characters</p>

            <input type='text' onChange={handleSearch}></input>
            <button onClick={searchCharacter}>Search</button>

            <div className='listDefault'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Date Of Birth</th>
                            <th>Manga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchedName
                        ? characters.filter((character) => searchedName.toLowerCase() === character.name.toLowerCase())
                        .map((character) => (
                            <tr>
                                <td key={character.id}>{character.id}</td>
                                <td>{character.name}</td>
                                <td>{character.dateOfBirth.split("--")}</td>
                                <td>{character.mangaId}</td>
                            </tr>
                        ))
                            : characters.map((character) => (
                            <tr>
                                <td key={character.id}>{character.id}</td>
                                <td>{character.name}</td>
                                <td>{character.dateOfBirth.split("--")}</td>
                                <td>{character.mangaId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CharacterForm />
        </div>
    );
}