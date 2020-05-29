import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { message, Button, Input, Divider } from 'antd';
import 'antd/dist/antd.css';
import { HeartOutlined } from '@ant-design/icons';
import api from "../api";
import Theme from "../components/Theme";
import MovieCard from "../components/MovieCard";
import Wishlist from './Wishlist';

function Movies() {
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [searchInputTimeout, setSearchAInputTimeout] = useState(0);

    const searchMovie = async (title) => {
        await fetch(
            `${api.URL}/?t=${title}&apikey=${api.KEY}`
        ).then(res => res.json())
            .then(async response => {
                console.info(response);
                if (response.Response === "False") {
                    message.warning('The movie is not found, please try again');
                }
                else {
                    const movie = {
                        imdbID: response.imdbID,
                        Title: response.Title,
                        Year: response.Year,
                        Rated: response.Rated,
                        Country: response.Country,
                        Poster: response.Poster,
                        like: false,
                    }
                    setMovie(movie);
                }
            })
            .catch(error => console.log(error));
        setLoading(false);
    }

    const onSearchChange = (event) => {
        setMovie(null);
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

    const addToWishlist = (movie) => {
        if (!wishlist.includes(movie)) {
            setWishlist([...wishlist, movie]);
            message.success(`${movie.Title} is added to wishlist`);
        }
        else {
            message.warn(`${movie.Title} has aleady been added`);
        }
    }
    const removeFromWishlist = (title) => {
        const newWishlist = wishlist.filter(movie => movie.Title !== title);
        setWishlist(newWishlist);
        message.success(`${movie.Title} is removed from wishlist`);
    }

    const toggleLike = (title) => {
        const newWishlist = wishlist.map(movie => {
            if (movie.Title === title) {
                movie.like = !movie.like;
            }
            return movie;
        }
        );
        setWishlist(newWishlist);
    }
    console.info(wishlist);
    return (
        <Theme>
            <Helmet>
                <title>Movies</title>
                <meta name="description" content="Movies" />
            </Helmet>
            <Button onClick={() => setModalShow(true)}><HeartOutlined />Wishlist</Button>
            <Wishlist modalShow={modalShow} setModalShow={setModalShow} wishlist={wishlist} removeFromWishlist={removeFromWishlist} toggleLike={toggleLike} />
            <Divider>Search a movie by name</Divider>
            <Input type="search" placeholder="search by movie title" onChange={onSearchChange} />
            <Divider />
            {!loading ?
                movie &&
                (
                    <MovieCard movie={movie} addToWishlist={addToWishlist} />
                )
                :
                <div>Loading...</div>
            }
        </Theme >
    );
}

export default Movies;