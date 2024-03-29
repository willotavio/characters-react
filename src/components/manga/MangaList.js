import { useState, useContext } from 'react';
import '../../Global.css';
import { MangaContext } from './Manga';
export const MangaList = () => {

    const {mangas, editManga, deleteManga} = useContext(MangaContext);

    const [searchEntry, setSearchEntry] = useState("");
    
    const handleSearch = (event) => {
        setSearchEntry(event.target.value);
    }

    return(
        <div>
            <p>Get Mangas</p>

            <input type='text' onChange={handleSearch}></input>
            
            <div className='listDefault'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Release Date</th>
                            <th>Synopsis</th>
                            <th>Manga Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchEntry 
                        ? mangas.filter((manga) => (searchEntry.toLowerCase() === manga.name.toLowerCase()))
                            .map((manga) => (
                                <tr key={manga.id}>
                                    <td>{manga.id}</td>
                                    <td>{manga.name}</td>
                                    <td>{manga.releaseDate}</td>
                                    <td>{manga.synopsis}</td>
                                    <td>{manga.mangaStatus}</td>
                                    <td>
                                        <button onClick={() => editManga(manga.id)}>Edit</button>
                                        <button onClick={() => deleteManga(manga.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                                : mangas?.map((manga) => (
                                <tr key={manga.id}>
                                    <td>{manga.id}</td>
                                    <td>{manga.name}</td>
                                    <td>{manga.releaseDate}</td>
                                    <td>{manga.synopsis}</td>
                                    <td>{manga.mangaStatus}</td>
                                    <td>
                                        <button onClick={() => editManga(manga.id)}>Edit</button>
                                        <button onClick={() => deleteManga(manga.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}