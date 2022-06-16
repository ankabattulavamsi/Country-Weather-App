import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

type IProps = {
  props: any;
}
const Weather: React.FC<IProps> = ({props}) => {
  const [data, setData] = useState<any>({})
  const [open, setOpen] = useState(true)

    console.log('Props', data)
    // const getWeatherData: any = useLocation()
    // console.log('get-data', getWeatherData)

    const navigate = useNavigate()

    const onClickBack = () => {
        navigate('/')
    }

   const getWeatherData = async(capital: string) => {
      const response = await axios.get(`http://api.weatherstack.com/current?access_key=24e90bb69f3b581280b40ca289e1cbc1&query=${capital}`)
      console.log('Weather Data ', response)
      setData(response?.data?.current)   
      setOpen(false) 
    }
    
  return (
     <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',border: '2px solid green', padding: 6, margin: 4}}>
       <Box sx={{display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }} >
        <Typography variant="h5" sx={{fontFamily: '-apple-system',mr: 5}}>Capital :-- {props?.capital}</Typography>
        <Typography variant="h5" sx={{fontFamily: '-apple-system', mr: 5}}>Population :-- {props?.population}</Typography>
        <Typography variant="h5"  sx={{fontFamily: '-apple-system', mb:3}}>Latlng :-- {props?.latlng}</Typography>
        <Typography variant="h5"  sx={{fontFamily: '-apple-system', mb:3}}>Latlng :--  {props?.latlng}</Typography>
        <Typography sx={{fontFamily: '-apple-system', mb: 1, color: 'green'}}>Logo : </Typography>
        <img src={props?.flag} alt='flags'/>
        </Box>
        <Box>
      {open ? <Button dat-testid='weatherButton' role='weather' sx={{border: '1px solid #fff', textAlign: 'center', padding: 1, width: 155, borderRadius: 3,
       color: '#fff', backgroundColor: 'lightGreen', cursor: 'pointer', mt: 3, mb: 3}} 
       onClick={() => getWeatherData(props.capital) }>Weather</Button> 
      :
       <Box>
        <Typography variant="h5" display="block" gutterBottom  sx={{fontFamily: '-apple-system',mt: 3}}>Temperature :-- {data?.temperature}</Typography>
        <Box>
        <Typography sx={{fontFamily: '-apple-system', mb: 1, color: 'green'}}>Logo : </Typography>
        <img src={data?.weather_icons} alt='temperature' className='temperature'  />
        </Box>
        <Typography variant='h5' gutterBottom sx={{fontFamily: '-apple-system',}}>Wind Speed :--{data?.wind_speed}</Typography>
        <Typography variant='h5' sx={{fontFamily: '-apple-system',}}>Precip :-- {data?.precip}</Typography>
        
        <Box>
        <Button data-testid='backButton'  sx={{border: '1px solid black', backgroundColor: 'black', textAlign: 'center', padding: 2, width: 200, borderRadius: 3, color: '#fff', cursor: 'pointer', mt: 4}} onClick={onClickBack}>Back</Button>
        </Box>
        </Box>
        }
        </Box>
    </Box>
  )
}

export default Weather

