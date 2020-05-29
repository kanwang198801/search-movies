import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import api from "../api";
import Theme from "../components/Theme";


function Movies(props) {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchInputTimeout, setSearchAInputTimeout] = useState(0);

    const searchMovies = async (title) => {
        await fetch(
            `${api.URL}/?t=${title}&apikey=${api.KEY}`
        ).then(res => res.json())
            .then(async response => {
                setMovies(response);
                console.info(response);
            })
            .catch(error => console.log(error));
        setLoading(false);
    }


    const onSearchChange = (event) => {
        setLoading(true);
        const { value } = event.target;
        if (searchInputTimeout) {
            clearTimeout(searchInputTimeout);
        }
        setSearchAInputTimeout(setTimeout(() => {
            searchMovies(value);
            setLoading(false);
        }, 1500));
    }


    return (
        <Theme>
            <Helmet>
                <title>Stories</title>
                <meta name="description" content="Stories" />
            </Helmet>
            <input type="search" placeholder="search by movie title" onChange={onSearchChange} />
            {!loading ?
                movies.length > 0 &&
                (
                    <>
                        <h1>Search result</h1>

                    </>
                )
                :
                <div>Loading...</div>}
        </Theme>
    );
}

export default Movies;