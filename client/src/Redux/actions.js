import axios from "axios";

export function postUser(payload) {
    return function () {
      axios.post("http://localhost:3001/user", payload)
      .then(function(response) {console.log(response)})
      .catch(function(err) {console.log(err)});
    };
  }

