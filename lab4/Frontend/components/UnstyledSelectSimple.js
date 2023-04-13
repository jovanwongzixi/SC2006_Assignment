import { useState, forwardRef } from 'react'
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled'
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import { styled } from '@mui/system'

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
}

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
}

const StyledButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.87rem;
  min-height: calc(1.5em + 22px);
  height: 100%;
  min-width: 120px;
  padding: 8px 12px 0px 17px;
  border-radius: 0px;
  border: none;
  border-left: 1px solid grey; 
  border-right: 1px solid grey;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : 'transparent'};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[600]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : '#fff'};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &.${selectUnstyledClasses.expanded} {
    border-radius: 50px;
    border: none;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    background-color: #fff;
  }

  &::after {
    content: '';
    float: top;
  }
  `
)

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 120px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `
)

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
)

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
`

const CustomSelect = forwardRef(function CustomSelect(props, ref) {
    const slots = {
        root: StyledButton,
        listbox: StyledListbox,
        popper: StyledPopper,
        ...props.slots,
    }

    return <SelectUnstyled {...props} ref={ref} slots={slots} />
})

export default function UnstyledSelectSimple({
    value,
    onChange,
    flatTypes,
    onClick,
    searchboxFocused,
}) {
    const [hover, setHover] = useState(false)
    return (
        <div
            style={{
                height: '100%',
                borderRadius: '0px',
                color: 'black',
                position: 'relative',
                margin: '0px 2px 0px 2px',
                backgroundColor: 'transparent',
            }}
        >
            <label
                style={{
                    position: 'absolute',
                    left: 18,
                    top: 5,
                    fontWeight: 500,
                    fontSize: '0.8rem',
                }}
            >
                HDB Type
            </label>
            <CustomSelect
                name="hdb-type"
                autoFocus={searchboxFocused === 'hdb-type'}
                onClick={() => onClick('hdb-type')}
                value={value}
                onChange={onChange}
            >
                {flatTypes.map((flat_type) => (
                    <StyledOption name={'simpleFlatType'} key={flat_type} value={flat_type}>
                        {flat_type}
                    </StyledOption>
                ))}
            </CustomSelect>
        </div>
    )
}
