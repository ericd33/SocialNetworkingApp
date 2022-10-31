import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../../context/UserAuthContext";
import Follow from "../../Home/follow";
import { Link } from "react-router-dom";


export default function FollowedsModal({followeds}) {
  const [modal, setModal] = useState(false);
  const userE = JSON.parse(localStorage.getItem('user'));

  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };

  const body = (
    <Card
      className="followersList"
      sx={{
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Followeds</h2>
          <IconButton
            id='closeIcon'
            sx={{ width: "35px", height: "35px", top: "20px",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{pr:'1px'}}/>
          </IconButton>
        </div>
        <div id='boxFollowers'>
        {followeds?.map((u) => {
            // console.log(u);
              return (
                <Card
                        className="cardFollower"
                        sx={{
                        bgcolor: 'custom.light',
                        color: 'custom.dark',
                        m:1,
                        borderRadius:3

                        }
                    }
                    >
                        <Link to={`/profile/${u.email}`}><CardHeader
                        sx={{ p: 1 , color:'primary.light'}}
                        avatar={
                            <Avatar
                            src={u.avatar}
                            ></Avatar>
                        }
                        title={u.name}
                        /></Link>
                        {
                            (userE.email===u.email)
                            ? <div></div>
                            : <Follow email={u.email}/>
                        }
                    </Card>
              )
            }
        )}
      </div>
    </CardContent>
  </Card>
  );

  return (
    <div className="container">
      <p onClick={() => opencloseModal()} className="plusText">Followeds</p>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
