import setup from '../setup.conf.json'
export const BASE_API_URL = setup.BASE_API_URL || 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8001/';
export const STADSDEEL_URL = setup.STADSDEEL_URL || 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/';
export const GOOGLE_API_KEY = setup.GOOGLE_API_KEY || `AIzaSyCfNcCeUdFot9u2kuwzO9HsGaPwg5D0s54`
export const CREATE_REPORT_URL = `${BASE_API_URL}private/signals/`;
export const GOOGLE_GEOCODING_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&latlng=`;
export const STADSDEEL_ENDPOINT = `${STADSDEEL_URL}signals/v1/private/get_stadsdeel`;
export const GEOCODE_SERVICE_ENDPOINT =  'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json';



