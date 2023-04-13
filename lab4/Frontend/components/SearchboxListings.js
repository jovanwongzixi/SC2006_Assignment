import {
    Autocomplete,
    Select,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    IconButton,
    InputAdornment,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomSlider from './CustomSlider'
import { formDataToQuery } from '@/helper/functions'

function addCommasToNumber(num) {
    let result = ''
    while (num >= 1000) {
        result = ',' + `${num % 1000}`.padStart(3, 0) + result
        num /= 1000
    }
    return Math.floor(num) + result
}

export default function SearchboxListings({ towns, amenities, flat_types, price_range }) {
    console.log(`price range: ${price_range}`)
    const router = useRouter()
    const [formData, setFormData] = useState({
        town: '',
        priceRange: price_range,
        nearbyAmenities: [],
        flatTypes: [],
        HDBType: '',
        remainingLease: '',
        applicationRate: '',
    })
    const [inputTownValue, setInputTownValue] = useState('')

    useEffect(() => {
        const recentQuery = sessionStorage.getItem('recentQuery')
        if(recentQuery){
            const recentQueryJson = JSON.parse(recentQuery)
            setFormData(recentQueryJson)
            if(recentQueryJson.town !== '') setInputTownValue(recentQueryJson.town)
        }
        else{
            sessionStorage.setItem('recentQuery', JSON.stringify({
                town: '',
                priceRange: price_range,
                nearbyAmenities: [],
                flatTypes: [],
                HDBType: '',
                remainingLease: '',
                applicationRate: ''
            }))
        }
    }, [])

    const handleChange = (event) => {
        const { value, name } = event.target
        console.log(`Name: ${name}`)
        console.log(`Value: ${value}`)
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    const handleSearch = (event) => {
        event.preventDefault()
        sessionStorage.setItem('recentQuery', JSON.stringify(formData))
        const query = formDataToQuery(formData)
        if(formData.HDBType === 'Resale'){
            query['remaining_lease'] = formData.remainingLease
        }
        else if(formData.HDBType === 'HDB'){
            query['application_rate'] = formData.applicationRate
        }
        router.push({
            pathname: '/listings',
            query: query,
        })
    }

    const flatTypes = (
        <FormControl>
            <InputLabel id="flat-type">Flat Type</InputLabel>
            <Select
                labelId="flat-type"
                label="flat-type"
                multiple
                value={formData.flatTypes}
                onChange={handleChange}
                input={<OutlinedInput label="FlatType" />}
                name="flatTypes"
                // MenuProps={}
            >
                {flat_types.map((flat_type) => (
                    <MenuItem key={flat_type} value={flat_type}>
                        {flat_type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )

    const nearbyAmenities = (
        <FormControl>
            <InputLabel id="nearby-amenities">Amenities</InputLabel>
            <Select
                labelId="nearby-amenities"
                multiple
                value={formData.nearbyAmenities}
                onChange={handleChange}
                input={<OutlinedInput label="Amenities" />}
                name="nearbyAmenities"
                // MenuProps={{anchorEl:document.}}
            >
                {amenities.map((amenity) => (
                    <MenuItem key={amenity} value={amenity}>
                        {amenity}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )

    return (
        <div className="searchbox">
            <Autocomplete
                disableClearable
                value={formData.town}
                onChange={(event, newValue) => {
                    console.log(event)
                    setFormData((prevValue) => {
                        return {
                            ...prevValue,
                            town: newValue,
                        }
                    })
                }}
                inputValue={inputTownValue}
                onInputChange={(event, newValue) => {
                    setInputTownValue(newValue)
                }}
                options={towns}
                renderInput={(params) => <TextField label="Town" {...params} />}
            />
            <FormControl>
                <InputLabel id="select-hdb">HDB Type</InputLabel>
                <Select
                    labelId="select-hdb"
                    label="HDB Type"
                    name="HDBType"
                    value={formData.HDBType}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                >
                    {['Resale', 'BTO'].map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <CustomSlider
                min={price_range[0]}
                max={price_range[1]}
                value={formData.priceRange}
                onChange={handleChange}
            />
            <div className="price-range">
                <TextField
                    // sx={{width:'35%'}}
                    value={addCommasToNumber(formData.priceRange[0])}
                    label="Min price"
                    variant="filled"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <span> - </span>
                <TextField
                    // sx={{width:'45%'}}
                    value={addCommasToNumber(formData.priceRange[1])}
                    label="Max price"
                    variant="filled"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
            </div>
            {flatTypes}
            {nearbyAmenities}
            {formData.HDBType === 'Resale' ? 
                <TextField
                    label='Remaining Lease'
                    name='remainingLease'
                    value={formData.remainingLease}
                    onChange={handleChange}
                /> :
                null
            }
            {formData.HDBType === 'BTO' ? 
                <TextField
                    label='Application Rate'
                    name='applicationRate'
                    value={formData.applicationRate}
                    onChange={handleChange}
                /> :
                null
            }
            <IconButton
                // disabled={formData.HDBType === ''}
                onClick={handleSearch}
                size="large"
                sx={{
                    backgroundColor: '#E13737',
                    color: 'white',
                    marginRight: '8px',
                    '&:hover': {
                        backgroundColor: '#CC3737',
                    },
                }}
            >
                <SearchIcon />
            </IconButton>
            <style jsx>{`
                .searchbox {
                    height: 100%;
                    background-color: #fff;
                    width: 24%;
                    border-radius: 10px;
                    border: 1px solid red;
                    display: flex;
                    flex-direction: column;
                    padding: 15px;
                }

                .price-range {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
                span {
                    margin: 8px;
                }
            `}</style>
        </div>
    )
}
