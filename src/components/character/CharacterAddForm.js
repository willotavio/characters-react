import '../../Global.css';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CharacterContext } from './Character';

export const CharacterAddForm = () => {
    const {mangas, addCharacter} = useContext(CharacterContext);

    const schema = yup.object().shape({
        name: yup.string().required("Enter the character name"),
        dateOfBirth: yup.string().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, "Enter a valid date (MM-dd)").required("Enter a valid date (MM-dd)"),
        mangaId: yup.string().required("Choose a manga")
    });
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data) => {
        await addCharacter(data);
        reset();
    }

    return(
        <div>
            <p>Add</p>
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