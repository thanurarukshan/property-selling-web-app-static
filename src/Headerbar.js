import React, {useState} from 'react';
import './Headerbar.css';

function Headerbar({headerSearch}) {
  const [inputValue, setInputValue] = useState('');

  const handleClickSale = () =>{

    headerSearch(inputValue,1)
  }
  const handleClickRent = () =>{
    headerSearch(inputValue,0)
  }

  return (
    <div className='main'>
        <div className='headerbar-main'>
            <img className='logo-headerbar' src='https://png.pngtree.com/png-clipart/20230426/original/pngtree-school-logo-design-template-png-image_9104626.png'/>
            <h2>.Your Home Finder.</h2>
            <div className='headerbar-main-searchbox'>
                <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} type="text" className='headerbar-main-searchbox-component' placeholder='Location or Postcode...'/>
                    <div className="search-buttonset">
                        <button onClick={handleClickSale}>for sale</button>
                        <button onClick={handleClickRent}>to rent</button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Headerbar;