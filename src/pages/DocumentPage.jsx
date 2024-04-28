import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function DocumentPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    subject: "",
    year: "",
    file: null,
  });
  function changeHandler(event) {
    const { name, type, value, files } = event.target;
    if (name === "file") {
      setBookData((prev) => {
        return {
          ...prev,
          [name]: files ? files[0] : value,
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
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // const filePath = await firebase.handlePDFUpload(bookData.file);
      // console.log("PDF uploaded successfully. File path:", filePath);
      const {subject, year, file} = bookData;
      firebase.handlePDFUpload(subject, year, file)

      setBookData({
        subject: "",
        year: "",
        file: null,
      });
      toast.success("PDF uploaded successfully");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Failed to upload PDF. Please try again later.");
    }
  }
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          return;
        }
      }}
    >
      <div className=" w-11/12 max-w-[450px] relative flex flex-col mx-auto border border-red-500 mt-[100px] p-4 rounded-md document-page">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-[1rem] font-semibold mb-2 text-gray-700 ">Enter subject name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject name"
              onChange={changeHandler}
              value={bookData.subject}
              name="subject"
              required
              className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="font-semibold text-gray-700">Year</Form.Label>
            <Form.Control
              type="date"
              placeholder="Year"
              onChange={changeHandler}
              value={setBookData.year}
              name="year"
              className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="font-semibold text-gray-700">File</Form.Label>
            <Form.Control
              type="file"
              onChange={changeHandler}
              value={setBookData.file}
              name="file"
              className="w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-full capitalize">
            upload
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default DocumentPage;
