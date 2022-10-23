import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getMyUser, getPostsFollows, getPosts } from "../../../Redux/actions"
import axios from "axios";

const FilterPost = () => {
	const dispatch = useDispatch();
	const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  let email = sessionUser.user.email;
	const userF = useSelector((state)=> state.myUser)
	const userFP = useSelector((state)=> state.post)
	const postF = userF.follows
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		dispatch(getMyUser(token,email))
		console.log(userFP)
		console.log(userF)
  },[dispatch,isChecked]);



	const postFollows = () =>{
		setIsChecked(true)
		postF.map((f)=>{
			dispatch(getPostsFollows(token, f))
		})
	}

	const postGlobal = () =>{
		setIsChecked(false)
		dispatch(getPosts(token))
	}


  return (
    <div>
			<div>
				<button onClick={postGlobal} >Global</button>
				<button onClick={postFollows} >follows</button>
			{
				isChecked ? <h1>follows</h1> : <h1>Global</h1>
			}
			</div>
    </div>
	)
}

export default FilterPost