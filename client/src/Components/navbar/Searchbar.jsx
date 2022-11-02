import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../context/UserAuthContext";
import { searchUsersByName } from "../../Redux/actions";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Follow from "../pages/Home/follow";
import './Searchbar.css';

export default function Searchbar({idPost}) {
  const [modal, setModal] = useState(false);
  const userE = JSON.parse(localStorage.getItem('user'));
  let users_finded = useSelector((state) => state.searchByNameUsers);

  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };

  const handleInputPersons = (e) => {
    dispatch(searchUsersByName(e.target.value, token));
  };

  const body = (
    <Card
      className="commentsList"
      sx={{
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
      }}
    >
      <CardContent>
        <div className="headerModal">
        <TextField
            id="barrabusqueda"
            label="Search for users"
            onChange={handleInputPersons}
        />
          <IconButton
            id='closeIcon'
            sx={{ width: "35px", height: "35px", top: "5px",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{pr:'1px'}}/>
          </IconButton>
        </div>
        
        <div className='resultsSearch'>
            <h2>Results</h2>
            <div className="finded-persons">
                {typeof users_finded === "object" && users_finded.length !== 0 ? (
                users_finded.map((u) => {
                    return (
                    <Card
                        className="cardFinded"
                        sx={{
                        width: 180,
                        bgcolor: 'custom.light',
                        color: grey[900],
                        m:1,
                        borderRadius:3

                        }
                    }
                    >
                        <Link to={`/profile/${u.email}`}><CardHeader
                        sx={{ p: 1 , color:'primary.light'}}
                        avatar={
                            <Avatar
                            src={u.image}
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
                    );
                })
                ) : (
                <div></div>
                )}
            </div>
        </div>
    </CardContent>
  </Card>
  );

  return (
    <div className="containerSearch">
        <IconButton sx={{width:'35px'}} onClick={() => opencloseModal()}>
            <SearchIcon sx={{m:0}} color="secondary" />
        </IconButton>
      <Modal sx={{m:0}} open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
