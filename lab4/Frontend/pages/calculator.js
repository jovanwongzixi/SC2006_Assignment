import { TextField, Button, InputAdornment, Modal, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import style from '@/styles/calculator.module.css'
import { useRouter } from 'next/router'
import { formDataToQuery } from '@/helper/functions'

function isNumeric(input){
    for(let i=0; i<input.length; i++){
        if(input.charAt(i) < '0' || input.charAt(i) > '9'){
            if(i!==0 && input.charAt(i) === '.') continue
            return false
        }
    }
    return true
}

export default function Calculator() {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)

    const [calculatorResults, setCalculatorResults] = useState(null)
    const [formData, setFormData] = useState({
        budget: '',
        cpf_amount: '',
        // hdb_cost: '',
        // loan_amount: '',
        // annual_interest: '',
        // repayment_period: '',
        fixedIncome: '', // inconsistent casing due to error in api structure in backend
        otherIncome: '',
    })
    const [formDataError, setFormDataError] = useState({
        budget: false,
        cpf_amount: false,
        // hdb_cost: false,
        // loan_amount: false,
        // annual_interest: false,
        // repayment_period: false,
        fixedIncome: false, // inconsistent casing due to error in api structure in backend
        otherIncome: false,
    })

    useEffect(() => {
        if(calculatorResults){
            const recentQuery = JSON.parse(sessionStorage.getItem('recentQuery'))
            recentQuery.priceRange[1] = calculatorResults.maximumHDBPrice
            if(recentQuery.priceRange[0] < calculatorResults.maximumHDBPrice) recentQuery.priceRange[0] = 90000
            sessionStorage.setItem('recentQuery', JSON.stringify(recentQuery))
        }
    }, [calculatorResults])

    let apiUrl = 'https://goodstart-backend.fly.dev/api/calculator/calculate_affordability?'

    const handleSubmit = async () => {
        for (const [key, value] of Object.entries(formData)) {
            apiUrl += `${key}=${value}&`
        }
        const res = await fetch(apiUrl)
        const value = await res.json()
        setCalculatorResults(value)
        handleOpen()
        console.log(value)
    }

    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)

    const handleChange = (event) => {
        const { value, name } = event.target
        if(!isNumeric(value)){
            setFormDataError((prevError) => {
                return {
                    ...prevError,
                    [name]: true,
                }
            }) 
        }
        else{
            setFormDataError((prevError) => {
                return {
                    ...prevError,
                    [name]: false,
                }
            })
        }
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        })
    }
    return (
        <div className={style.list}>
            <TextField
                error={formDataError.budget}
                helperText={formDataError.budget && 'Invalid Input!'}
                className={style.requirements}
                label="Budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                }}
            />
            <TextField
                error={formDataError.cpf_amount}
                helperText={formDataError.cpf_amount && 'Invalid Input!'}
                className={style.requirements}
                label="CPF Amount"
                name="cpf_amount"
                value={formData.cpf_amount}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                }}
            />
            {/* <TextField
                error={formDataError.hdb_cost}
                helperText={formDataError.hdb_cost && 'Invalid Input!'}
                className={style.requirements}
                label="HDB Cost"
                name="hdb_cost"
                value={formData.hdb_cost}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                }}
            /> */}
            {/* <TextField
                error={formDataError.loan_amount}
                helperText={formDataError.loan_amount && 'Invalid Input!'}
                className={style.requirements}
                label="Loan Amount"
                name="loan_amount"
                value={formData.loan_amount}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                }}
            />
            <TextField
                error={formDataError.annual_interest}
                helperText={formDataError.annual_interest && 'Invalid Input!'}
                className={style.requirements}
                label="Annual Interest"
                name="annual_interest"
                value={formData.annual_interest}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
            />
            <TextField
                error={formDataError.repayment_period}
                helperText={formDataError.repayment_period && 'Invalid Input!'}
                className={style.requirements}
                label="Repayment Period"
                name="repayment_period"
                value={formData.repayment_period}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }}
            /> */}
            <TextField
                error={formDataError.fixedIncome}
                helperText={formDataError.fixedIncome && 'Invalid Input!'}
                className={style.requirements}
                label="Fixed Income"
                name="fixedIncome"
                value={formData.fixedIncome}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                }}
            />
            <TextField
                error={formDataError.otherIncome}
                helperText={formDataError.otherIncome && 'Invalid Input!'}
                className={style.requirements}
                label="Other Income"
                name="otherIncome"
                value={formData.otherIncome}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">S$</InputAdornment>,
                }}
            />
            <Button 
                onClick={handleSubmit} 
                className={style.button}
                disabled={
                    (Object.values(formDataError).filter(val => val === true).length > 0) || (Object.values(formData).filter(val => val === '').length > 0)
                }
            >
                Submit
            </Button>
            <Modal
                open={modalOpen}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 450,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {calculatorResults !== null && (
                        <>
                            <p>Maximum Affordable HDB Price: {`${calculatorResults.maximumHDBPrice}`}</p>
                            <p>Total Loan over 25 years: {`${calculatorResults.totalLoan25Years}`}</p>
                            <p>Required Monthly Repayment: {`${calculatorResults.requiredMonthlyRepayment}`}</p>
                            <p>Maximum Affordable Monthly Repayment (30% MSR): {`${calculatorResults.maxMonthlyMortgage}`}</p>
                        </>
                    )}
                    <Button
                        onClick={() => {
                            const lastQuery = {
                                ...JSON.parse(sessionStorage.getItem('recentQuery')),
                                flatTypes: [],
                                nearbyAmenities: [],
                                applicationRate: '',
                                remainingLease: ''
                            }
                            sessionStorage.setItem('recentQuery', JSON.stringify(lastQuery))
                            router.push({
                                pathname: '/listings',
                                query: formDataToQuery(lastQuery)
                            })
                        }}
                    >
                        Search Affordable Flats
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
