import Axios from 'axios';
import { useState, useEffect } from 'react';
export const Mangas = () => {

    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        getMangas();
    }, []);

    const getMangas = async () => {
        try{
            const result = await Axios.get('http://localhost:8080/characters-api/manga');
            setMangas(result.data);
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
            <input type='text' onChange={handleSearch}></input>

            <ul>
                {searchEntry ?
                
                mangas.filter((mangas) => (searchEntry.toLowerCase() === mangas.name.toLowerCase()))
                    .map((manga) => (
                        <>
                            <li key={manga.id}>{manga.id}</li>
                            <li>{manga.name}</li>
                            <br />
                        </>
                    ))
                        : mangas.map((manga) => (
                        <>
                            <li key={manga.id}>{manga.id}</li>
                            <li>{manga.name}</li>
                            <br />
                        </>
                    ))
            }
            </ul>
            
        </div>
    );
}