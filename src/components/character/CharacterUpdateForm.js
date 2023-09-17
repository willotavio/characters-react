import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "./Character";
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const CharacterUpdateForm = (props) => {
    const {mangas} = useContext(CharacterContext);
    const {selectedCharacter, updateCharacter} = props;

    const schema = yup.object().shape({
        name: yup.string().required(),
        dateOfBirth: yup.string().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid date format. Use MM-dd').required(),
        mangaId: yup.string().uuid().required()
    });
    const {register, handleSubmit, reset, setValue, control} = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        setValue("name", selectedCharacter.name);
        setValue("dateOfBirth", selectedCharacter.dateOfBirth);
        setValue("mangaId", selectedCharacter.mangaId);
    }, [selectedCharacter]);
    const onSubmit = async (data) => {
        if(selectedCharacter.id){
            await updateCharacter(selectedCharacter.id, data);
            reset();
        }
    }

    return(
        <div>
            <p>Update</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="name" {...register("name")} placeholder="Name"></input>
                <input type="text" name="dateOfBirth" {...register("dateOfBirth")} placeholder="Date of Birth"></input>
                <Controller 
                    name="mangaId"
                    control={control}
                    render={({ field }) => (
                        <select {...field}>
                            <option value={""}>Select an option</option>
                            {mangas?.map((manga) => (
                                <option key={manga.id} value={manga.id}>
                                    {manga.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                <input type="submit" value={"Update"}></input>
                
            </form>
            
        </div>
    );
}