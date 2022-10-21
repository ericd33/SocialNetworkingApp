import {useState} from 'react';
import {Modal, IconButton, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { grey, yellow } from '@mui/material/colors';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import './CommentsModal.css';

export default function CommentsModal(comments) {
  const [modal, setModal] = useState(false);
  const opencloseModal = () => {
    setModal(!modal);
  };

    const body = (
        <Card className='postCreator' sx={{width: 600, borderRadius:'15px',bgcolor: grey[300], fontFamily: 'Nunito', color:grey[900]}}>
            <CardContent>
                <div className='headerModal'>
                    <h2>Comments</h2>
                    <IconButton sx={{width:'35px', height:'35px', top:'20px'}} onClick={() => opencloseModal()}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                {
                    comments.comments.map(c => {
                        return (
                            <div>
                                <Card sx={{width: 500, bgcolor: grey[300], fontFamily: 'Nunito', color:grey[900]}}>
                                    <CardHeader
                                        sx={{pt: 0, pb: 0, mt:2}}
                                        avatar={
                                        <Avatar sx={{ bgcolor: yellow[500]}} src={c.avatar}>
                                        </Avatar>
                                        }
                                        title={c.name}
                                        subheader="1h"
                                    />
                                    <CardContent sx={{pb:1}}>
                                        {c.text}
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                }
            </CardContent>
        </Card>
    )

    return (
        <div className='container'>
            <IconButton id='ButtonActionPost' onClick={() => opencloseModal()}>
                <ChatBubbleOutlineRoundedIcon/>  
            </IconButton>
            <Modal
            open={modal}
            onClose={opencloseModal}>
                {body}
            </Modal>
        </div>
        {comments.comments.map((c, index) => (
          <div key={`${index}`}>
            <Card
              sx={{
                width: 500,
                bgcolor: grey[300],
                fontFamily: "Nunito",
                color: grey[900],
              }}
            >
              <CardHeader
                sx={{ pt: 0, pb: 0, mt: 2 }}
                avatar={
                  <Avatar sx={{ bgcolor: yellow[500] }} >R</Avatar>
                }
                title={c}
                subheader="1h"
              />
              <CardContent sx={{ pb: 1 }}>{c.text}</CardContent>
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <IconButton onClick={() => opencloseModal()}>
        <ChatBubbleOutlineRoundedIcon />
      </IconButton>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
