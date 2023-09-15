import Axios from 'axios';
import { useState, useEffect, createContext, useContext } from 'react';
import '../../Global.css';
import { MangaList } from './MangaList';
import { MangaForm } from './MangaForm';
import { AppContext } from '../App';
import { useQuery } from '@tanstack/react-query';
export const MangaContext = createContext();

export const Manga = () => {
    const { data: mangas, refetch } = useQuery(['mangas'], () => {
        return Axios.get('http://localhost:8080/characters-api/manga').then((res) => res.data).catch((err) => console.log(err));
    });

    return (
        <div>
            <MangaContext.Provider value={{mangas, refetch}}>
                <MangaList />
                <MangaForm />
            </MangaContext.Provider>
        </div>
    );
}
