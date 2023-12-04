import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Add any logic to check the user's login status and update isLoggedIn accordingly

  return (
    <div id="light">
      {isLoggedIn && <Header />}
      <Main />
    </div>
  );
}

export default App;




























// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>GravityGains</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           PushUps {count}
//         </button>
//         <p>
//           Project Capstone Start...
//         </p>
//         <p>
//           Welcome to GravityGains, your ultimate companion for the journey to mastering calisthenics!!!
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Anthony Lynch
//       </p>
//     </>
//   )
// }

// export default App
