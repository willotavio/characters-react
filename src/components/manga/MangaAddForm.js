import Axios from 'axios';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import '../../Global.css';
import { MangaContext } from './Manga';
export const MangaAddForm = () => {
    
    const {refetchMangas} = useContext(MangaContext);

    const createManga = async (manga) => {
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
    
    const schema = yup.object().shape({
        name: yup.string().required(),
        releaseDate: yup.string().matches(
            /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'Invalid date format. Use yyyy-MM-dd'
          ).required(),
        synopsis: yup.string().required(),
        mangaStatus: yup.number().integer().min(1).max(3).required()
    });
    const {register, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        await createManga(data);
        reset();
    }

    return(
        <div>
            <p>Add</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="name" {...register("name")} placeholder='Name'></input>
                <input type="date" name="releaseDate" {...register("releaseDate")} placeholder='Release Date'></input>
                <input type="text" name="synopsis" {...register("synopsis")} placeholder='Synopsis'></input>
                <input type="number" name="mangaStatus" {...register("mangaStatus")} placeholder='Status'></input>
                <input type="submit" value={"Submit"}></input>
            </form>
        </div>
    );
}