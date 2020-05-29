import React from 'react';
import { Modal, Row, Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';
import MovieCard from "../components/MovieCard";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const grid = 2;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "transparent",
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'transparent',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

function Wishlist({ wishlist, setWishlist, modalShow, setModalShow, removeFromWishlist, toggleLike }) {
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const newWishlist = reorder(
            wishlist,
            result.source.index,
            result.destination.index
        );

        setWishlist(newWishlist);
    }
    return (
        <Modal
            title="Wishlist"
            visible={modalShow}
            footer={null}
            onOk={() => setModalShow(false)}
            onCancel={() => setModalShow(false)}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        > <Row gutter={16} align="middle">
                                {wishlist.map((movie, index) => (
                                    <Draggable key={movie.imdbID} draggableId={movie.imdbID} index={index}>
                                        {(provided, snapshot) => (
                                            <Col className="gutter-row" xs={24} key={movie.imdbID}>
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <MovieCard movie={movie} removeFromWishlist={removeFromWishlist} toggleLike={toggleLike} />
                                                </div>
                                            </Col>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Row>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
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
        Poster: PropTypes.string.isRequired,
        like: PropTypes.bool.isRequired,
    })).isRequired,
    setModalShow: PropTypes.func.isRequired,
    setWishlist: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired,
    toggleLike: PropTypes.func.isRequired,
};