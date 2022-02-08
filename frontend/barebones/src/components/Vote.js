import React from 'react'

const Vote = ({vote}) => {
    return (
        <li>
            <span>{vote.title}</span>
            <span>vote title</span>
            <div>
                <button>upvotebutton?</button>
                <button>downvotebutton?</button>
                <button>clearvotebutton?</button>
            </div>
        </li>
    );
};

export default Vote;