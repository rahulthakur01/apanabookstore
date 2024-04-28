import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Form from "react-bootstrap/Form";
import {toast} from "react-hot-toast"

function DetailPage() {
  const param = useParams();
  const firebase = useFirebase();
  const [bookData, setBookData] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [url, setUrl] = useState(null);
  // console.log(param);
  console.log(bookData);
  useEffect(() => {
    firebase
      .getBookById(param.bookId)
      .then((value) => {
        const data = value.data();
        setBookData(data);

        if (data && data.imageUrl) {
          firebase
            .getImageUrl(data.imageUrl)
            .then((url) => {
              setUrl(url);
            })
            .catch((error) => console.error("Error getting image URL:", error));
        }
       
      })
      
      .catch((error) => {
        console.error("Error getting document", error);
      });
  }, [firebase, param.bookId]);

  const placeOrder = async () =>{
    const response = await firebase.placeOrder(param.bookId, quantity)
    toast.success("Order placed")

  }
  return (
    <div className="mt-[90px] border border-red-700 h-auto mx-10 p-10">
      {bookData ? (
        <div className="mt-4">
          <img src={url} alt="Book Cover"className="w-[200px] h-auto object-cover" />
          <h2 className="text-2xl text-gray-700 font-semibold mt-2">Details</h2>
          <h3 className="text-gray-700 font-semibold text-lg text-left truncate mt-1">Book name : {bookData.name}</h3>
          <p className="text-gray-700 font-semibold text-lg text-left truncate mt-1">ISBN: {bookData.isbn}</p>
          <p className="text-green-600 font-semibold">Price: {bookData.price}</p>
          <p className="text-gray-700 font-semibold text-lg text-left truncate mt-1">Email: {bookData.userEmail}</p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
           
            <Form.Control
              type="Number"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              value={quantity}
              required
            />
          </Form.Group>
          <button onClick={placeOrder}
           className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
           text-[12px] p-1 px-3 uppercase 
           hover:bg-gray-700
           hover:text-white transition duration-300 ease-in"
          >Buy Now</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default DetailPage;
