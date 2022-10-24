import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { getEventProfile, getEventsByAuthor } from "../../../../Redux/actions"
import { useParams } from 'react-router-dom';
import '../../Home/FilterPost.css';

const FilterEventsProfile = ({userInfoRen}) => {
	const {user} = useUserAuth();
  const dispatch = useDispatch()
	let token = user.accessToken
	let assistEvents = userInfoRen.asistEvent
	let query = useParams();
	let author = query.email
	

	function onClicked(e) {
		if(e.target.checked === true) {
			assistEvents.map((ev)=>{
				dispatch(getEventProfile(token,ev))
			})
		} else{
			dispatch(getEventsByAuthor(token,author))
		}
	  }


  return (
    <div>
		<div className="wrap-toggle">
            <label> My Events </label>
            <input type='checkbox' onClick={onClicked} id='toggle' className="offscreen"></input>
            <label for='toggle' className="switch"></label>
						<label>Events i`ll attend</label>
        </div>
    </div>
	)
}

export default FilterEventsProfile