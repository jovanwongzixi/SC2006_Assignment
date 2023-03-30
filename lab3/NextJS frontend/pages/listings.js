import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from 'swr'
import IndivListing from "@/components/IndivListing"
import SearchboxListings from "@/components/SearchboxListings"
import Pagination from '@mui/material/Pagination'
import style from '@/styles/listings.module.css'
import { Skeleton } from "@mui/material"

const fetcher = (...args) => fetch(...args).then((res) => {console.log('usingSWR'); return res.json()})

function ListingDiv({queryString, page, hdb_type}){
    const apiUrl = `https://goodstart-backend.fly.dev/api/flat_data/resale/query?page=${page-1}` + queryString
    const {data : apiData, error, isLoading} = useSWR(apiUrl, fetcher)
    // console.log(apiData)
    // if(isLoading) return (
    //     <>
    //         <Skeleton variant="rounded" height={110} width={500}/>
    //         <Skeleton variant="rounded" height={110} width={500}/>
    //         <Skeleton variant="rounded" height={110} width={500}/>
    //         <Skeleton variant="rounded" height={110} width={500}/>
    //         <Skeleton variant="rounded" height={110} width={500}/>
    //     </>
    // )
    return(
        <>
            {apiData !== undefined && apiData.map((value, index) => <IndivListing key={index} displayValues={value}/>)}
        </>
    )
}

export default function Listings({ towns, amenities, flat_types, price_range }) {
    const [page, setPage] = useState(1)
    const handlePageChange = (event, value) => {
        setPage(value)
    }
    const router = useRouter()
    const routerData = router.query

    let queryString= ''
    for(const [key,value] of Object.entries(routerData)){
        if(key === 'town'){
            queryString += `${value !== undefined ? '&'+key+'='+value : 'bishan'}`
        }
        else if(key === 'hdb_type') continue
        else if(value !== ''){
             queryString += `${value !== '' ? '&'+key+'='+value : ''}`
        }
    }

    
    const { data: queryResultSize, isLoading } = useSWR(`https://goodstart-backend.fly.dev/api/flat_data/resale/query_size?` + queryString, fetcher)
    console.log(isLoading)
    const paginationCount = queryResultSize === undefined ? 0 : Math.ceil(queryResultSize.query_size/queryResultSize.page_size)
    return (
        <>  
            <div className={style.maindiv}>
                <SearchboxListings towns={towns} amenities={amenities} flat_types={flat_types} price_range={price_range}/>
                <div className={style.listingsdiv}>
                    <ListingDiv queryString={queryString} page={page} hdb_type={routerData.hdb_type}/>
                    <Pagination count={paginationCount} page={page} onChange={handlePageChange} />                    
                </div>
            </div>
            {/* preload next page into cache for better UX */}
            <div style={{ display: 'none' }}><ListingDiv queryString={queryString} page={page+1}/></div>
        </>
    )
}

export async function getStaticProps(){
    const res = await fetch("https://goodstart-backend.fly.dev/api/flat_data/search_params")
    const { towns, amenities, flat_types, price_range } = await res.json()

    return {
        props: {
            towns,
            amenities,
            flat_types, 
            price_range
        }
    }
}