import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getMyUser, sortByLikes, getPosts } from "../../../Redux/actions"
// import './FilterPost.css';

const FilterLike = () => {
	const dispatch = useDispatch();
	const sessionUser = useUserAuth();
	let token = sessionUser.user.accessToken;
	let email = sessionUser.user.email;
	const [option,setOption] = useState(false)

	useEffect(() => {
	},[dispatch,setOption]);

  function onClickedLike(e) {
		e.preventDefault()
		if(e.target.checked === true) {
			dispatch(sortByLikes(true))
			setOption(true)
		}
	  }


  return (
    <div>
		<div className="wrap-toggle">
            <label>More Likes</label>
            <input type='checkbox' onClick={onClickedLike} id='toggle' className="offscreen"></input>
            <label for='toggle' className="switch"></label>
        </div>
    </div>
	)
}

export default FilterLike