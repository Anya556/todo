import './App.css';
import Home from './Components/Home';
import Todo from './Components/To-do';
import {Routes, Route}  from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path ="/todo" element ={<Todo />} />
      </Routes>
 
    </div>
  );
}

export default App;
