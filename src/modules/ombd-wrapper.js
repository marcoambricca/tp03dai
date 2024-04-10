import axios from "axios";

const APIKEY = "e57222f5";
const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const apiResponse = await axios.get(requestString);
    returnObject.respuesta = apiResponse.statusText;
    returnObject.datos = apiResponse.data;
    console.log(returnObject.datos);
    return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };
    const requestString = `http://www.ombdapi.com/?apikey=${APIKEY}&s=${searchText}`;
    const apiResponse = await axios.get(requestString);
    returnObject.respuesta = apiResponse.statusText;
    returnObject.datos = apiResponse.data;
    return returnObject;
};
const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };
    const requestString = `http://www.ombdapi.com/?apikey=${APIKEY}&i=${imdbID}`;
    const apiResponse = axios.get(requestString);
    returnObject.respuesta = apiResponse.statusText;
    returnObject.datos = apiResponse.data;
    return returnObject;
};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};