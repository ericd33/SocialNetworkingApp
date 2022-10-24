import React, {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getMyUser, sortByComents, getPosts } from "../../../Redux/actions"
import './FilterPost.css';

const FilterComments = () => {
  const dispatch = useDispatch();
	const sessionUser = useUserAuth();
	let token = sessionUser.user.accessToken;


  function onClickedComments(e) {
		console.log(e.target.checked)
		if(e.target.checked === true) {
			dispatch(sortByComents(true))}
	  }


  return (
    <div>
		<div className="wrap-toggle">
            <label>More Comments</label>
            <input type='checkbox' onClick={onClickedComments} id='toggle' className="offscreen"></input>
            <label for='toggle' className="switch"></label>
        </div>
    </div>
	)
}

export default FilterComments