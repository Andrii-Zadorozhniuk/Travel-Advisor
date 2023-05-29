import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
    try{
        const {data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
    params: {
      bl_latitude: sw.lat,
      tr_latitude: ne.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
    },
    headers: {
      'X-RapidAPI-Key': 'd6f0f90bcbmsh45a78087b4e28c0p12dc4ejsnabb22dcd6057',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
        });
        return data;
    } catch(error) {
        console.error(error);
    }
}