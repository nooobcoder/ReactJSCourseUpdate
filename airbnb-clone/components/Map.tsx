import React, { FC, useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { HotelPropsType } from '../pages/search';
import { GeolibInputCoordinates } from 'geolib/es/types';

type ViewportType = React.SetStateAction<{
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}>;

const Map: FC<HotelPropsType> = ({ searchResults }: HotelPropsType) => {
  const [selectedLocation, setSelectedLocation] = useState<any>({});

  /* Transform the 'searchResults' props into something like this
    [
      { latitude: 52.516272, longitude: 13.377722 },
      { latitude: 51.515, longitude: 7.453619 },
      { latitude: 51.503333, longitude: -0.119722 },
    ]
  */
  const coordinatesArr: GeolibInputCoordinates[] = searchResults.map(({ lat, long }) => ({
    latitude: lat,
    longitude: long,
  }));

  // The latitude and longitude of the center of locations coordinates
  const center: any = getCenter(coordinatesArr);
  const [viewport, setViewport] = React.useState<ViewportType>({
    latitude: center.latitude,
    longitude: center.longitude,
    width: '100%',
    height: '100%',
    zoom: 11,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/geocodingnodeapi/cks1ppcse4zue18p6o29webm5"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(nextViewport: ViewportType) => setViewport(nextViewport)}
    >
      {searchResults.map(({ long, lat }, index) => (
        <div key={long}>
          <Marker longitude={long} latitude={lat} offsetLeft={-20} offsetTop={-10}>
            <p
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(searchResults[index])}
            >
              🖊️
            </p>
          </Marker>

          {/* The popup that should show if we click on a marker */}
          {selectedLocation.long === searchResults[index].long ? (
            <Popup
              closeOnClick
              onClose={() => setSelectedLocation({})}
              latitude={lat}
              longitude={long}
            >
              {searchResults[index].title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
