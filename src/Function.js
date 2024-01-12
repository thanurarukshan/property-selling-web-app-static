import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LocationMap from './LocationMap';


import './Function.css';
import jsonData from './properties.json';

var time=-1;

const Function = ({searchVal,isSale}) => {



  
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // for popup event


  

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
    setCurrentImageIndex(0);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  

  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState(false);

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearchVisible(!isAdvancedSearchVisible);
  };

  const [searchId, setSearchId] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minAddedDate, setMinAddedDate] = useState('');
  const [maxAddedDate, setMaxAddedDate] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [type, setType] = useState('');
  const [postcodeArea, setPostcodeArea] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    setFilteredData(jsonData.properties);
    if (time>=1){
    headerSearch();
    }
    return () => {
      time+=1;
    };
    
  },[isSale]);
  
  const headerSearch = () => {
    var filteredResults = jsonData.properties.filter(item =>
      (!searchVal|| item.id.toLowerCase().includes(searchVal.toLowerCase())) ||
      (!searchVal|| item.location.toLowerCase().includes(searchVal.toLowerCase())))
    if (isSale==1){
      filteredResults = filteredResults.filter(item=>
        (item.tenure.toLowerCase().includes('Freehold'.toLowerCase()))
        )
    }else{
      filteredResults = filteredResults.filter(item=>
        (item.tenure.toLowerCase().includes('Leasehold'.toLowerCase()))
        )
    }
    setFilteredData(filteredResults);
  };


  var isFav=0;
  const handleSearch = () => {
    const filteredResults = jsonData.properties.filter(item =>
      item.id.toLowerCase().includes(searchId.toLowerCase()) &&
      (!minPrice || item.price >= parseInt(minPrice, 10)) &&
      (!maxPrice || item.price <= parseInt(maxPrice, 10)) &&
      (!minAddedDate || new Date(item.added.year, getMonthIndex(item.added.month), item.added.day) >= new Date(minAddedDate)) &&
      (!maxAddedDate || new Date(item.added.year, getMonthIndex(item.added.month), item.added.day) <= new Date(maxAddedDate)) &&
      (!minBedrooms || item.bedrooms >= parseInt(minBedrooms, 10)) &&
      (!maxBedrooms || item.bedrooms <= parseInt(maxBedrooms, 10)) &&
      (!type || item.type.toLowerCase().includes(type.toLowerCase())) &&
      (!postcodeArea || item.location.toLowerCase().includes(postcodeArea.toLowerCase()))
    );
    setFilteredData(filteredResults);
  };


  const handleToggleFavorite = (item) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== item.id);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, item]);
    }
  };
  
  const clearFav=()=>{
    setFavorites([]);
  }
  const turnOnFavorite = (item) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    if (!isFavorite) {
      setFavorites([...favorites, item]);
    }
  };

  const turnOffFavorite = (item) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== item.id);
      setFavorites(updatedFavorites);
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item.id);
    isFav=0;
  };

  const handleDragStartFav = (e, item) => {
    e.dataTransfer.setData('text/plain', item.id);
    isFav=1;
  };

  const handleDropFav = (e) => {
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const draggedItem = filteredData.find(item => item.id === draggedItemId);
    if (draggedItem) {
      turnOnFavorite(draggedItem);
    }
  };

  const handleDrop = (e) => {
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const draggedItem = filteredData.find(item => item.id === draggedItemId);
    if (isFav==1){
      if (draggedItem) {
        turnOffFavorite(draggedItem);
      }
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };
  
  const handleNext = (imagesData) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBack = (imagesData) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1
    );
  };

  const getMonthIndex = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(month);
  };

  return (
    <div className='function-main' onDragOver={allowDrop} onDrop={handleDrop}>
      <button onClick={toggleAdvancedSearch} className='function-main-button'>Advanced Search</button>
      {isAdvancedSearchVisible && (
      <div className='advancedSearchContent'>
        <div>
          <label>
            Search by ID:
            <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Minimum Price:
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          </label>
          <label>
            Maximum Price:
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Minimum Added Date:
            <input type="date" value={minAddedDate} onChange={(e) => setMinAddedDate(e.target.value)} />
          </label>
          <label>
            Maximum Added Date:
            <input type="date" value={maxAddedDate} onChange={(e) => setMaxAddedDate(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Minimum Bedrooms:
            <input type="number" value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} />
          </label>
          <label>
            Maximum Bedrooms:
            <input type="number" value={maxBedrooms} onChange={(e) => setMaxBedrooms(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)} >
              <option value="">any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </label>
          <label>
            Postcode Area:
            <input type="text" value={postcodeArea} onChange={(e) => setPostcodeArea(e.target.value)} />
          </label>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      )}
      <div className='searchResAndFavItems'>
      <div
        className='outerBoarder' 
        onDrop={handleDrop}
        onDragOver={allowDrop}
        style={{ borderRadius:'20px', border: '2px solid black', padding: '20px', marginTop: '20px' }}>
        <h2>Search Results</h2>
        <ul className='tileSet'>
          {filteredData.map(item => (
            <li className='itemTile' key={item.id} onDragStart={(e) => handleDragStart(e, item)} draggable>
              <img onClick={() => handleClickOpen(item)} variant="outlined" className='itemTileImage' src={item.picture} alt={`Image for ${item.id}`} style={{ width: '200px', maxHeight: '150px', margin:'auto' }} />
              <strong>ID: {item.id}</strong> 
              <strong>Type: {item.type}</strong>
              <strong>Price: ${item.price}</strong>
              <strong>Bedrooms: {item.bedrooms}</strong>
              <strong>Date Added: {`${item.added.month} ${item.added.day}, ${item.added.year}`}</strong>
              <strong>Postcode Area: {item.location}</strong>
              <strong>Tenure: {item.tenure}</strong> 
              <button className='itemTileButton' onClick={() => handleToggleFavorite(item)}>
                {favorites.some(fav => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className='outerBoarder' 
        onDrop={handleDropFav}
        onDragOver={allowDrop}
        style={{ borderRadius:'20px', border: '2px solid black', padding: '20px', marginTop: '20px'}}
      >
        <h2>Favorite Items</h2>
        <button className='FavClearButton' onClick={clearFav}>Clear</button>
        <ul className='tileSet'>
          {favorites.map(item => (
            <li className='itemTile' key={item.id} onDragStart={(e) => handleDragStartFav(e, item)} draggable>
              <img onClick={() => handleClickOpen(item)} variant="outlined" className='itemTileImage' src={item.picture} alt={`Image for ${item.id}`} style={{ width: '200px', maxHeight: '150px', margin:'auto' }} />
              <strong>ID: {item.id}</strong> 
              <strong>Type: {item.type}</strong>
              <strong>Price: ${item.price}</strong>
              <strong>Bedrooms: {item.bedrooms}</strong>
              <strong>Date Added: {`${item.added.month} ${item.added.day}, ${item.added.year}`}</strong>
              <strong>Postcode Area: {item.location}</strong>
              <strong>Tenure: {item.tenure}</strong> 
              <button className='itemTileButton' onClick={() => handleToggleFavorite(item)}>
                {favorites.some(fav => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </li>
          
          ))}
        </ul>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Item Details</DialogTitle>
        <DialogContent dividers>
          {selectedItem && (
            <div className='itemTile itemTile2' >
              <div style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
                {
                <div className="imageSlider">
                  <button className='sliderbutton' onClick={()=>handleBack(selectedItem.pictures)}>{'<'}</button>
                  <img style={{ width: '200px', height: '150px', margin: 'auto' }} className='sliderImg' src={selectedItem.pictures[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
                  
                  <button className='sliderbutton' onClick={()=>handleNext(selectedItem.pictures)}>{'>'}</button>
                </div>
                }
              </div>
              <strong>ID: {selectedItem.id}</strong>
              <strong>Type: {selectedItem.type}</strong>
              <strong>Price: ${selectedItem.price}</strong>
              <strong>Bedrooms: {selectedItem.bedrooms}</strong>
              <strong>Date Added: {`${selectedItem.added.month} ${selectedItem.added.day}, ${selectedItem.added.year}`}</strong>
              <strong>Postcode Area: {selectedItem.location}</strong>
              <strong>Tenure: {selectedItem.tenure}</strong>
              <strong>Location: {selectedItem.location}</strong>
              <strong>Description:</strong>
              <span>{selectedItem.description}</span>
              <LocationMap location={selectedItem.locationparams} />
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default Function;