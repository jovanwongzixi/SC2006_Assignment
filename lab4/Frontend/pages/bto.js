import { useRouter } from 'next/router'
import style from '@/styles/resale.module.css'
import ResaleAmenities from '@/components/ResaleAmenities'
import ListingsMap from '@/components/ListingsMap'
import BTOImageWtihFlatDetails from '@/components/BTOImageWtihFlatDetails'

export default function BTO() {
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
                    <b>{routerData.name}</b>
                    {/* <FlatTitle 
                            title={routerData.block + ' ' + routerData.street_name}
                            town={routerData.town}
                        /> */}
                    <BTOImageWtihFlatDetails
                        flatTypeData={flatTypeData}
                        min_price={routerData.min_price}
                        max_price={routerData.max_price}
                        lease_commence_date={routerData.lease_commence_date}
                        applicationRates={routerData.application_rate}
                    />
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
