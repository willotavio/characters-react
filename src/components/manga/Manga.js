import { useState, useEffect, createContext } from 'react';
import Axios from 'axios';
import '../../Global.css';
import { MangaList } from './MangaList';
import { MangaForm } from './MangaForm';
export const MangaContext = createContext();

export const Manga = () => {
    const [mangas, setMangas] = useState([]);

    useEffect(() => {
        getMangas();
    }, []);

    const getMangas = async () => {
        try {
            const result = await Axios.get('http://localhost:8080/characters-api/manga');
            setMangas(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    const updateMangas = (newManga) => {
        setMangas([...mangas, newManga]);
    }

    return (
        <div>
            <MangaContext.Provider value={{mangas, updateMangas}}>
                <p>Get Mangas</p>
                <MangaList />
                <MangaForm />
            </MangaContext.Provider>
        </div>
    );
}
