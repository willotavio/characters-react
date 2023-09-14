import { useEffect, useState, useContext } from 'react';
import '../../Global.css';
import { CharacterContext } from './Character';
export const CharacterList = () => {

    const {characters} = useContext(CharacterContext);

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
                        </tr>
                    </thead>
                    <tbody>
                        {searchEntry
                        ? characters.filter((character) => searchEntry.toLowerCase() === character.name.toLowerCase())
                        .map((character) => (
                            <tr>
                                <td key={character.id}>{character.id}</td>
                                <td>{character.name}</td>
                                <td>{character.dateOfBirth.split("--")}</td>
                                <td>{character.manga.name}</td>
                            </tr>
                        ))
                            : characters.map((character) => (
                            <tr>
                                <td key={character.id}>{character.id}</td>
                                <td>{character.name}</td>
                                <td>{character.dateOfBirth.split("--")}</td>
                                <td>{character.manga.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}