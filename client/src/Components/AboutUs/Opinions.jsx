import { Avatar, Card, CardHeader } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const Opinions = ({ opinions }) => {
	return (
		<div className='opinionContainer'>
			{opinions?.map((u) => {
				return (
					<div id='commentCard'>
						<Card
							className="cardOpinion"
							sx={{
								bgcolor: "custom.light",
								fontFamily: "Nunito",
								color: "primary.light",
								borderRadius: "15px",
								mb: "10px",
							}}>

							<Link to={`/profile/${u.email}`}>
								<CardHeader
									sx={{ pt: "8px", color: "secondary.main" }}
									avatar={
										<Avatar src={u.avatar}>
										</Avatar>
									}
									title={u.name}
									subheader='.'
								/>
							</Link>
							<p id='textComment'>{u.text}</p>
						</Card>
					</div>
				)
			}
			)}
		</div>
	)
}

export default Opinions
