import React from 'react'
import { useLocation} from 'react-router-dom'
import Weather from './Weather'


const Country = () => {
    const {state}: any = useLocation()
    console.log('location', state)
 return (
     <>
     {state?.map((item: any) => {
  return <Weather props={item} />
})}
     </>
 )
}

export default Country
