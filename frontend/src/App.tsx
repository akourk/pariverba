import './App.css';
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from 'redux';
import { actionCreators, State } from './state';

function App() {

  const dispatch = useDispatch();
  

  const { upvote, downvote, clearvote } = bindActionCreators(actionCreators, dispatch)
  const amount = useSelector((state: State) => state.voteCount)
 
  return (
    <div className="App">
      <h1>{amount}</h1>
      <button onClick={() => upvote(1)}>Upvote</button>
      <button onClick={() => downvote(1)}>Downvote</button>
      <button onClick={() => clearvote()}>Clearvote</button>
    </div>
  );
}

export default App;
