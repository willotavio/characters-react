import Axios from 'axios'
import { useEffect, useState } from 'react'
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
            
            <ul>
                {searchEntry ? 
                
                characters.filter((character) => searchEntry.toLowerCase() === character.name.toLowerCase())
                    .map((character, index) => (
                        <>
                            <li key={index}>{character.id}</li>
                            <li>{character.name}</li>
                            <br />
                        </>
                    ))
                        : characters.map((character) => (
                        <>
                            <li key={character.id}>{character.id}</li>
                            <li>{character.name}</li>
                            <br />
                        </>
                    ))}
            </ul>
        </div>
    );
}