import React, { useState } from 'react';
import './App.css';
import Headerbar from './Headerbar';
import Function from './Function';
import Footer from './Footer';


function App() {
  const [searchVal, setSearchVal]=useState("");
  const [isSale, setSaleRent]=useState();
  const headerSearch=(searchTerm,isSale)=>{
    setSearchVal(searchTerm);
    setSaleRent(isSale);
  }

  return (
    <div className="App">
      <Headerbar headerSearch={headerSearch}/>
      <div className='App-innerdiv'>
        <Function searchVal={searchVal} isSale={isSale}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
