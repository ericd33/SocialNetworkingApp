import {useState} from 'react';
import {Modal, TextField, Button, IconButton, Card, CardHeader, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { grey, yellow } from '@mui/material/colors';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import './CreatePost.css';

export default function CreatePost() {
    const [modal, setModal] = useState(false);

    const opencloseModal = () => {
        setModal(!modal);
    }

    const body = (
        <Card className='postCreator' sx={{width: 600, borderRadius:'15px',bgcolor: grey[300], fontFamily: 'Nunito', color:grey[900]}}>
            <CardContent>
                <div className='headerModal'>
                    <h2>Create a post</h2>
                    <IconButton sx={{width:'35px', height:'35px', top:'20px'}} onClick={() => opencloseModal()}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <TextField
                id="outlined-multiline-static"
                label="¿Que estas pensando?"
                multiline
                rows={4}
                defaultValue=""
                className='textField'
                />
                <div align='right'>
                    <Button>Post</Button>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className='container'>
            <IconButton onClick={() => opencloseModal()} id='buttonPost' sx={{bgcolor:yellow[500]}}>
                <PostAddOutlinedIcon sx={{color:grey[800]}}/>  
            </IconButton>
            <Modal
            open={modal}
            onClose={opencloseModal}>
                {body}
            </Modal>
        </div>

    )
}