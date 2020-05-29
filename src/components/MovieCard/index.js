
import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const { Meta } = Card;
function MovieCard({ movie }) {
    return (
        <Card
            style={{ width: 300 }}
            cover={
                movie.Poster !== "N/A" &&
                <img
                    alt="movie"
                    src={movie.Poster}
                />
            }
            actions={[
                <LikeOutlined key="wishlist" />,
            ]}
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
        Poster: PropTypes.string,
    }).isRequired,
};