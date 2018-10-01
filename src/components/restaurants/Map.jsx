import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
  >
    {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }} />}
  </GoogleMap>
))