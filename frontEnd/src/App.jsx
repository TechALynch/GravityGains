import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import './App.css';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div id="light">
      {/* {isLoggedIn && <Header />} */}
      {/* <Header />  */}
      <Main />
    </div>
  );
}

export default App;
