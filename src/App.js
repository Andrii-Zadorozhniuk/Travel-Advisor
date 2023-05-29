
import './App.css';

import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
          setCoordinates({lat: latitude, lng: longitude})
      }
    )
  }, []);
  useEffect(() => {
    if (bounds) {
    setIsLoading(true)
    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setFilteredPlaces([]);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setIsLoading(false)
      } )
    }
  }, [type, coordinates, bounds])
  return (
    <>
      <CssBaseline />
      <Header  setCoordinates={setCoordinates}/>
      <Grid container style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places} 
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}/>
          </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
        /></Grid>
        
      </Grid>
    </>
  );
}

export default App;
