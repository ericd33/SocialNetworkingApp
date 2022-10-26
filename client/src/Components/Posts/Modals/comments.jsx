import { Avatar, Card, CardHeader } from "@mui/material"
import React from "react"
import { useDispatch } from "react-redux"
import { useUserAuth } from "../../../context/UserAuthContext"
import { banComments } from "../../../Redux/actions"

export function Comments({avatar,name,text,id,enabled}){
    const dispatch = useDispatch()
    const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const userE = JSON.parse(localStorage.getItem('user'));

    const handleBan=(e)=>{
        e.preventDefault(e)
        if(enabled){
          let data = {
          id:id,
          action:"disable"
        }
        dispatch(banComments(data,token))
      }else{
        let data = {
          id:id,
          action:"enable"
        }
        dispatch(banComments(data,token))
      }
    }

    return(<Card
        sx={{
          width: 440,
          bgcolor: 'custom.light',
          fontFamily: "Nunito",
          color: 'primary.light',
          borderRadius:'15px',
          height:'55px',
          mb:'10px'
        }}
      >
        {
          userE.role==='admin'
          ?<div><button onClick={handleBan}>ban</button><span style={{color:"#fff"}}>{enabled? "true":"false"}</span></div>
          :<></>
        }
        <CardHeader
          sx={{ pt: '8px', color:'secondary.main'}}
          avatar={
            <Avatar
        imgProps={{ referrerPolicy: "no-referrer" }}
        sx={{ bgcolor: "primary.light",mb:'10px'}}
        src={avatar}
      ></Avatar>
          }
          title={name}
          subheader={<p className='textComment'>{text}</p>}
        />
      </Card>)
}