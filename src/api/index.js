import axios from 'axios';
import configuration from "../shared/configuration/configuration";
import {CREATE_REPORT_URL, GOOGLE_GEOCODING_URL, STADSDEEL_ENDPOINT} from "../config/config";

const result = {
        "address_components": [
            {
                "long_name": "1",
                "short_name": "1",
                "types": [
                    "street_number"
                ]
            },
            {
                "long_name": "Bezuidenhoutseweg",
                "short_name": "Bezuidenhoutseweg",
                "types": [
                    "route"
                ]
            },
            {
                "long_name": "Centrum",
                "short_name": "Centrum",
                "types": [
                    "political",
                    "sublocality",
                    "sublocality_level_1"
                ]
            },
            {
                "long_name": "Den Haag",
                "short_name": "Den Haag",
                "types": [
                    "locality",
                    "political"
                ]
            },
            {
                "long_name": "Den Haag",
                "short_name": "Den Haag",
                "types": [
                    "administrative_area_level_2",
                    "political"
                ]
            },
            {
                "long_name": "Zuid-Holland",
                "short_name": "ZH",
                "types": [
                    "administrative_area_level_1",
                    "political"
                ]
            },
            {
                "long_name": "Netherlands",
                "short_name": "NL",
                "types": [
                    "country",
                    "political"
                ]
            },
            {
                "long_name": "2514 AN",
                "short_name": "2514 AN",
                "types": [
                    "postal_code"
                ]
            }
        ],
        "formatted_address": "Bezuidenhoutseweg 1, 2514 AN Den Haag, Netherlands",
        "geometry": {
            "location": {
                "lat": 52.08129959999999,
                "lng": 4.3207354
            },
            "location_type": "ROOFTOP",
            "viewport": {
                "northeast": {
                    "lat": 52.08264858029149,
                    "lng": 4.322084380291503
                },
                "southwest": {
                    "lat": 52.0799506197085,
                    "lng": 4.319386419708498
                }
            }
        },
        "place_id": "ChIJ5QUcWT23xUcRfVWfeeV83zw",
        "plus_code": {
            "compound_code": "38JC+G7 The Hague, Netherlands",
            "global_code": "9F4638JC+G7"
        },
        "types": [
            "street_address"
        ]
    };


const getAddressComponent = (input, type) => {
    let addressComponent = input.address_components.find(component => component.types.includes(type));
    return addressComponent?.long_name ;
}

export const createSignal = async (payload) => {
    return await axios.post(CREATE_REPORT_URL, payload);
}

export const getStadsdeel = async (postcode, huisnummer) => {
    const res = await axios.post(`${STADSDEEL_ENDPOINT}`, {postcode, huisnummer});
    console.group("STADSDEEL", res.data);
    return await res.data;
}


export const getGeocodeResponse = async (lat,long) => {
    const res = await axios.get(`${GOOGLE_GEOCODING_URL}${lat},${long}`);
    console.log("GOOGLE RESPONSE", res.data)
    const results = res.data.results;

    if(results.length === 0) {
        return null;
    }else{
        const streetNumber = getAddressComponent(results[0], 'street_number');
        const postalCode = getAddressComponent(results[0], 'postal_code');
        return ({streetNumber, postalCode})
    }
}

