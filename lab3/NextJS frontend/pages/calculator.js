import { TextField, Button} from "@mui/material";
import { useState } from "react";
import style from '@/styles/calculator.module.css'
export default function Calculator() {
    const [affordablility, setAffordability] = useState(null)
    const [formData, setFormData] = useState({
        budget: '',
        cpf_amount: '',
        hdb_cost: '',
        loan_amount: '',
        annual_interest: '',
        repayment_period: '',
        fixedIncome: '', // inconsistent casing due to error in api structure in backend
        otherIncome: ''
    })

    let apiUrl = 'https://goodstart-backend.fly.dev/api/calculator/calculate_affordability?'

    const handleSubmit = async () => {
        for(const [key,value] of Object.entries(formData)){
            apiUrl += `${key}=${value}&`
        }
        const res = await fetch(apiUrl)
        const value = await res.json()
        setAffordability(value)
        console.log(value)
    }

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    return (
        <div className={style.list}>
            
            <TextField className={style.requirements}
                label="Budget" 
                name="budget"
                value={formData.budget}
                onChange={handleChange}
            />
            <TextField className={style.requirements}
                label="CPF Amount"
                name="cpf_amount"
                value={formData.cpf_amount}
                onChange={handleChange}
            />
            <TextField className={style.requirements}
                label="HDB Cost"
                name="hdb_cost"
                value={formData.hdb_cost}
                onChange={handleChange}
            />
            <TextField className={style.requirements}
                label="Loan Amount"
                name="loan_amount"
                value={formData.loan_amount}
                onChange={handleChange}
            />
            <TextField className={style.requirements}
                label="Annual Interest"
                name="annual_interest"
                value={formData.annual_interest}
                onChange={handleChange}
            />
            <TextField className={style.requirements}
                label="Repayment Period" 
                name="repayment_period"
                value={formData.repayment_period}
                onChange={handleChange}
            />
            <TextField className={style.requirements}
                label="Fixed Income"
                name="fixedIncome"
                value={formData.fixedIncome}
                onChange={handleChange}
            />
            <TextField className={style.requirements}
                label="Other Income"
                name="otherIncome"
                value={formData.otherIncome}
                onChange={handleChange} 
            />
            <Button onClick={handleSubmit } className={style.button}>Submit</Button>
            {affordablility !== null && <p className={style.result}>Affordability: {`${affordablility}`}</p>}

        </div>
    )
}
