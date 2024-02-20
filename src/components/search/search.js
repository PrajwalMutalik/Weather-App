import { useState } from "react";
import "./search.css"
import { AsyncPaginate } from "react-select-async-paginate";
import { apiurl,geoapioptions } from "../../api";
const Search = ({onSearchChange}) => {

    const [search,setSearch]=useState(null);

    const loadOptions = (inputValue) => {
       return fetch(
        `${apiurl}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoapioptions
        )
       .then((response )=> response.json())
       .then((response )=> {
        return{
            options: response.data.map((city)=>{
                return{
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                }
            })
        }
       })
       .catch((err) => console.error(err));
    };

    const handleOnchange = (searchData)=>{
        setSearch(searchData);
        onSearchChange(searchData);
    };

  
    return (
        <AsyncPaginate className="async"
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnchange}
            loadOptions={loadOptions}
        />
    );
    
}

export default Search ;