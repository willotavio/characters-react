import { useState } from 'react';
import '../../Global.css';
export const MangaList = ({ mangas }) => {

    const [searchEntry, setSearchEntry] = useState("");
    
    const handleSearch = (event) => {
        setSearchEntry(event.target.value);
    }

    return(
        <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {searchEntry 
                        ? mangas.filter((mangas) => (searchEntry.toLowerCase() === mangas.name.toLowerCase()))
                            .map((manga) => (
                                <tr>
                                    <td key={manga.id}>{manga.id}</td>
                                    <td>{manga.name}</td>
                                    <td>{manga.releaseDate}</td>
                                    <td>{manga.synopsis}</td>
                                    <td>{manga.mangaStatus}</td>
                                </tr>
                            ))
                                : mangas.map((manga) => (
                                <tr>
                                    <td key={manga.id}>{manga.id}</td>
                                    <td>{manga.name}</td>
                                    <td>{manga.releaseDate}</td>
                                    <td>{manga.synopsis}</td>
                                    <td>{manga.mangaStatus}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}