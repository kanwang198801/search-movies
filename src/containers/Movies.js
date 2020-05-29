import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { message, Button, Input, Card, Divider } from 'antd';
import 'antd/dist/antd.css';
import { LikeOutlined } from '@ant-design/icons';
import api from "../api";
import Theme from "../components/Theme";
import MovieCard from "../components/MovieCard";

function Movies() {
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const [searchInputTimeout, setSearchAInputTimeout] = useState(0);

    const searchMovie = async (title) => {
        await fetch(
            `${api.URL}/?t=${title}&apikey=${api.KEY}`
        ).then(res => res.json())
            .then(async response => {
                console.info(response);
                if (response.Response === "False") {
                    message.warning('Not found, please try again');
                    setMovie(null);
                }
                else {
                    const movie = {
                        imdbID: response.imdbID,
                        Title: response.Title,
                        Year: response.Year,
                        Rated: response.Rated,
                        Country: response.Country,
                        Poster: response.Poster,
                    }
                    setMovie(movie);
                }
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
            searchMovie(value);
            setLoading(false);
        }, 1500));
    }


    return (
        <Theme>
            <Helmet>
                <title>Moviews</title>
                <meta name="description" content="Moviews" />
            </Helmet>
            <h1>Search a movie by title</h1>
            <Input type="search" placeholder="search by movie title" onChange={onSearchChange} />
            <Divider />
            {!loading ?
                movie &&
                (
                    <MovieCard movie={movie} />
                )
                :
                <div>Loading...</div>
            }
        </Theme >
    );
}

export default Movies;