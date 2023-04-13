import Head from 'next/head'
import { Inter } from '@next/font/google'
import Searchbox from '@/components/Searchbox'
import { TypeAnimation } from 'react-type-animation'

const inter = Inter({ subsets: ['latin'] })

export function Home({ towns, amenities, flat_types, price_range }) {
    const formattedTowns = towns.map((town) => {
        const splitTownArr = town.toLowerCase().split(' ')
        let newTown = ''
        splitTownArr.forEach((val) => {
            newTown += val.charAt(0).toUpperCase() + val.slice(1) + ' '
        })
        return newTown.slice(0, -1)
    })

    return (
        <>
            <Head>
                <title>Goodstart</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div className="main-div" style={inter.style}>
                    <p>Welcome!</p>
                    <TypeAnimation
                        id="typing-text"
                        sequence={['We provide housing info!', 1000, 'We can calculate affordability of HDB!', 1000]}
                        repeat={Infinity}
                        wrapper="span"
                        speed={50}
                    />
                    <Searchbox
                        towns={formattedTowns}
                        amenities={amenities}
                        flat_types={flat_types}
                        price_range={price_range}
                    />
                </div>
            </main>
        </>
    )
}

//get search params at build time to create autocomplete function for search box, getStaticProps fetches data at build time
export async function getStaticProps() {
    const res = await fetch('https://goodstart-backend.fly.dev/api/flat_data/search_params')
    const { towns, amenities, flat_types, price_range } = await res.json()

    return {
        props: {
            towns,
            amenities,
            flat_types,
            price_range,
        },
    }
}

export default Home
