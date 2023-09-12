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

    const [manga, setManga] = useState({});
    const handleManga = (event) => {
        const { name, value } = event.target;
        setManga((prevManga) => ({
            ...prevManga,
            [name]: value,
        }));
        console.log(manga)
    }
    const createManga = async () => {
        let { name, releaseDate, synopsis, mangaStatus } = manga;
        releaseDate = ""+releaseDate;
        mangaStatus = ""+mangaStatus;
        let newManga = {name, releaseDate, synopsis, mangaStatus};
        newManga = JSON.stringify(newManga);
        console.log(newManga);
        try{
            await Axios.post('http://localhost:8080/characters-api/manga', newManga, {headers: {'Content-Type': 'application/json'}});
        }
        catch(err){
            console.log(err);
        }
        getMangas();
    }

    return(
        <div>
            <p>Get Mangas</p>

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

            <input type="text" name="name" value={manga.name} onChange={handleManga}></input>
            <input type="date" name="releaseDate" value={manga.releaseDate} onChange={handleManga}></input>
            <input type="text" name="synopsis" value={manga.synopsis} onChange={handleManga}></input>
            <input type="number" name="mangaStatus" value={manga.mangaStatus} onChange={handleManga}></input>
            <button onClick={createManga}>Submit</button>
            
        </div>
    );
}