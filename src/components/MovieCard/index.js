
import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { LikeOutlined, DeleteOutlined, HeartTwoTone } from '@ant-design/icons';
const { Meta } = Card;
function MovieCard({ movie, addToWishlist, removeFromWishlist, toggleLike }) {
    return (
        <Card
            style={{ width: '100%', maxWidth: 300, margin: '10px auto' }}
            cover={
                movie.Poster !== "N/A" &&
                <img
                    alt="movie"
                    src={movie.Poster}
                />
            }
            actions={
                removeFromWishlist ?
                    movie.like ?
                        [
                            <DeleteOutlined onClick={() => removeFromWishlist(movie.Title)} />
                            ,
                            <HeartTwoTone onClick={() => toggleLike(movie.Title)} twoToneColor="#eb2f96" />
                        ] :
                        [
                            <DeleteOutlined onClick={() => removeFromWishlist(movie.Title)} />
                            ,
                            <HeartTwoTone onClick={() => toggleLike(movie.Title)} />
                        ]

                    : [
                        <Button key="addWishlist" onClick={() => addToWishlist(movie)} >Add to wishlist</Button>,
                    ]
            }
        ><div>
                <Meta
                    title={movie.Title}
                />
                <br />
                YEAR - {movie.Year}<br />
                Rated - {movie.Rated}<br />
                Country - {movie.Country}<br />
            </div>
        </Card>
    );
}
export default MovieCard;

MovieCard.propTypes = {
    movie: PropTypes.shape({
        imdbID: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Rated: PropTypes.string.isRequired,
        Country: PropTypes.string.isRequired,
        Poster: PropTypes.string.isRequired,
        like: PropTypes.bool.isRequired,
    }).isRequired,
    addToWishlist: PropTypes.func,
    removeFromWishlist: PropTypes.func,
    toggleLike: PropTypes.func,
};