import React, {useEffect, useRef, useState} from 'react';
import {loadModules, setDefaultOptions} from 'esri-loader';
import PropTypes from 'prop-types';
import configuration from "../shared/configuration/configuration";
import {getGeocodeResponse} from "../api";
import {GEOCODE_SERVICE_ENDPOINT} from "../config/config";

setDefaultOptions({css: true});

const simpleMarkerSymbol = {
    type: 'picture-marker',
    url: '/webform/assets/location.png',
    // path change as we deployed to /webform
    // url: '/assets/location.png',
    width: '21px',
    height: '30px',
};

export const WebMapView = ({data, onChange, isShowPopup = false, isStatic = false, getStadsdeel, initialLocation, className}) => {
    const mapRef = useRef();

    const [view, setView] = useState(null);
    const [search, setSearch] = useState(null);
    const [graphicsLayer, setGraphicsLayer] = useState(null);


    useEffect(() => {

        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(
            [
                'esri/Map',
                'esri/views/MapView',
                'esri/widgets/Search',
                'esri/layers/GraphicsLayer',
                'esri/symbols/TextSymbol',
                "esri/geometry/Extent",
            ]).then(([ArcGISMap, MapView, Search, GraphicsLayer, Extent]) => {

            const map = new ArcGISMap({
                basemap: 'topo-vector',
            });

            const view = new MapView({
                container: mapRef.current,
                map,
                center: configuration.map.options.center,
                zoom: configuration.map.options.zoom,
            });

            const search = new Search({
                view,
                popupEnabled: isShowPopup
            });

            //Create extent to limit search
            //set the source's searchExtent to the extent specified above
            //don't forget to start the widget
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            setView(view);
            setSearch(search);
            setGraphicsLayer(graphicsLayer)
        });


        return () => setView(null);


    }, []);


    // load the map view at the ref's DOM node
    useEffect(() => {

        if (!view || !search || !graphicsLayer) return;


        const changeLocation = (location) => {
            onChange(location)
        }
        const showErrorPopup = (point) => {
            point.type = "point"
            view.popup.open({
                title: 'Invalid Location',
                content: 'Location not found.',
                location: point,
            });
        };

        const getAddressFromLocation = async point => {
            const {longitude, latitude} = point;
            console.group("RESPONSES", {point});
            try {
                let res = await fetch(`${GEOCODE_SERVICE_ENDPOINT}&location=${longitude},${latitude}`);
                res = await res.json();
                console.log("ARC GIS RESPONSE", res);
                if(res.address?.Postal?.length <= 4 || !res.address?.AddNum){
                    const googleAddress = await getGeocodeResponse(latitude, longitude);

                    if(googleAddress){
                        res.address.Postal = googleAddress.postalCode;
                        res.address.AddNum = googleAddress.streetNumber;
                    }
                }
                const stadsdeelData = await getStadsdeel(res.address.Postal, res.address.AddNum);

                return await {
                    ...res.address,
                    stadsdeelData

                };
            }catch (e) {

                    console.error(e);
                // showErrorPopup(point);
                return null;
            }finally {
                console.groupEnd();
            }

        };


        const showPopup = (address, pt) => {
            const content = Object.keys(address)
                .filter(key => !!address[key])
                .filter(key => key === 'Address' || key === 'City' || key === "Postal" || key === 'Region' || key === "CountryCode")
                .map(key => `${address[key]}`)
                .join(', ');

            if (!isStatic && isShowPopup) {
                console.log("Popup")
                view.popup.open({
                    title: address.Address,
                    content,
                    location: pt,
                });
            }
        }

        // Only show search bar if not static
        if (!isStatic) {
            view.ui.add(search, 'top-left');
        }
        view.on('click', evt => !isStatic && clickEvent(evt));
        view.popup.autoOpenEnabled = isShowPopup;


        search.on('select-result', function (res) {
            console.log("Search Response" , res);
            const geometry = res.result.feature.geometry;
            getAddressFromLocation(geometry).then(address => {
                if (address) {
                    changeLocation({
                        geometrie: {
                            type: 'Point',
                            coordinates: [geometry.longitude, geometry.latitude],
                        },
                        stadsdeel: address.stadsdeelData.stadsdeel.name,
                        address: {
                            openbare_ruimte: address.Match_addr,
                            huisnummer: address.stadsdeelData?.huisnummer,
                            huisletter: address.stadsdeelData?.huisletter,
                            postcode:  address.stadsdeelData?.postcode,
                            streetname: address.stadsdeelData?.straatnaam_diac,
                            woonplaats: address.City,
                        },
                    });
                    showPopup(address, geometry);
                    graphicsLayer.removeAll();
                    addPointToMap({latitude: geometry.latitude, longitude: geometry.longitude, type: 'point'})
                }
            });

            res.stopPropagation();

        });

        function clickEvent(evt) {
            search.clear();
            view.popup.clear();
            graphicsLayer.removeAll();
            evt.stopPropagation();
            addPointToMap(evt.mapPoint);

            getAddressFromLocation(evt.mapPoint).then(address => {
                if (address) {
                    changeLocation({
                        geometrie: {
                            type: 'point',
                            coordinates: [evt.mapPoint.longitude, evt.mapPoint.latitude],
                        },
                        stadsdeel: address.stadsdeelData?.stadsdeel.name,
                        address: {
                            openbare_ruimte: address.Match_addr,
                            huisnummer: address.stadsdeelData?.huisnummer,
                            huisletter: address.stadsdeelData?.huisletter,
                            postcode:  address.stadsdeelData?.postcode,
                            streetname: address.stadsdeelData?.straatnaam_diac,
                            woonplaats: address.City,
                        },
                    });
                    showPopup(address, evt.mapPoint);
                }
            }).catch(err => {
                showErrorPopup(evt.mapPoint);
            });

        }


        function addPointToMap(mapPoint) {


            loadModules(['esri/Graphic']).then(([Graphic]) => {

                if (Array.isArray(mapPoint)) {
                    mapPoint.forEach(({type, longitude, latitude}) => {
                        const point = {
                            type,
                            longitude,
                            latitude,
                        };

                        const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: simpleMarkerSymbol,
                        });

                        graphicsLayer.add(pointGraphic);

                    });
                } else {

                    // Add single Point
                    const {type, longitude, latitude} = mapPoint;
                    const pointGraphic = new Graphic({
                        geometry: {
                            type,
                            latitude,
                            longitude,
                        },
                        symbol: simpleMarkerSymbol,
                    });


                    graphicsLayer.add(pointGraphic);
                }
            })
        }


        // eslint-disable-next-line no-unused-expressions

        const points = data
            ? data.features.map(p => ({
                type: p.geometry.type.toLowerCase(),
                longitude: p.geometry.coordinates[0],
                latitude: p.geometry.coordinates[1],
                id: p.properties.id,
                created_at: p.properties.created_at,
            }))
            : [];

        points && addPointToMap(points);


        if (initialLocation) {
            const longitude = initialLocation.geometrie.coordinates[0];
            const latitude = initialLocation.geometrie.coordinates[1];
            addPointToMap({type: 'point', latitude, longitude});
        }

    }, [data, getStadsdeel, graphicsLayer, initialLocation, isShowPopup, isStatic, onChange, search, view]);


    useEffect(() => {
        if (!view) return;

        loadModules([
            'esri/Graphic',
            'esri/widgets/Locate'
        ]).then(([Graphic, Locate]) => {

            const locate = new Locate({
                view: view,   // Attaches the Locate button to the view
                graphic: new Graphic({
                    symbol: simpleMarkerSymbol // overwrites the default symbol used for the
                    // graphic placed at the location of the user when found
                })
            });

            view.ui.add(locate, 'bottom-trailing');
            view.ui.move('zoom', 'bottom-leading');

        })
    }, [view]);


    return (
        <div>
            <div className={`${className} web-map`} ref={mapRef}/>
        </div>
    );


};

WebMapView.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    isShowPopup: PropTypes.bool,
    isStatic: PropTypes.bool,
    getStadsdeel: PropTypes.func.isRequired,
    initialLocation: PropTypes.any,
    className: PropTypes.string,
};

