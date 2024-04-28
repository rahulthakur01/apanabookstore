import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function Register({ isLoggedIn, setIsLoggedIn }) {
  const firebase = useFirebase();
  const navigate = useNavigate();
const [close, setClose] = useState(false)
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
    try {
      const { email, password } = formData;
      const result = await firebase.signup(email, password);
      toast.success("Account Created");
      setIsLoggedIn(true);
      // console.log("signup completed", result);
      // setformdata empty after signup
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error during signup", error);
    }
  }
function closeHandler(){
  
}
 

  console.log(firebase);
  return (
    <div className="register w-11/12 max-w-[450px] relative flex flex-col mx-auto border border-red-500 mt-[100px] p-4 rounded-md">
      <span className="absolute top-2 right-2 cursor-pointer" >
        <IoClose onClick={closeHandler}/>
      </span>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font-semibold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={changeHandler}
            value={formData.email}
            name="email"
            required
            
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="font-semibold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            value={formData.password}
            name="password"
          />
        </Form.Group>

        <button
          onClick={firebase.signInWithGoogle}
          className="bg-red-500 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6 w-full"
        >
          Sign up
        </button>
      </Form>
    </div>
  );
}
export default Register;
