import { useContext, useEffect } from "react";
import { CharacterContext } from "./Character";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const CharacterUpdateForm = (props) => {
    const {mangas} = useContext(CharacterContext);
    const {selectedCharacter, updateCharacter} = props;

    const schema = yup.object().shape({
        name: yup.string().required("Enter the character name"),
        dateOfBirth: yup.string().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, "Enter a valid date (MM-dd)").required("Enter a valid date (MM-dd)"),
        mangaId: yup.string().required("Choose a manga")
    });
    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        if(selectedCharacter.id){
            await updateCharacter(selectedCharacter.id, data);
            reset();
        }
    }
    useEffect(() => {
        setValue("name", selectedCharacter.name);
        setValue("dateOfBirth", selectedCharacter.dateOfBirth);
        setValue("mangaId", selectedCharacter.mangaId);
    }, [selectedCharacter]);

    return(
        <div>
            <p>Update</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" name="name" {...register("name")} placeholder='Name'></input>
                    <span>{errors.name?.message}</span>
                </div>
                <div>
                    <input type="text" name="dateOfBirth" {...register("dateOfBirth")} placeholder='Date of Birth'></input>
                    <span>{errors.dateOfBirth?.message}</span>
                </div>
                <div>
                    <select {...register("mangaId")}>
                        <option value="">Select an option</option>
                        {mangas?.map((manga) => (
                            <option key={manga.id} value={manga.id}>{manga.name}</option>
                        ))}
                    </select>
                    <span>{errors.mangaId?.message}</span>
                </div>
                <div>
                    <input type="submit" value={"Submit"}></input>
                </div>
            </form>
        </div>
    );
}