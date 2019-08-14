import React from 'react';
import { Link } from 'react-router-dom';

export default ({ roomId }) => {


    return (
        <div>
            <Link to={`/room/book/${roomId}`}>
                <button className="ui primary button">
                    Book Now
                </button>
            </Link>
        </div>
    )
}