import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ListPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);

  const [bookData, setBookData] = useState({
    bookname: "",
    isbnNumber: "",
    price: "",
    desc: "",
    coverPic: "",
    file: null,
  });
  console.log("bookData", bookData);
  const [error, setError] = useState();
  function changeHandler(event) {
    const { name, value, files } = event.target;
    if (name === "file") {
      setBookData((prev) => {
        return {
          ...prev,
          coverPic: files[0],
          file: files[0],
        };
      });
    } else {
      setBookData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }
  if (!firebase.isLoggedIn) {
    navigate("/login");
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { bookname, isbnNumber, price, coverPic, desc,  } =
        bookData;
      const res = await firebase.handleCreateNewListing(
      
        bookname,
        isbnNumber,
        price,
        desc,
        coverPic
      );
      toast.success("successfully uploaded");
      setBookData({
      
        bookname: "",
        isbnNumber: "",
        price: "",
        desc: "",
        coverPic: "",
        file: null,
      });
    } catch (err) {
      setError("Error while uploading: " + err.message);
    }
  }
  function closeHandler(e) {
    e.stopPropagation();
    setIsClose(false);
  }

  return (
    <div
      className=" w-11/12 max-w-[450px] relative flex flex-col mx-auto border border-red-500 mt-[100px] p-4 rounded-md"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
      }}
    >
      <span className="absolute right-1 top-2">
        <IoClose onClick={closeHandler} />
      </span>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font-semibold text-gray-700">
            Enter Book Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Book name"
            onChange={changeHandler}
            value={bookData.bookname}
            name="bookname"
            required
            className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="font-semibold text-gray-700">ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Isbn number"
            onChange={changeHandler}
            value={bookData.isbnNumber}
            name="isbnNumber"
            className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="font-semibold text-gray-700">Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            onChange={changeHandler}
            value={bookData.price}
            name="price"
            className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="font-semibold text-gray-700">Desc</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={changeHandler}
            value={bookData.desc}
            name="desc"
            className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="font-semibold text-gray-700">File</Form.Label>
          <Form.Control
            type="file"
            onChange={changeHandler}
            name="file"
            className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
            accept=".jpg,.jpeg,.png"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-full">
          Upload
        </Button>
      </Form>
    </div>
  );
}
export default ListPage;
