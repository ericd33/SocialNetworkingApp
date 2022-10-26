import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Reports from './Reports';
import DeletePost from './DeletePost';
import { useUserAuth } from '../../../context/UserAuthContext';


export default function OptionsPopper(payload) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {user} = useUserAuth();
  console.log(payload);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  if (user.email === payload.payload.author) {
    return (
      <div>
        <IconButton sx={{bgcolor: 'custom.light'}} aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon sx={{color: 'primary.light'}}/>
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            <DeletePost payload={payload}/>
          </Box>
        </Popper>
      </div>
    );
  }
  else {
    return (
      <div>
        <IconButton sx={{bgcolor: 'custom.light'}} aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon sx={{color: 'primary.light'}}/>
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            <Reports payload={payload}/>
          </Box>
        </Popper>
      </div>
    );
  }
}