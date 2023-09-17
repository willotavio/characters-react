import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "./Character";

export const CharacterUpdateForm = (props) => {
    const {mangas} = useContext(CharacterContext);
    const {selectedCharacter, setSelectedCharacter, updateCharacter} = props;
    
    const [character, setCharacter] = useState({name: "", dateOfBirth: "", mangaId: ""});
    useEffect(() => {
        if(selectedCharacter){
            setCharacter({
                name: selectedCharacter.name || "",
                dateOfBirth: selectedCharacter.dateOfBirth || "",
                mangaId: selectedCharacter.mangaId || ""
            });
        }
    }, [selectedCharacter]);
    const handleCharacter = (event) => {
        const {name, value} = event.target;
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
        }));
    }
    const handleMangaSelect = (event) => {
        const mangaId = event.target.value;
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            mangaId: mangaId,
        }));
    }

    const clearInputs = () => {
        setCharacter({
            name: "",
            dateOfBirth: "",
            mangaId: ""
        });
    }

    return(
        <div>
            <input type="text" name="name" value={character.name} onChange={handleCharacter}></input>
            <input type="text" name="dateOfBirth" value={character.dateOfBirth} onChange={handleCharacter}></input>
            <select value={character.mangaId} onChange={handleMangaSelect}>
                <option value="">Select an option</option>
                {mangas?.map((manga) => (
                    <option key={manga.id} value={manga.id}>{manga.name}</option>
                ))}
            </select>
            <button onClick={() => {updateCharacter(selectedCharacter.id, character); clearInputs()}}>Update</button>
        </div>
    );
}