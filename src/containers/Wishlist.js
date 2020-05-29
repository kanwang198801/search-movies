import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import Theme from "../components/Theme";

function Wishlist(props) {
    return (
        <Theme>
            <Helmet>
                <title>Wishlist</title>
                <meta name="description" content="Stories" />
            </Helmet>
            <h1>Wishlist</h1>
        </Theme>
    );
}

export default Wishlist;