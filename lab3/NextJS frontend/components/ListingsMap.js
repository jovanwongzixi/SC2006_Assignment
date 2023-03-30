import { useRef, useEffect } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

function GoogleMapsComponent({ center, zoom, nearby_amenities }){
    const ref = useRef()

    useEffect(() => {
        let map = new window.google.maps.Map(ref.current, {
            center,
            zoom,
        })
        new window.google.maps.Marker({
            map: map,
            position: center
        })
        if(nearby_amenities){
            for(const [key,nearby_amenities_value] of Object.entries(nearby_amenities)){
                if(nearby_amenities_value !== null){
                    console.log(key)
                    for(const [key,value] of Object.entries(nearby_amenities_value.locations.info)){
                        new window.google.maps.Marker({
                            map: map,
                            position: value
                        })
                    }
                }
            }
        }
    }, [])
    
    return(
        <div ref={ref} id="map" style={{border: '1px solid grey', height: '400px', borderRadius: '5px'}}/>
    )
}

const render = (status) => {
    if(status === Status.LOADING) return <h3>Loading...</h3>
    return <h3>Failure...</h3>
}

function ListingsMap({center, nearby_amenities}){
    // const mapCenter = center { lat: -34.397, lng: 150.644 };
    const zoom = 16;
    return(
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} >
            <GoogleMapsComponent center={center} zoom={zoom} nearby_amenities={nearby_amenities}/>
        </Wrapper>
    )
}

export default ListingsMap