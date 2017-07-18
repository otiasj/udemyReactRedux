import React, {Component} from 'react'

//Display a map of the city

class Map extends Component {

    componentDidMount() {
        new google.maps.Map(this.refs.map, {
            zoom:12, 
            center: {
                lat: this.props.lat,
                lng: this.props.lon
            }
        });
    }

    render() {
        return <div ref="map" />;
    }
}

export default Map;