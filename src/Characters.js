import Axios from 'axios';
import { useEffect, useState } from 'react';
import './Global.css';
export const Characters = () => {

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
                        </tr>
                    </thead>
                    <tbody>
                        {searchEntry 
                        ? characters.filter((character) => searchEntry.toLowerCase() === character.name.toLowerCase())
                        .map((character, index) => (
                            <tr>
                                <td key={index}>{character.id}</td>
                                <td>{character.name}</td>
                                <td>{character.dateOfBirth.split("--")}</td>
                                <br />
                            </tr>
                        ))
                            : characters.map((character) => (
                            <tr>
                                <td key={character.id}>{character.id}</td>
                                <td>{character.name}</td>
                                <td>{character.dateOfBirth.split("--")}</td>
                                <br />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}