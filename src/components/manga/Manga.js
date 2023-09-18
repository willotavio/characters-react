import Axios from 'axios';
import { useState, createContext } from 'react';
import '../../Global.css';
import { MangaList } from './MangaList';
import { MangaAddForm } from './MangaAddForm';
import { useQuery } from '@tanstack/react-query';
import { MangaUpdateForm } from './MangaUpdateForm';
export const MangaContext = createContext();

export const Manga = () => {
    const { data: mangas, refetch: refetchMangas } = useQuery(['mangas'], () => {
        return Axios.get('http://localhost:8080/characters-api/manga').then((res) => res.data).catch((err) => console.log(err));
    });

    const addManga = async (manga) => {
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

    const deleteManga = async (mangaId) => {
        try{
            await Axios.delete(`http://localhost:8080/characters-api/manga/${mangaId}`);
            refetchMangas();
        }
        catch(err){
            console.log(err);
        }
    }

    const [selectedManga, setSelectedManga] = useState({});
    const editManga = (mangaId) => {
        let result = mangas.filter((manga) => manga.id === mangaId)[0];
        const updatedManga = {
            id: result.id,
            name: result.name,
            releaseDate: result.releaseDate,
            synopsis: result.synopsis,
            mangaStatus: result.mangaStatus
        }
        switch(updatedManga.mangaStatus){
            case "ON_GOING":
                updatedManga.mangaStatus = 1;
                break;
            case "FINISHED":
                updatedManga.mangaStatus = 2;
                break;
            case "CANCELED":
                updatedManga.mangaStatus = 3;
                break;
        }
        setSelectedManga(updatedManga);
    }
    const updateManga = async (mangaId, manga) => {
        try{
            await Axios.put(`http://localhost:8080/characters-api/manga/${mangaId}`, manga, {headers: {'Content-Type': 'application/json'}});
            setSelectedManga({});
            refetchMangas();
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <MangaContext.Provider value={{mangas, addManga, editManga, deleteManga}}>
                <MangaList />
                <MangaAddForm />
                {selectedManga.name && <MangaUpdateForm selectedManga={selectedManga} setSelectedManga={setSelectedManga} updateManga={updateManga}/>}
            </MangaContext.Provider>
        </div>
    );
}
