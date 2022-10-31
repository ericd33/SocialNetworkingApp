import { Button, Card, CardContent, IconButton, Modal, TextField, Input } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { getMyUser, imageChange, nameChange, presentationChange, webSiteChange } from "../../../../Redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import './EditProfile.css';


export function EditProfile (){
const [modal, setModal] = useState(false);
const opencloseModal = () => {
    setModal(!modal);
  };
const dispatch = useDispatch();
const {user} = useUserAuth();
let token = user.accessToken;
const [name,setName]= useState("")
const [presentation,setPresentation]= useState("")
const [webSite,setWebSite]= useState("")
const [file, setFile]= useState(null)
const [prev, setPrev]= useState(false)
const [img, setImg] = useState({
    email:user.email,
    image:"",
});

const handleWebSite = (e)=>{
    setWebSite(e.target.value);
}
const webSites ={
    email:user.email,
    website:webSite
}
const submit = (e)=>{
	setFile(e.target.files[0])
}

const submitFile = async(e)=>{
	let FILE = file
	const formdata = new FormData()
	formdata.append("imageCloudinary",FILE)
	const Config = {
		method: "post",
		baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/file`,
		headers: {
			authorization: `Bearer ${token}`,
		},
		data: formdata,
	};
	await axios(Config)
	.then((res)=> {
		setImg({
			...img,
			img:`${res.data}`})
			setPrev(true)
	}).catch((err)=>{
		console.log(err)
	})
}

const handleName = (e)=>{
    setName(e.target.value);
}
const handlePresentation = (e)=>{
    setPresentation(e.target.value);
}
const names ={
    email:user.email,
    name:name
}
const presentations ={
    email:user.email,
    presentation:presentation
}
const handleSubmitImage = (e)=>{
    e.preventDefault()
    dispatch(imageChange(img,token,user.email));
    setModal(false);
}
const handleSubmitWebSite = (e)=>{
    e.preventDefault()
    dispatch(webSiteChange(webSites,token,user.email));
    setModal(false);
}
const handleSubmitName = (e)=>{
    e.preventDefault()
    dispatch(nameChange(names,token,user.email));
    setModal(false);
}
const handleSubmitPresentation=(e)=>{
    e.preventDefault()
    dispatch(presentationChange(presentations,token,user.email));
    setModal(false);
}

const body = (
    <Card
      className="ProfileEdit"
      sx={{
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
      }}
    >
        <div className='editProfileCard'>
            <CardContent>
                <div className="headerModal">
                <h2>Edit profile</h2>
                <IconButton
                    id='closeIcon'
                    sx={{ width: "35px", height: "35px", top: "20px",
                    bgcolor:'custom.light' }}
                    onClick={() => opencloseModal()}
                >
                    <CloseIcon sx={{pr:'1px'}}/>
                </IconButton>
                </div>
                <div className="inputsdePerfil">
                    <div>
                        <TextField
                            id="filled-multiline-static"
                            label="Change name"
                            sx={{textUnderlineOffset:0}}
                            value={name}
                            variant="filled"
                            onChange={handleName}
                        />
                        <Button onClick={handleSubmitName} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                            Submit
                        </Button>
                    </div>
                    <div>
                        <TextField
                            id="filled-multiline-static"
                            label="Add a presentation"
                            value={presentation}
                            variant="filled"
                            onChange={handlePresentation}
                        />
                        <Button onClick={handleSubmitPresentation} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                            Submit
                        </Button>
                    </div>

                    <div>
                        <TextField
                            id="filled-multiline-static"
                            label="Add a website:"
                            value={webSite}
                            variant="filled"
                            onChange={handleWebSite}
                        />
                        <Button onClick={handleSubmitWebSite} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                            Submit
                        </Button>
                    </div>
                    <div>
                        <Input type="file" name="imageCloudinary" onChange={(e)=> submit(e) } ></Input>
                        {/* <input type='file' name="imageCloudinary" onChange={(e)=> submit(e) } /> */}
                        <Button variant="outlined" sx={{color:'secondary.main', border:'1px solid #ffd000'}} onClick={(e)=> submitFile(e)}>Image alredy</Button>
                        {/* <button onClick={(e)=> submitFile(e)}>Image alredy</button> */}
                        <Button onClick={handleSubmitImage} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
                            Submit
                        </Button>
                        {prev ? <img src={img.imageCloudinary} className="img"/> : null}
                    </div>
                </div>
            </CardContent>
        </div>
  </Card>
  );

    return(
        <div>
            <Button onClick={() => opencloseModal()} id='assistButton' sx={{bgcolor: 'secondary.main', color:'custom.dark', fontSize:11}} variant="contained">
              Edit profile
              </Button>
            <Modal open={modal} onClose={opencloseModal}>
                {body}
            </Modal>
        </div>
    )
}