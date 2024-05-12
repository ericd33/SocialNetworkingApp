import {
  Button,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { favorite } from "../../../Redux/actions";


export default function Reports({ payload }) {
  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()
  console.log(payload)

  const handleSubmit = (r) => {
    r.preventDefault()
    let data = {
      id: payload.id,
      email: sessionUser.user.email,
    }
    dispatch(favorite(data, token))
  }

  return (
    <div className="container">
      <Button sx={{ color: 'custom.dark' }} onClick={handleSubmit}>
        Add favorite
      </Button>
    </div>
  );
}
