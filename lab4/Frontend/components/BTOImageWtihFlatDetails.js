import Image from 'next/image'
import IndivListingSample from '../public/our-towns-bishan.png'
import { capitalise } from '@/helper/functions'
export default function BTOImageWtihFlatDetails({ flatTypeData, min_price, max_price, applicationRates }) {
    return (
        <div className="image-with-details">
            <Image
                width={550}
                height={450}
                src={IndivListingSample}
                alt="new"
                style={{ borderRadius: '8px' }}
            />
            <div>
                <div className="flat-types-with-units">
                    <b>Flat Types & Number of Units</b>
                    {
                        Object.entries(flatTypeData).map(([key, value]) => {
                            if(value > 0) return (
                                <div key={key}>
                                    <p>{`${capitalise(key)}: `}</p>
                                    <p>{value}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="price-range">
                    <b>Price Range:</b>
                    <p>{`$${min_price} to $${max_price}`}</p>
                </div>
                <div className="application-rates">
                    <b>Application Rates:</b>
                    {
                        Object.entries(applicationRates).map(([key, value]) => {
                            if(value !== null) return(
                                <div key={key}>
                                    <p>{`${capitalise(key)}:`}</p>
                                    <p>{value}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <style jsx global>
                {`
                    .flat-types-with-units {
                        width: 300px;
                    }
                    .image-with-details {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin: 5px;
                    }
                    .flat-types-with-units, .application-rates, .price-range{
                        margin-bottom: 10px;
                    }
                    .flat-types-with-units > div, .application-rates > div, .price-range{
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        justify-content: space-between;
                    }
                `}
            </style>
        </div>
    )
}