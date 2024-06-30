/*import React, {useState, useEffect} from 'react';
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
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Détail du film</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/"> Voir tous les films
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Title:</b>
                        <p>{movie.title}</p>
                        <b className="text-muted">Description:</b>
                        <p>{movie.description}</p>
                        <b className="text-muted">Date de sortie:</b>
                        <p>{movie.releaseDate}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default Movie;*/