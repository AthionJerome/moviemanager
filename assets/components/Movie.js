import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "./Layout"
import axios from 'axios';
  
function Movie() {
    const [id, setId] = useState(useParams().id)
    const [movie, setMovie] = useState({title:'', description:'', releaseDate: 'N/A'})
    useEffect(() => {
        axios.get(`/api/movies/${id}`)
        .then(function (response) {
          setMovie(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
            <div className="containerMovie">
                <h2>Détail du film</h2>
                <Link to="/"> Voir tous les films</Link>
                <div className="card">
                    <div className="card-body">
                        <label>Titre : </label>
                        <p>{movie.title}</p>
                        <label>Description du film : </label>
                        <p>{movie.description}</p>
                        <label>Date de sortie : </label><p>{movie.releaseDate}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default Movie;