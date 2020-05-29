import React from 'react';
import { Modal, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import MovieCard from "../components/MovieCard";

function Wishlist({ wishlist, modalShow, setModalShow, removeFromWishlist }) {
    return (
        <Modal
            title="Wishlist"
            visible={modalShow}
            onOk={() => setModalShow(false)}
            onCancel={() => setModalShow(false)}
        >
            {wishlist.length > 0
                ? <Row gutter={16} align="middle">{wishlist.map(movie => (
                    <Col className="gutter-row" xs={24} md={12}>
                        <MovieCard movie={movie} removeFromWishlist={removeFromWishlist} />
                    </Col>
                ))}</Row> : <p>Your wishlist is empty</p>
            }
        </Modal>

    );
}

export default Wishlist;
Wishlist.propTypes = {
    wishlist: PropTypes.arrayOf(PropTypes.shape({
        imdbID: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Rated: PropTypes.string.isRequired,
        Country: PropTypes.string.isRequired,
        Poster: PropTypes.string,
    })).isRequired,
    setModalShow: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired,
};