import React, { useState,ChangeEvent } from 'react'
import { Button, Paper, TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export interface ITask {
    taskInput: string;
}

const Home = () => {
    const [input, setInput] = useState<String>('')

    const changeHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
        setInput(event.target.value)
      }

      const navigate = useNavigate()

    const onClickHandle = async () => {
        const getCountryData = await axios.get(`https://restcountries.com/v2/name/${input}`)
        navigate('/country', {
            state: getCountryData?.data
        })
        setInput('')
    }

  return (
      <Paper elevation={9} sx={{padding: 8, display: 'flex', alignItems: "center", justifyContent: 'center',flexDirection: 'column', borderRadius: 6, width: 200 }}>
        <TextField type='text'
        label='Enter Country' 
        fullWidth
      value={input} name='country'
      data-testid='numberInput'
      role="inputEl" 
      onChange={changeHandler}  />
        <Button data-testid="country" role="country" name='country' onClick={onClickHandle} disabled={input.length < 1} sx={{border: '1px solid green', textAlign: 'center', padding: 1, width: 155, borderRadius: 3, color: 'lightgreen', cursor: 'pointer', mt: 4}}>Submit</Button>
    </Paper>
  )
}

export default Home
