import Image from 'next/image'
import HDBSample from '../public/hdb_sample.jpg'
import style from '@/styles/IndivListing.module.css'
import { useRouter } from "next/router"
const flatTypesArr = ['two_room', 'three_room', 'four_room', 'five_room', 'executive']

export default function IndivListing({displayValues}){
    const router = useRouter()

    function computeFlatTypes(){
        let flatTypes = ''
        flatTypesArr.forEach( val => {
            if(displayValues[val] > 0) flatTypes+= `${val},`
        })
        return flatTypes.slice(0,-1)
    }

    const handleListingClick = () => {
        console.log(`Handling Listing Click`)
        console.log(JSON.parse(decodeURIComponent(encodeURIComponent(JSON.stringify(displayValues)))))
        router.push({
            pathname: '/resale',
            query: {
                data: encodeURIComponent(JSON.stringify(displayValues))
            }
            //encodeURIComponent(JSON.stringify(displayValues))
        })
    }
    function computePriceRange(){
        return displayValues.min_price + ' to ' + displayValues.max_price
    }
    return(
        <div onClick={handleListingClick} className={style.indivlisting}>
            <Image
                src={HDBSample}
                width={100}
                height={100}
                alt="Image of HDB"
                style={{borderRadius: '5px'}}
            />
            <div>
                <p>{displayValues.block + ' ' + displayValues.street_name}</p>
                <p>{displayValues.town}</p>
                <p>{computeFlatTypes()}</p>
                <p>{computePriceRange()}</p>
            </div>
        </div>
    )
}