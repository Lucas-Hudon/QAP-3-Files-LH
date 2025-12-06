import {useState, useEffect} from 'react';
import '../App.css'
import axios from 'axios'

function NeighborA() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all?fields=name,capital,borders,flags`).then(res => {
            setCountries(res.data.countries);   
        })
    }, [])

    var countryDetails = "";
    countryDetails = countries.map( (item) => {

        return (
            item.name, item.capital, item.borders, item.flags
        )
    });

    return(
        <div className='container'>
            {countryDetails}
        </div>
    )
}

const countries = [item.name, item.capital, item.borders, item.flags];

function groupByFirstLetter(data) {
    return data.reduce((accumulator, currentItem) => {
       
        const firstLetter = currentItem.charAt(0).toUpperCase();

        
        if (!accumulator[firstLetter]) {
            accumulator[firstLetter] = ['A'];
        }

        
        accumulator[firstLetter].push(currentItem);
        return accumulator;
    }, {}); 
}

export default NeighborA