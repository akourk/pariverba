import React from 'react'
import VoteValue from './VoteValue';
import VoteValueContextProvider from '../context/VoteValueContext';
import '../App.css';

const App = () => {
    return (
        <VoteValueContextProvider>
            <div>
                <div>
                    <VoteValue />
                </div>
            </div>
        </VoteValueContextProvider>
    );
};

export default App