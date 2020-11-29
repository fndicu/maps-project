import { slide as Menu } from 'react-burger-menu'
import React, { Component } from 'react'

 
class Sidebar extends Component {
  // showSettings (event) {
  //   event.preventDefault();
    
  // }
 
  render () {
    return (
      <Menu>
        <div>
          <input></input>
        </div>
        <div>
          <ol>
            {
            //create list item for each venue
            this.props.venues
            .map(venue =>(
              <li key={venue.venue.id}>
                {venue.venue.name}
               </li> 
            ))
            
            
            }
            </ol>
        </div>
      </Menu>
    );
  }
}
export default Sidebar