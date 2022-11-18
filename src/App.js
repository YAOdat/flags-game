import './App.css';
import {useState, useEffect} from 'react';
import Quiz from './components/Quiz';
import Footer from './components/Footer';

function App() {
const [quizStart, setQuizStart] = useState(false);


// add a function to start the quiz
const startQuiz = () => {
    // set the state of the quiz to true
    setQuizStart(true);
}

  


  return (
    <div className="App">
      <h1 className= 'main-title'> Flags Game </h1>
      {/* if the quiz is not started, show the start button */}
      {!quizStart && <button className="start" onClick={startQuiz}>Start Game</button>}
      {/* if the quiz is started, show the quiz component */}
      {quizStart && <Quiz />}
      <Footer />
    </div>
    
 );

}

export default App;
