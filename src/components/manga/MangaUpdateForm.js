import { useEffect, useState } from 'react';

export const MangaUpdateForm = (props) => {
    const { selectedManga, setSelectedManga, updateManga } = props;
    const [manga, setManga] = useState({name: "", releaseDate: "", synopsis: "", mangaStatus: ""});
    
    useEffect(() => {
        if(selectedManga){
            setManga({
                name: selectedManga.name || "",
                releaseDate: selectedManga.releaseDate || "",
                synopsis: selectedManga.synopsis || "",
                mangaStatus: selectedManga.mangaStatus || ""
            })
        }
    }, [selectedManga]);

    const handleManga = (event) => {
        const { name, value } = event.target;
        setManga((prevManga) => ({
            ...prevManga,
            [name]: value,
        }));
    }

    const clearInputs = () => {
        setManga({
            name: "",
            releaseDate: "",
            synopsis: "",
            mangaStatus: ""
        });
    }
    return(
        <div>
            <p>Update</p>
            <input type="text" name="name" value={manga.name} onChange={handleManga}></input>
            <input type="date" name="releaseDate" value={manga.releaseDate} onChange={handleManga}></input>
            <input type="text" name="synopsis" value={manga.synopsis} onChange={handleManga}></input>
            <input type="number" name="mangaStatus" value={manga.mangaStatus} onChange={handleManga}></input>
            <button onClick={() => {updateManga(selectedManga.id, manga); clearInputs()}}>Update</button>
        </div>
    );
    
}