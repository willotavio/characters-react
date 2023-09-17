import Axios from 'axios';
import '../../Global.css';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CharacterContext } from './Character';

export const CharacterAddForm = () => {
    const {mangas, refetchCharacters} = useContext(CharacterContext);

    const createCharacter = async (character) => {
        let char = JSON.stringify(character);
        try{
            await Axios.post('http://localhost:8080/characters-api/character', char, {headers: {'Content-Type': 'application/json'}});
            refetchCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    const schema = yup.object().shape({
        name: yup.string().required(),
        dateOfBirth: yup.string().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid date format. Use MM-dd').required(),
        mangaId: yup.string().required()
    });
    const {register, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data) => {
        await createCharacter(data);
        reset();
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="name" {...register("name")} placeholder='Name'></input>
                <input type="text" name="dateOfBirth" {...register("dateOfBirth")} placeholder='Date of Birth'></input>
                <select {...register("mangaId")}>
                    <option value="">Select an option</option>
                    {mangas?.map((manga) => (
                        <option key={manga.id} value={manga.id}>{manga.name}</option>
                    ))}
                </select>
                <input type="submit" value={"Submit"}></input>    
            </form>
        </div>
    );
}