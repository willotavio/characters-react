import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../../Global.css';
import { MangaList } from './MangaList';
import { MangaForm } from './MangaForm';

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
        // Update the manga list in the parent component
        setMangas([...mangas, newManga]);
        getMangas();
    }

    return (
        <div>
            <p>Get Mangas</p>
            {/* Render MangaList and pass the manga data as props */}
            <MangaList mangas={mangas} />
            {/* Render MangaForm and pass the update function as a prop */}
            <MangaForm updateMangas={updateMangas} />
        </div>
    );
}
