import { useRouter } from 'next/router'
import style from '@/styles/resale.module.css'
import ResaleAmenities from '@/components/ResaleAmenities'
import ListingsMap from '@/components/ListingsMap'
import FlatTitle from '@/components/FlatTitle'
import ResaleImageWtihFlatDetails from '@/components/ResaleImageWtihFlatDetails'

export default function Resale() {
    const router = useRouter()
    const routerData = JSON.parse(decodeURIComponent(router.query.data))
    console.log(routerData)

    const flatTypeData = {
        two_room: routerData.two_room,
        three_room: routerData.three_room,
        four_room: routerData.four_room,
        five_room: routerData.five_room,
        executive: routerData.executive,
    }

    return (
        <>
            <div className={style.maindiv}>
                <div className={style.listingsdiv}>
                    <div className={style.photo}></div>
                    <FlatTitle
                        title={routerData.block + ' ' + routerData.street_name}
                        town={routerData.town}
                    />
                    <ResaleImageWtihFlatDetails
                        flatTypeData={flatTypeData}
                        min_price={routerData.min_price}
                        max_price={routerData.max_price}
                        lease_commence_date={routerData.lease_commence_date}
                    />
                    {/* <div className={style.details}>
                            <h1 style={{ fontSize: 20 }}>Details</h1>
                            <p>{'Address: '+routerData.block + ' ' + routerData.street_name}</p>
                            <br></br>
                            <p>{'Town: '+routerData.town}</p>
                            <br></br>
                            <p>{'Lease Commence Date: '+routerData.lease_commence_date}</p>
                            <br></br>
                            <p>{'2 Room Flats: '+routerData.two_room}</p>
                            <br></br>
                            <p>{'3 Room Flats: '+routerData.three_room}</p>
                            <br></br>
                            <p>{'4 Room Flats: '+routerData.four_room}</p>
                            <br></br>
                            <p>{'5 Room Flats: '+routerData.five_room}</p>
                            <br></br>
                            <p>{'Executive: '+routerData.executive}</p>
                            <br></br>
                            <p>{'Minimum Price: '+routerData.min_price}</p>
                            <br></br>
                            <p>{'Maximum Price: '+routerData.max_price}</p>
                        </div> */}
                    <div className={style.amenities}>
                        <ResaleAmenities nearby_amenities={routerData.nearby_amenities} />
                    </div>
                    {routerData.coordinates !== null && (
                        <ListingsMap
                            center={routerData.coordinates}
                            nearby_amenities={routerData.nearby_amenities}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
