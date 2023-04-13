import {
    Fade,
    TextField,
    Autocomplete,
    Slider,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    IconButton,
} from '@mui/material'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/system'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/Searchbox.module.css'
import UnstyledSelectSimple from './UnstyledSelectSimple'
import { formDataToQuery } from '@/helper/functions'

export default function Searchbox({ towns, amenities, flat_types, price_range }) {
    const [open, setOpen] = useState(false)
    console.log('render instance')
    const router = useRouter()
    const [value, setValue] = useState({
        town: '',
        priceRange: price_range,
        nearbyAmenities: [],
        flatTypes: [],
        HDBType: '',
        remainingLease: '',
        applicationRate: ''
    })
    const [inputTownValue, setInputTownValue] = useState('')
    const [searchboxFocused, setSearchboxFocused] = useState('')

    useEffect(() => {
        const recentQuery = sessionStorage.getItem('recentQuery')
        if(recentQuery){
            const recentQueryJson = JSON.parse(recentQuery)
            setValue(recentQueryJson)
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

    console.log(searchboxFocused)
    const handleOnClickAway = (event) => {
        console.log(event.target)
        // if(event.target === document.querySelector(`div input[name='town']`))
        if (
            event.target !== document.querySelector('#advancedOptions') &&
            event.target !== document.body
        ) {
            setOpen(false)
            if (event.target === document.querySelector(`div input[name='town']`)) {
                console.log(event.target)
                setSearchboxFocused('town')
            } else if (searchboxFocused === 'options') setSearchboxFocused('')
        }
    }
    const handleOptionsBtnClick = (event) => {
        // console.log(document.querySelector("#searchboxid"))
        setOpen((previousOpen) => !previousOpen)
        setSearchboxFocused((prevVal) => {
            if (prevVal === '') return 'options'
            if (prevVal === 'options') return ''
        })
    }
    const handleOnFocus = (name) => {
        //const { name } = event.target
        console.log(`name ${name}`)
        console.log('focusing')
        setSearchboxFocused((prevVal) => {
            if (prevVal === '') return name
            if (name === 'town' && prevVal === 'town') return name
            if (prevVal === name && name !== 'town') return ''
        })
    }
    const handleOnBlur = (event) => {
        console.log(event)
        setSearchboxFocused('')
    }
    const handleValueChange = (event) => {
        const { name, value, type, checked } = event.target
        setValue((prevValue) => {
            return {
                ...prevValue,
                [name]: name === 'flatTypes' && value === [] ? ['Any'] : value,
            }
        })
    }

    const handleSearch = (event) => {
        event.preventDefault()
        sessionStorage.setItem('recentQuery', JSON.stringify(value))
        const query = formDataToQuery(value)
        if(value.HDBType === 'Resale'){
            query['remaining_lease'] = value.remainingLease
        }
        else if(value.HDBType === 'HDB'){
            query['application_rate'] = value.applicationRate
        }
        router.push({
            pathname: '/listings',
            query: query,
        })
    }

    const CustomAutocompleteTowns = styled(Autocomplete)(({ theme }) => ({
        height: '100%',
        display: 'flex',
        '& input': {
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            height: '100%',
            paddingLeft: '5px',
        },
        '& input:focus': {
            backgroundColor: 'white',
            borderRadius: '50px',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
        },
    }))

    const flatTypes = (
        <FormControl
            sx={{
                width: '50%',
            }}
        >
            <InputLabel id="flat-type">Flat Type</InputLabel>
            <Select
                labelId="flat-type"
                label="flat-type"
                multiple
                value={value.flatTypes}
                onChange={handleValueChange}
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
        <FormControl
            sx={{
                width: '50%',
            }}
        >
            <InputLabel id="nearby-amenities">Amenities</InputLabel>
            <Select
                labelId="nearby-amenities"
                multiple
                value={value.nearbyAmenities}
                onChange={handleValueChange}
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
                        label: 'S$' + addCommasToNumber(price_range[0]),
                    },
                    {
                        value: price_range[1],
                        label: 'S$' + addCommasToNumber(price_range[1]),
                    },
                ]}
                valueLabelDisplay="auto"
                value={value.priceRange}
                onChange={handleValueChange}
            />
        </>
    )

    function addCommasToNumber(num) {
        let result = ''
        while (num >= 1000) {
            result = ',000' + result
            num /= 1000
        }
        return num + result
    }
    // if(document && document.getElementById("searchboxid")) console.log(`searchbox width: ${document.getElementById("searchboxid").offsetWidth}`)
    return (
        // <ClickAwayListener onClickAway={()=>setSearchboxFocused('')}>
        <div>
            <div
                id="searchboxid"
                className={style.searchbox}
                style={{ backgroundColor: searchboxFocused === '' ? '#fff' : '#E3E3E3' }}
            >
                <CustomAutocompleteTowns
                    value={value.town}
                    onChange={(event, newValue) => {
                        console.log(event)
                        setValue((prevValue) => {
                            return {
                                ...prevValue,
                                town: newValue,
                            }
                        })
                    }}
                    // inputValue={inputTownValue}
                    onInputChange={(event) => {
                        if (event !== null) {
                            // console.log(event.target.innerText)
                            setInputTownValue(event.target.innerText)
                        }
                    }}
                    options={towns}
                    renderInput={(params) => {
                        // console.log({...params.inputProps})
                        return (
                            <div style={{ position: 'relative' }} ref={params.InputProps.ref}>
                                <label
                                    style={{
                                        position: 'absolute',
                                        color: 'black',
                                        left: 18,
                                        top: 5,
                                        fontWeight: 500,
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    Town
                                </label>
                                <input
                                    autoFocus={searchboxFocused === 'town'}
                                    name="town"
                                    onBlurCapture={handleOnBlur}
                                    onFocusCapture={() => handleOnFocus('town')}
                                    style={{
                                        padding: '8px 12px 0px 17px',
                                    }}
                                    type="text"
                                    {...params.inputProps}
                                />
                            </div>
                        )
                    }}
                />
                <div id="vl" />
                <UnstyledSelectSimple
                    onClick={handleOnFocus}
                    searchboxFocused={searchboxFocused}
                    value={value.HDBType}
                    onChange={(e, newValue) =>
                        setValue((prevValue) => {
                            return { ...prevValue, HDBType: newValue }
                        })
                    }
                    flatTypes={['Resale', 'BTO']}
                />
                <div id="vl" />
                <div style={{ height: '100%', alignItems: 'center', display: 'flex' }}>
                    <button
                        className={style.advancedoptions}
                        id="advancedOptions"
                        onClick={handleOptionsBtnClick}
                    >
                        Advanced Options
                    </button>
                </div>
                <IconButton
                    // disabled={inputTownValue === ''}
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
            </div>
            <ClickAwayListener onClickAway={(event) => handleOnClickAway(event, 'dropdown')}>
                {
                    <Fade in={open}>
                        <div
                            style={{
                                backgroundColor: '#fff',
                                width: '490px',
                                borderRadius: '20px',
                                padding: '8px 50px 8px 50px',
                            }}
                        >
                            {priceRange}
                            {flatTypes}
                            {nearbyAmenities}
                            {value.HDBType === 'Resale' ? 
                                <TextField
                                    label='Remaining Lease'
                                    name='remainingLease'
                                    value={value.remainingLease}
                                    onChange={handleValueChange}
                                /> :
                                null
                            }
                            {value.HDBType === 'BTO' ? 
                                <TextField
                                    label='Application Rate'
                                    name='applicationRate'
                                    value={value.applicationRate}
                                    onChange={handleValueChange}
                                /> :
                                null
                            }
                        </div>
                    </Fade>
                }
            </ClickAwayListener>
        </div>
        // </ClickAwayListener>
    )
}
