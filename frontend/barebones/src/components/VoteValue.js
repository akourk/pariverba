import React, {useContext} from 'react'
import { VoteValueContext } from '../context/VoteValueContext'
import Vote from './Vote'

const VoteValue = () => {
    const {votes} = useContext(VoteValueContext)
    return (
    <div>
        <ul>
            {votes.map((vote) => {
                return <Vote vote={vote} key={vote.id}/>
            })}
        </ul>
    </div>
    );
}

export default VoteValue