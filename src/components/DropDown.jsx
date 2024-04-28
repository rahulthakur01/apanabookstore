import { useNavigate } from "react-router-dom";

function DropDown({ setShowDropIcon }) {
  const navigate = useNavigate();

  function navigation() {
    navigate("/document");
  }

  return (
    <div className=" relative  " style={{ zIndex: 1000 }}>
      <div className="absolute top-7 w-[8rem] left-0 border  outline-none  ">
        <ul className="flex flex-col p-2 list-group list-group-flush ">
          <li className="text-black list-group-item cursor-pointer" onClick={navigation}>
            BCA
          </li>

          <li className="text-black list-group-item">BBA</li>
        </ul>
      </div>
    </div>
  );
}
export default DropDown;

{
  /* <ul className="list-group list-group-flush">
<li className="list-group-item">Item 1</li>
<li className="list-group-item">Item 2</li>
<li className="list-group-item">Item 3</li>
</ul> */
}
