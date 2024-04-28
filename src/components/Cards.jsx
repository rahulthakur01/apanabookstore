import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function Cards(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    firebase.getImageUrl(props.imageUrl).then((url) => setUrl(url));
  }, [firebase, props.imageUrl]);
  // console.log(url);
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 m-4">
        <div className="relative w-[280px] h-[300px] overflow-hidden">
          <img src={url} className="w-full h-full object-cover" alt="Product" />
        </div>
        <div className="flex flex-col ">
          <p className="capitalize text-gray-800 font-semibold">{props.name}</p>
          <p className=" text-gray-800 font-semibold">Price: {props.price}$</p>
          <p className=" text-gray-800 font-semibold">Desc -{props.desc}</p>
        </div>
        <Button
          onClick={(e) => navigate(props.link)}
          variant="primary"
          className="w-full mt-2"
        >
          view
        </Button>
      </div>
    </div>
  );
}
export default Cards;
