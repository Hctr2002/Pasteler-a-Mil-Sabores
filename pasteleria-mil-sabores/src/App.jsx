// src/App.jsx

import './App.css'
import Header from './components/Header';
import Footer from './components/Footer.jsx'; 
import Home from './components/Home';
import './App.css'; 

function App() {

  return (
    <>
      <Header />
       <main>
          <Home />
      </main>

      <Footer />
    
    </>
  );
}

export default App