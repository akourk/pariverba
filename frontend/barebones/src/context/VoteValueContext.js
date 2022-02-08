import React, {createContext, useState} from 'react'

export const VoteValueContext = createContext()

const VoteValueContextProvider = props => {
    const [votes, setVotes] = useState([
        {title: '1', id: 1},
        {title: '-1', id: 2},
        {title: '0', id: 3}
    ]);

    return (
        <VoteValueContext.Provider value={{votes}}>
            {props.children}
        </VoteValueContext.Provider>
    )
};

export default VoteValueContextProvider;