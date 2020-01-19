import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class CruzMap extends Component {
  // constructor() {
  //   super();
  // }
  constructor(props) {
    super(props);
    //const {count, setCount} = useState(0)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 }
      ]
    };
  }





      var map, infoWindow;
      initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

       handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    return (
      
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        //defaultCenter={{
        // lat: this.state.currentLatLng.lat,
        //lng: this.state.currentLatLng.lng
        //}}
        //initialCenter= {{currentLatLng.lat,currentLatLng.lon}}
        initialCenter={{ lat: 36.962421, lng: -122.023301 }}
      >
        {this.displayMarkers()}
        <Marker position={{ lat: 36.962421, lng: -122.023331 }} />
      </Map>
    );
  }
}

// export {CruzMap};
// export default CruzMap
export default GoogleApiWrapper({
  apiKey: "AIzaSyB_DqsvVb7sdqj9wQ123Bi8NgAAfZvuz5g"
})(CruzMap);

const mapStyles = {
  width: "100%",
  height: "100%"
};
