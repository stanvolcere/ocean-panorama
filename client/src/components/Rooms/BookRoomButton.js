import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id }) => {

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Link to={`/room/book/${id}`}>
                    <button className="ui primary button" style={{marginTop:"1rem"}}>
                        Book
                    </button>
                </Link>
            </div>
    )
}