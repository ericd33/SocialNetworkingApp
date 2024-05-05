import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { sortByLikes } from "../../../Redux/actions"

const FilterLike = () => {
	const dispatch = useDispatch();
	const [_, setOption] = useState(false)

	useEffect(() => {
	}, [dispatch, setOption]);

	function onClickedLike(e) {
		e.preventDefault()
		if (e.target.checked === true) {
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
