import './App.css';
import './Sidebar.css';
import { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'; //https://www.npmjs.com/package/google-maps-react
import axios from 'axios' //https://www.npmjs.com/package/axios used for making requests
import Sidebar from './SideBar';

class App extends Component {
  state = {
    //setting my state as an empty array. I'll pass back the data from the API request and store it in state
    venues: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }
  componentDidMount() {
    //when the component mounts fetch the data 
    this.getVenues()
  }
  // API request to foursquare using axios. This request uses the places API to get Arts places near Boston
  getVenues = () => {
    //structuring the request
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "SR2TZHVQS2ETI0ZMNA5LHXX31GZCF5YM3GVD51YT2MCCFVYL",
      client_secret: "4CLULYKJ3TNBWFX1WQRRBWSWONWIRFTXTGCRCP0D5TKF4K2E",
      query: "arts",
      near: 'Boston',
      v: '20200425'
    }
    //passing my params to the request and fetching the data, then storing it in State for later use. Console logging any errors
    axios.get(endPoint + new URLSearchParams(params))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        })
      })
      .catch(error => {
        alert(error + ' could not load data from four square, check response and try again')
      })

  }
  //Marker funcs
  //displays the info window when a marker is clicked
  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  //resets state when an info window is exited
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  //resets state when the map is clicked
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return (
      <div className="App" id="outer-container">
          <header className="App-header">
            <h1 className="App-title"> Maps project </h1>
          </header>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
        

          <div className="map">
            {/* renders our map on to the page with props via google-maps-react package https://www.npmjs.com/package/google-maps-react*/}
            <Map
              google={this.props.google}
              zoom={12}
              initialCenter={{
                lat: 42.33779017328514,
                lng: -71.07536209153098
              }}
              onclick={this.onMapClicked}
            >
              {this.state.venues
                .map(myVenue => (
                  <Marker
                    key={myVenue.venue.id}
                    position={{ lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng }}
                    name={myVenue.venue.name}
                    title={myVenue.venue.name}
                    onClick={this.onMarkerClick}>
                  </Marker>
                ))
              }
              <InfoWindow
                visible={this.state.showingInfoWindow}
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
              >
                <div>
                  <p>{this.state.selectedPlace.name}</p>
                </div>
              </InfoWindow>

            </Map>
          </div>
        </div>


      </div>

    );
  }
}



export default GoogleApiWrapper({
  apiKey: ('AIzaSyCjVy3j7EfsKfCHHSUXd95juzWdqq3UNzw')
})(App)