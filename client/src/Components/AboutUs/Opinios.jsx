import React from 'react'

const Opinios = ({opinios}) => {
  return (
    <div>
       { opinios.length !==0 ? 
			 opinios.map((o)=>{
				return(
					<div>
					{/*<img src={o.avatar} />*/}
					<p>{o.name}</p>
					<p>{o.text}</p>
					</div>
				)
			 })
			 :  
			 <div className="List">
			 <div className="wrapper">
				 <div className="circle"></div>
				 <div className="circle"></div>
				 <div className="circle"></div>
				 <div className="shadow"></div>
				 <div className="shadow"></div>
				 <div className="shadow"></div>
			 </div>
		 </div> }
    </div>
  )
}

export default Opinios