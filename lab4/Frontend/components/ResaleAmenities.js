import TrainIcon from '@mui/icons-material/Train'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import SchoolIcon from '@mui/icons-material/School'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'

export default function ResaleAmenities({ nearby_amenities }) {
    console.log(nearby_amenities)
    if (nearby_amenities !== null)
        return (
            <>
                <h1 style={{ fontSize: 20 }}>Nearby Amenities</h1>
                <p>
                    {nearby_amenities.school !== null ? <DoneIcon /> : <CloseIcon />}
                    <SchoolIcon />
                    School
                </p>
                <p>
                    {nearby_amenities.shopping_mall !== null ? <DoneIcon /> : <CloseIcon />}
                    <LocalMallIcon />
                    Shopping Mall
                </p>
                <p>
                    {nearby_amenities.supermarket !== null ? <DoneIcon /> : <CloseIcon />}
                    <LocalGroceryStoreIcon />
                    Supermarket
                </p>
                <p>
                    {nearby_amenities.transit !== null ? <DoneIcon /> : <CloseIcon />}
                    <TrainIcon />
                    Transit
                </p>
            </>
        )
    return <h3>nearby_amenities not recorded for this location</h3>
}
