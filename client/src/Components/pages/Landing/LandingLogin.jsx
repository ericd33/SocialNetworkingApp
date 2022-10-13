import React,{ useState } from 'react'


const LandingLogin = () => {
   // const dispatch = useDispatch();
    // useEffect(() => {
    // }, [dispatch]);
  
  
    const [input, setInput] = useState({
      email:"",
      password: "",
    });
  
    const [errors, setErrors] = useState({});
  
    function validate(input) {
      let errors = {};
      if (!input.email || !/^[^@]+@[^@]+\.[a-zA-Z]{3,}$/.test(input.email)) {
        errors.email = "invalid e-mail ";
      }
      if (!input.password) {
        errors.password = "invalid password";
      }
      return errors;
    }
  
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      console.log(input)
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      // dispatch(postVideogame(input));
      setInput({
        email:"",
        password: "",
      });
    }
  
    return (
      <div>
        <h1>login</h1>
          <br />
          <div>
            <label>E-mail :</label>
            <input
              type="text"
              value={input.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            {errors.hasOwnProperty("email") ? (
              <p>{errors.email}</p>
            ) : null}
          </div>
          <label>Password :</label>
            <input
              type="text"
              value={input.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
            {errors.hasOwnProperty("password") ? (
              <p>{errors.password}</p>
            ) : null}
            <br/>
            {Object.entries(errors).length > 0 ? (
              <button className="falso">login</button>
            ) : (
              <button onClick={(e) => handleSubmit(e)} className="bueno">
                login
              </button>
            )}
      </div>
    )
}


export default LandingLogin