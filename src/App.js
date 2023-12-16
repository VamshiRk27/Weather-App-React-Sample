import React,{useState} from 'react';
import summer from './Images/Summer.jpg';
import winter from './Images/Winter.jpg';
import './App.css'

const App = () =>{
    const [latitude,setLatitude] =useState(0); // If value>0 hemisphere N, if value<0 hemisphere S, if value=0 Equator
    const [longitude,setLongitude]=useState(0);
    const [hemisphere,setHemisphere] = useState("");
    const [month,setMonth]=useState(0); // Lazy initialization concept which will set the month
    const [date,setDate]=useState("");

    function fetchLocation() {

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);

                    // Since the below useState func's are async the Hemisphere will set to equator by the time lat & long are fetched
                    // So to avoid this use the values directly in conditionals as these values are already calculated
                    
                    /* if(latitude>0){
                         setHemisphere("Northern Hemisphere")
                        }
                        else if(latitude<0){
                           setHemisphere("South Hemisphere");
                        }
                        else{
                           setHemisphere("Equator");
                        }
                    */

                    if(position.coords.latitude>0){
                        setHemisphere("Northern Hemisphere")
                    }
                    else if(position.coords.latitude<0){
                        setHemisphere("South Hemisphere");
                    }
                    else{
                        setHemisphere("Equator");
                    }
                }
            )
        }
        setMonth(()=>{return new Date().getMonth()+1});
        setDate(()=>{return new Date().getDate()})
    }

    return (
        <div>
            <button onClick={fetchLocation}>Fetch Location</button>

            <h2>Latitude: {latitude}</h2>
            <h2>Longitude: {longitude}</h2>
            <h2>Equator: {hemisphere}</h2>
            <h2>Month: {month}</h2>
            <h2>Date: {date}</h2>

            {
                hemisphere!=="" && ((hemisphere==="Northern Hemisphere" && month>=4 && month<=10) || (hemisphere==="Southern Hemisphere" && (month<4 || month>10))) && 
                (
                    <div>
                        <h3>Summer Season</h3>
                        <img src={summer} alt='Summer'/>
                    </div>
                )
            }
            {
                hemisphere!=="" && (hemisphere==="Northern Hemisphere" && (month<4 || month>10)) && (
                    <div>
                        <h3>Winter Season</h3>
                        <img src={winter} alt='Winter'/>
                    </div>
                )
            }
        </div>
    )
}


export default App;