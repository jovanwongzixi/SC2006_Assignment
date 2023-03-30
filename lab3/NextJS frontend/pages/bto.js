import Image from 'next/image'
import IndivListingSample from '../public/our-towns-bishan.png'
import { useRouter } from "next/router"
import style from '@/styles/resale.module.css'
import ResaleAmenities from "@/components/ResaleAmenities"
import ListingsMap from '@/components/ListingsMap'

function FlatTitle({ title, town }){
    return(
        <div className="flat-title">
            <h2>{title}</h2>
            <p>{town}</p>
            <style jsx>{`
                .flat-title {
                    margin-bottom: 10px;
                }
                h2 {
                    margin-top: 0px;
                }
            `}</style>
        </div>
    )
}

function ImageWtihFlatDetails({ flatTypeData, min_price, max_price, lease_commence_date }){
    const flatTypeDataArr = []
    for(const [key,value] of Object.entries(flatTypeData)){
        if(value>0) flatTypeDataArr.push(<div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
        }} key={key}>
            <p>{`${key}: `}</p>
            <p>{value}</p>
        </div>)
    }
    return(
        <div className="image-with-details">
            <Image 
                width={550}
                height={450}
                src={IndivListingSample}
                alt="new"
                style={{borderRadius: '8px'}}
            />
            <div>
                <div className="flat-types-with-units">
                    <b>Flat Types & Number of Units</b>
                    {flatTypeDataArr}
                </div>
                <div className="price-range">
                    <b>Price Range:</b>
                    <p>{`$${min_price} to $${max_price}`}</p>
                </div>
                <div className="lease-commence-date">
                    <b>Lease Commence Date:</b>
                    <p>{lease_commence_date}</p>
                </div>
            </div>
            <style jsx global>{`
                .flat-types-with-units {
                    width: 300px;
                }
                .image-with-details {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin: 5px;
                }
            `}
            </style>  
        </div>
        
    )
}

export default function BTO(){
    const router = useRouter()
    const routerData = JSON.parse(decodeURIComponent(router.query.data))
    console.log(routerData)

    const flatTypeData = {
        two_room: routerData.two_room,
        three_room: routerData.three_room,
        four_room: routerData.four_room,
        five_room: routerData.five_room,
        executive: routerData.executive
    }

    return(
        <>
            <div className={style.maindiv}>
                <div className={style.listingsdiv}>
                    <div className={style.photo}></div>
                        <FlatTitle 
                            title={routerData.block + ' ' + routerData.street_name}
                            town={routerData.town}
                        />
                        <ImageWtihFlatDetails
                            flatTypeData={flatTypeData}
                            min_price = {routerData.min_price}
                            max_price = {routerData.max_price}
                            lease_commence_date={routerData.lease_commence_date}
                        />
                        <div className={style.amenities}>
                            <ResaleAmenities nearby_amenities={routerData.nearby_amenities}/>
                        </div>
                        {routerData.coordinates !== null && <ListingsMap center={routerData.coordinates} nearby_amenities={routerData.nearby_amenities}/> }
                    </div>  
            </div>
        </>
    )
}