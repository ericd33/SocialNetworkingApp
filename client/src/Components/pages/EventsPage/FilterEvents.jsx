import { Button } from '@mui/material';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { filterGlobalEvents, getEvents } from "../../../Redux/actions"
import '../Home/FilterPost.css';

const FilterEvents = () => {
    const dispatch = useDispatch();
	const sessionUser = useUserAuth();
	let token = sessionUser.user.accessToken;
	// let email = sessionUser.user.email;
	// const userF = useSelector((state)=> state.myUser)
	// const userFP = useSelector((state)=> state.post)
	// const postF = userF.follows

	const filterGlobal = ()=>{
		dispatch(getEvents(token))
	}
	const filterOnline = ()=>{
		dispatch(filterGlobalEvents("online"))
	}
	const filterPerson = ()=>{
		dispatch(filterGlobalEvents("in-person"))
	}


  return (
    <div>
				<div>
					<Button variant="outlined" onClick={filterPerson}>In-person</Button>
					<Button variant="outlined" onClick={filterGlobal}>ALL</Button>
					<Button variant="outlined" onClick={filterOnline}>Online</Button>
				</div>
    </div>
	)
}

export default FilterEvents