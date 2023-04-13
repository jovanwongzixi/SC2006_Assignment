import Slider, { SliderThumb } from '@mui/material/Slider'
import { alpha, styled } from '@mui/material/styles'
import PropTypes from 'prop-types'

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.16)}`,
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}))

export default function CustomSlider({ value, onChange, min, max }) {
    function AirbnbThumbComponent(props) {
        const { children, ...other } = props
        return (
            <SliderThumb {...other}>
                {children}
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
            </SliderThumb>
        )
    }

    AirbnbThumbComponent.propTypes = {
        children: PropTypes.node,
    }
    return (
        <AirbnbSlider
            min={min}
            max={max}
            name="priceRange"
            value={value}
            onChange={onChange}
            slots={{ thumb: AirbnbThumbComponent }}
            getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        />
    )
}
