import './App.css';
import { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Maps project </h1>
        </header>
        <div className="map">
          <Map google={this.props.google} zoom={14}>

            <Marker onClick={this.onMarkerClick}
              name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1></h1>
              </div>
            </InfoWindow>
          </Map>
        </div>

      </div>

    );
  }
}



export default GoogleApiWrapper({
  apiKey: ('AIzaSyCjVy3j7EfsKfCHHSUXd95juzWdqq3UNzw')
})(App)