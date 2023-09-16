import Axios from 'axios';
import { useState, useContext } from 'react';
import '../../Global.css';
import { MangaContext } from './Manga';
export const MangaAddForm = () => {
    
    const {refetchMangas} = useContext(MangaContext);

    const [manga, setManga] = useState({name: "", releaseDate: "", synopsis: "", mangaStatus: ""});
    const handleManga = (event) => {
        const { name, value } = event.target;
        setManga((prevManga) => ({
            ...prevManga,
            [name]: value,
        }));
    }
    const createManga = async () => {
        let { name, releaseDate, synopsis, mangaStatus } = manga;
        releaseDate = "" + releaseDate;
        mangaStatus = "" + mangaStatus;
        let newManga = { name, releaseDate, synopsis, mangaStatus };
        newManga = JSON.stringify(newManga);

        try {
            await Axios.post('http://localhost:8080/characters-api/manga', newManga, { headers: { 'Content-Type': 'application/json' } });
            refetchMangas();
        } catch (err) {
            console.log(err);
        }
    }
    const clearInputs = () => {
        setManga({
            name: "",
            releaseDate: "",
            synopsis: "",
            mangaStatus: ""
        });
    }
    return(
        <div>
            <p>Add</p>
            <input type="text" name="name" value={manga.name} onChange={handleManga}></input>
                <input type="date" name="releaseDate" value={manga.releaseDate} onChange={handleManga}></input>
                <input type="text" name="synopsis" value={manga.synopsis} onChange={handleManga}></input>
                <input type="number" name="mangaStatus" value={manga.mangaStatus} onChange={handleManga}></input>
                <button onClick={() => {createManga(); clearInputs()}}>Submit</button>
        </div>
    );
}