import axios from "axios";

export function postUser({name,email,password}) {
    return function () {
      axios.post("http://localhost:3001/user", {
          name,
          email,
          password
        })
      .then(function(response) {console.log(response)})
      .catch(function(err) {console.log(err)});
    };
  }

