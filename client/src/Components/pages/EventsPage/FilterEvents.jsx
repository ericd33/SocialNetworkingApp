import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
    <div className='filtersContainer'>
		<h3>Filters</h3>
				<div>
					<div className='in-online'>
						<Button variant="outlined" sx={{ml:'5px', mr:'15px', color:'secondary.main', border:'1px solid #ffd000'}} onClick={filterPerson}>In-person</Button>
						<Button variant="outlined" sx={{color:'secondary.main', border:'1px solid #ffd000'}} onClick={filterLOnline}>Online</Button>
					</div>
					<Button variant="outlined" sx={{ml:'10px', mb:'10px', mt:'10px', color:'secondary.main', border:'1px solid #ffd000'}} onClick={filterGlobal}>ALL</Button>
					<br/>
					{
						filtersInPer || filtersOnline ?
						<Button variant="outlined" color='error' sx={{ml:'10px', mr:'15px'}} onClick={filterDelete}>Delete Filters </Button> : null
						}
					<br/>
					<div className='filtersInPerson'>
						{
							filtersInPer ? 
								<FormControl id='selectIn'>
								<InputLabel sx={{color:'primary.dark'}} id="demo-simple-select-helper-label">Location</InputLabel>
								<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								onChange={(e)=> fByLoc(e)}
								sx={{color:'primary.light'}}
								>
									{filterLO.map((i, index) => (
										<MenuItem key={index} value={i}>{i}</MenuItem>
									))}
								</Select>
							</FormControl> : null
						}
						<br/>
						<div className='filtersOnline'>
							{
								filtersInPer  ? 
								<FormControl id='selectIn'>
									<InputLabel sx={{color:'primary.dark'}} id="demo-simple-select-helper-label">Assists</InputLabel>
									<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									onChange={(e)=> fByAsisstIn(e)}
									sx={{color:'primary.light'}}
									>
										<MenuItem  value='more'>More</MenuItem>
										<MenuItem value='less'>Less</MenuItem>
									</Select>
								</FormControl> : null
							}
						</div>
					</div>


					{
						filtersOnline  ? 
						<FormControl id='selectIn'>
							<InputLabel sx={{color:'primary.dark'}} id="demo-simple-select-helper-label">Assists</InputLabel>
							<Select
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper"
							onChange={(e)=> fByAsisstIn(e)}
							sx={{color:'primary.light'}}
							>
								<MenuItem  value='more'>More</MenuItem>
								<MenuItem value='less'>Less</MenuItem>
							</Select>
						</FormControl> : null
					}
				</div>
    </div>
	)
}

export default FilterEvents