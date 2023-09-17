import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const MangaUpdateForm = (props) => {
    const { selectedManga, updateManga } = props;

    const schema = yup.object().shape({
        name: yup.string().required(),
        releaseDate: yup.string().matches(
            /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'Invalid date format. Use yyyy-MM-dd'
          ).required(),
        synopsis: yup.string().required(),
        mangaStatus: yup.number().integer().min(1).max(3).required()
    });
    const {register, handleSubmit, reset, setValue} = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        setValue("name", selectedManga.name);
        setValue("releaseDate", selectedManga.releaseDate);
        setValue("synopsis", selectedManga.synopsis);
        setValue("mangaStatus", selectedManga.mangaStatus);
    }, [selectedManga])
    const onSubmit = async (data) => {
        await updateManga(selectedManga.id, data);
        reset();
    }

    return(
        <div>
            <p>Update</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="name" {...register("name")} placeholder='Name'></input>
                <input type="date" name="releaseDate" {...register("releaseDate")} placeholder='Release Date'></input>
                <input type="text" name="synopsis" {...register("synopsis")} placeholder='Synopsis'></input>
                <input type="number" name="mangaStatus" {...register("mangaStatus")} placeholder='Status'></input>
                <input type="submit" value={"Update"}></input>
            </form>
        </div>
    );
    
}