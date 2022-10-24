import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getMyUser, getPostsFollows, getPosts } from "../../../Redux/actions"
import './FilterPost.css';

const FilterPost = () => {
	const dispatch = useDispatch();
	const sessionUser = useUserAuth();
	let token = sessionUser.user.accessToken;
	let email = sessionUser.user.email;
	const userF = useSelector((state)=> state.myUser)
	const userFP = useSelector((state)=> state.post)
	const postF = userF.follows

	useEffect(() => {
		dispatch(getMyUser(token,email))
		// console.log(userFP)
		// console.log(userF)
  },[dispatch]);

	function onClicked(e) {
		// console.log(e.target.checked);
		if(e.target.checked === true) {
			postF.map((f)=>{
				dispatch(getPostsFollows(token, f))
			})
		}
		else {
			dispatch(getPosts(token))
		}
	  }


  return (
    <div>
		<div className="wrap-toggle">
            <label>Global</label>
            <input type='checkbox' onClick={onClicked} id='toggle' className="offscreen"></input>
            <label for='toggle' className="switch"></label>
			<label>My follows</label>
        </div>
    </div>
	)
}

export default FilterPost