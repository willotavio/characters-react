import { useState, useContext } from 'react';
import '../../Global.css';
import { CharacterContext } from './Character';
export const CharacterList = () => {

    const {characters, deleteCharacter} = useContext(CharacterContext);
    
    const [searchEntry, setSearchEntry] = useState("");

    const handleSearch = (event) => {
        setSearchEntry(event.target.value);
    }
    return(
        <div>
            <p>Get Characters</p>

            <input type='text' onChange={handleSearch}></input>

            <div className='listDefault'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Date Of Birth</th>
                            <th>Manga</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchEntry
                            ? characters?.filter((character) => searchEntry.toLowerCase() === character.name.toLowerCase())
                            .map((character) => (
                                <tr key={character.id}>
                                    <td>{character.id}</td>
                                    <td>{character.name}</td>
                                    <td>{character.dateOfBirth?.split("--")}</td>
                                    <td>{character.manga?.name}</td>
                                    <td><button onClick={() => deleteCharacter(character.id)}>Delete</button></td>
                                </tr>
                            ))
                            : characters?.map((character) => (
                                <tr key={character.id}>
                                    <td>{character.id}</td>
                                    <td>{character.name}</td>
                                    <td>{character.dateOfBirth?.split("--")}</td>
                                    <td>{character.manga?.name}</td>
                                    <td><button onClick={() => deleteCharacter(character.id)}>Delete</button></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}