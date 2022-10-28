import { Button } from '@mui/material';
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { filterGlobalEvents, getEvents, filterInPersonLoca,filterByAssist, clearF } from "../../../Redux/actions"
import '../Home/FilterPost.css';

const FilterEvents = () => {
	const [filtersInPer, setFiltersInPer] = useState(false)
	const [filtersOnline, setFiltersOnline] = useState(false)
  const dispatch = useDispatch();
	const sessionUser = useUserAuth();
	let token = sessionUser.user.accessToken;
	// let email = sessionUser.user.email;
	// const userF = useSelector((state)=> state.myUser)
	const eventsRedux = useSelector((state)=> state.events)
	// const postF = userF.follows
	let filterLO =[];
	
	eventsRedux.map((e)=> {
		if(e.type==="in-person"){
			if(!filterLO.includes(e.location)){
				filterLO.push(e.location)
			}
		}
	})

	useEffect(()=>{
		dispatch(getEvents(token))
},[dispatch])
	//filter Global
	const filterGlobal = ()=>{
		dispatch(getEvents(token))
		setFiltersInPer(false)
		setFiltersOnline(false)
	}

	//borrar filtros conservando el de si es global o online
	const filterDelete = () =>{
		if(filtersInPer){
			dispatch(filterGlobalEvents("in-person"))
			dispatch(clearF())
		}else if(filtersOnline){
			dispatch(filterGlobalEvents("online"))
			dispatch(clearF())
		}
	}

	// Filtros online 

	const filterLOnline = ()=>{
		dispatch(filterGlobalEvents("online"))
		setFiltersOnline(true)
		setFiltersInPer(false)
	}

	//filtros IN-person
	const filterPerson = ()=>{
		dispatch(filterGlobalEvents("in-person"))
		setFiltersInPer(true)
		dispatch(clearF())
	}
	
	const fByLoc = (e) =>{
		dispatch(filterInPersonLoca(e.target.value))
		dispatch(clearF())
	}

	const fByAsisstIn = async(e) =>{
		dispatch(filterByAssist(e.target.value))
		dispatch(clearF())
	}

  return (
    <div>
				<div>
					<Button variant="outlined" onClick={filterPerson}>In-person</Button>
					<Button variant="outlined" onClick={filterGlobal}>ALL</Button>
					<Button variant="outlined" onClick={filterLOnline}>Online</Button>
					<br/>
					{
						filtersInPer || filtersOnline ?
						<Button variant="outlined" onClick={filterDelete}>Delete Filters </Button> : null
						}
					<br/>

					{
						filtersInPer ? 
						<select onChange={(e)=> fByLoc(e)} >
            <option value="" disabled selected>
            Filter By Location
            </option>
            {/* <option value="All">All</option> */}
            {filterLO.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select> : null
					}
					<br/>
					{
						filtersInPer  ? 
						<select  onChange={(e)=> fByAsisstIn(e)}>
							<option value="" disabled selected>
              Filter By Asist
            </option>
						<option value="more">
							more
						</option>
						<option value="less">
							less
						</option>
						</select>
						: null
					}

					{
						filtersOnline  ? 
						<select  onChange={(e)=> fByAsisstIn(e)}>
							<option value="" disabled selected>
              Filter By Asist
            </option>
						<option value="more">
							more
						</option>
						<option value="less">
							less
						</option>
						</select>
						: null
					}
				</div>
    </div>
	)
}

export default FilterEvents