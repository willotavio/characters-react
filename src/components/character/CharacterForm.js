import Axios from 'axios';
import '../../Global.css';

export const CharacterForm = ({ handleCharacter, handleMangaSelect, characterAdd, mangas, updateCharacters }) => {

    const createCharacter = async () => {
        let { name, dateOfBirth, mangaId } = characterAdd;
        let newCharacter = {name, dateOfBirth, mangaId};
        newCharacter = JSON.stringify(newCharacter);
        try{
            await Axios.post('http://localhost:8080/characters-api/character', newCharacter, {headers: {'Content-Type': 'application/json'}});
            updateCharacters(newCharacter);
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <input type="text" name="name" value={characterAdd.name} onChange={handleCharacter}></input>
            <input type="text" name="dateOfBirth" value={characterAdd.dateOfBirth} onChange={handleCharacter}></input>
            <select value={characterAdd.mangaId} onChange={handleMangaSelect}>
                <option value="">Select an option</option>
                {mangas.map((manga) => (
                    <option key={manga.id} value={manga.id}>{manga.name}</option>
                ))}
            </select>
            <button onClick={createCharacter}>Submit</button>
        </div>
    );
}