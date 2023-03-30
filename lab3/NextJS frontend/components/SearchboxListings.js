import { Autocomplete, Select, TextField, FormControl, InputLabel, OutlinedInput, MenuItem, Slider, IconButton, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react"
import { useRouter } from "next/router"
import CustomSlider from "./CustomSlider"

export default function SearchboxListings({ towns, amenities, flat_types, price_range }){
    console.log(`price range: ${price_range}`)
    const router = useRouter()
    const [formData, setFormData] = useState({
        town: '',
        priceRange: price_range,
        nearbyAmenities: [],
        flatTypes: [],
        HDBType: ''
    })
    const [inputTownValue, setInputTownValue] = useState('')
    const handleChange = (event) => {
        const { value, name } = event.target
        console.log(`Name: ${name}`)
        console.log(`Value: ${value}`)
        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleSearch = (event) => {
        event.preventDefault()
        router.push({
            pathname: '/listings',
            query: {
                town: inputTownValue,
                min_price: formData.priceRange[0],
                max_price: formData.priceRange[1],
                amenities: formData.nearbyAmenities.toString().toLowerCase(),
                flat_types: formData.flatTypes.toString().toLowerCase(),
                hdb_type: formData.HDBType
            }
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
                input={<OutlinedInput label="FlatType"/>}
                name="flatTypes"
                // MenuProps={}
            >
                {
                    flat_types.map( flat_type =>
                        <MenuItem
                            key={flat_type}
                            value={flat_type}
                        >
                            {flat_type}
                        </MenuItem>
                    )
                }
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
                input={<OutlinedInput label="Amenities"/>}
                name="nearbyAmenities"
                // MenuProps={{anchorEl:document.}}
            >
                {
                    amenities.map( amenity =>
                        <MenuItem
                            key={amenity}
                            value={amenity}
                        >
                            {amenity}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )

    const priceRange = (
        <>
            <label>Price Range</label>
            <Slider
                name="priceRange"
                min={price_range[0]}
                max={price_range[1]}
                marks={[
                    {
                        value: price_range[0],
                        label: 'S$'+addCommasToNumber(price_range[0])
                    },
                    {
                        value: price_range[1],
                        label: 'S$'+addCommasToNumber(price_range[1])
                    }
                ]}
                valueLabelDisplay = "auto"
                value={formData.priceRange}
                onChange={handleChange}
            />            
        </>
    )


    function addCommasToNumber(num){
        let result = ''
        while(num >= 1000){
            result = ',' + `${num%1000}`.padStart(3,0) + result
            num /= 1000
        }
        return Math.floor(num) + result
    }

    return(
        <div className="searchbox">
            <Autocomplete
                disableClearable
                value={formData.town}
                onChange={(event, newValue) => {
                    console.log(event)
                    setFormData((prevValue) => {
                        return {
                            ...prevValue,
                            town: newValue
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
                    name='HDBType'
                    value={formData.HDBType}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                >
                    {
                        ['Resale', 'BTO'].map((type => (
                            <MenuItem
                                key={type}
                                value={type}
                            >
                                {type}
                            </MenuItem>
                        )))
                    }
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
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
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
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                />
            </div>
            {/* {priceRange} */}
            {flatTypes}
            {nearbyAmenities}
            <IconButton 
                    disabled={inputTownValue === ''}
                    onClick={handleSearch}
                    size='large'
                    sx={{
                        backgroundColor:'#E13737',
                        color: 'white',
                        marginRight: '8px',
                        '&:hover': {
                            backgroundColor: '#CC3737'
                        }
                    }}><SearchIcon/></IconButton>
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