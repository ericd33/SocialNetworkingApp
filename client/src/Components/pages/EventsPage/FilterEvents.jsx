import { Button } from '@mui/material';
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { filterGlobalEvents, getEvents, filterInPersonLoca } from "../../../Redux/actions"
import '../Home/FilterPost.css';

const FilterEvents = () => {
	const [filtersInPer, setFiltersInPer] = useState(false)
    const dispatch = useDispatch();
	const sessionUser = useUserAuth();
	let token = sessionUser.user.accessToken;
	// let email = sessionUser.user.email;
	// const userF = useSelector((state)=> state.myUser)
	const eventsRedux = useSelector((state)=> state.events)
	// const postF = userF.follows
	let filterO =[];
	
	eventsRedux.map((e)=> {
		if(e.type==="in-person"){
			if(!filterO.includes(e.location)){
				filterO.push(e.location)
			}
		}
	})
	
	const filterGlobal = ()=>{
		dispatch(getEvents(token))
		setFiltersInPer(false)
	}

	// Filtros online 

	const filterOnline = ()=>{
		dispatch(filterGlobalEvents("online"))
		setFiltersInPer(false)
	}
	
	const fByLoc = (e) =>{
		dispatch(filterInPersonLoca(e.target.value))
	}
	
	
	const filterPerson = ()=>{
		dispatch(filterGlobalEvents("in-person"))
		setFiltersInPer(true)
		console.log(filterO)
	}


  return (
    <div>
				<div>
					<Button variant="outlined" onClick={filterPerson}>In-person</Button>
					<Button variant="outlined" onClick={filterGlobal}>ALL</Button>
					<Button variant="outlined" onClick={filterOnline}>Online</Button>
					{
						filtersInPer ? 
						<select onChange={(e)=> fByLoc(e)} >
            <option value="" disabled selected>
              Filter By Location
            </option>
            {/* <option value="All">All</option> */}
            {filterO.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select> : null
					}
				</div>
    </div>
	)
}

export default FilterEvents