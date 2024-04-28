import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { IoClose } from "react-icons/io5";

function Login() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [blank, setBlank] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("sign in a user...");
    try {
      const { email, password } = formData;
      const result = await firebase.login(email, password);
      console.log("signin successfully completed", result);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error during signin", error);
    }
  }
  function handleBackgroudClick(e) {
    if (e.target === e.currentTarget) {
    
    }
  }
  

  // console.log(firebase);
  return (
    <div
      className=" w-11/12 max-w-[450px] relative flex flex-col mx-auto border border-red-500 mt-[100px] p-4 login rounded-md"
      onClick={handleBackgroudClick}
    >
 
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={changeHandler}
            value={formData.email}
            name="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            value={formData.password}
            name="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-full">
          Login
        </Button>
      </Form>
      <div className="flex w-full items-center my-2 gap-x-2">
        <div className="w-full h-[1px] bg-gray-200"></div>
        <p className="text-richblack-700 font-medium leading[1.375rem]">OR</p>
        <div className="w-full h-[1px] bg-gray-200"></div>
      </div>
      <button
        onClick={firebase.signInWithGoogle}
        className="bg-red-500 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6'"
      >
        Sign with Google
      </button>
    </div>
  );
}
export default Login;

// async function handleSubmit(e) {
//   e.preventDefault();
//   const { email, password } = formData;
//   console.log("signup");
//   const result = await firebase.signup(email, password);
//   console.log("singup completed", result);
// }
