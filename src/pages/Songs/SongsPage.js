import {useEffect, useState} from "react";
import axios from "axios";

function SongTable(){
    const [song,setSong]=useState([]);
    useEffect(()=>{
        const options={
            method:'GET',
            url:'https://theaudiodb.p.rapidapi.com/searchalbum.php',
            params:{s:'daft_punk'},
            headers:{
                'X-RapidAPI-Key':'0ec122f2bfmshd2c087346201dbbp1cfb6ajsn7c1a94d5d67b',
                'X-RapidAPI-Host':'theaudiodb.p.rapidapi.com'
            }
        };
        axios.request(options).then(function(response){
            setSong(response.data.album)
            console.log("inside song",response.data)
        }).catch(function(err){
            console.log(err)
        })
    },[])
    return(
        <>
            <table>
                <thead>
                <tr>
                    <th>Album</th>
                    <th>Artist</th>
                    <th>Year</th>
                </tr>
                </thead>
                <tbody>
                {song.map((song) => (
                    <tr key={song.idAlbum}>
                        <td>{song.strAlbum}</td>
                        <td>{song.strArtist}</td>
                        <td>{song.intYearReleased}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    )
}
export default SongTable;