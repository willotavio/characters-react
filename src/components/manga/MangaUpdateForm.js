import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const MangaUpdateForm = (props) => {
    const { selectedManga, updateManga } = props;

    const schema = yup.object().shape({
        name: yup.string().required("Enter the manga name"),
        releaseDate: yup.string().matches(/^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, "Choose the release date").required(),
        synopsis: yup.string().required("Enter a synopsis"),
        mangaStatus: yup.number().integer().min(1, "Choose a manga status").max(3, "Choose a manga status").required()
    });
    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        if(selectedManga.id){
            await updateManga(selectedManga.id, data);
            reset();
        }
    }
    useEffect(() => {
        setValue("name", selectedManga.name);
        setValue("releaseDate", selectedManga.releaseDate);
        setValue("synopsis", selectedManga.synopsis);
        setValue("mangaStatus", selectedManga.mangaStatus);
    }, [selectedManga]);

    return(
        <div>
            <p>Update</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" name="name" {...register("name")} placeholder='Name'></input>
                    <span>{errors.name?.message}</span>
                </div>
                <div>
                    <input type="date" name="releaseDate" {...register("releaseDate")} placeholder='Release Date'></input>
                    <span>{errors.releaseDate?.message}</span>
                </div>
                <div>
                    <input type="text" name="synopsis" {...register("synopsis")} placeholder='Synopsis'></input>
                    <span>{errors.synopsis?.message}</span>
                </div>
                <div>
                    <select {...register("mangaStatus")}>
                        <option value={0}>Select an option</option>
                        <option value={1}>On Going</option>
                        <option value={2}>Finished</option>
                        <option value={3}>Canceled</option>
                    </select>
                    <span>{errors.mangaStatus?.message}</span>
                </div>
                <div>
                    <input type="submit" value={"Submit"}></input>
                </div>
            </form>
        </div>
    );
    
}