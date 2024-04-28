import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import CardGroup from "react-bootstrap/CardGroup";
import Cards from "../components/Cards";
import PdfCard from "../components/PdfCard";
import { useNavigate } from "react-router-dom";

function HomePage(props) {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfFile, setPdfFile] = useState([]);
  // console.log(pdfFile);
  //   useEffect(() => {
  //     //*for pdfs
  //     if(!firebase.isLoggedIn){
  //       navigate("/login")
  //     }
  //     else{

  //     firebase
  //     .listAllPDFs()
  //     .then((pdfDoc) => {
  //       setPdfFile(pdfDoc.docs.map(doc => doc.data()));
  //       const data = pdfDoc.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setPdfFile(pdfDoc.docs)
  //       setPdfFile(data)
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching PDFs: ", error);
  //       setError("Failed to fetch PDFs. Please try again later.");
  //       setLoading(false);
  //     });

  //   //*for cards
  //   firebase
  //     .listAllBooks()
  //     .then((books) => {
  //       const bookData = books.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setBooks(bookData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching books: ", error);
  //       setLoading(false);
  //     });
  // }, [firebase]);

  // function toggleCardPdf() {
  //   setShowPdf((prevShowPDF) => !prevShowPDF);
  // } }

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      // Check if user is not logged in
      navigate("/login"); // Redirect to login page
    } else {
      //* Fetching data if user is logged in
      firebase
        .listAllPDFs()
        .then((pdfDoc) => {
          setPdfFile(pdfDoc.docs.map((doc) => doc.data()));
          const data = pdfDoc.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPdfFile(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching PDFs: ", error);
          setError("Failed to fetch PDFs. Please try again later.");
          setLoading(false);
        });

      //* Fetching books data
      firebase
        .listAllBooks()
        .then((books) => {
          const bookData = books.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBooks(bookData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching books: ", error);
          setLoading(false);
        });
    }
  }, [firebase, navigate]);

  function toggleCardPdf() {
    setShowPdf((prevShowPDF) => !prevShowPDF);
  }

  return (
    <div className="Container mt-[50px] h-full">
      <div>
        <button
          onClick={toggleCardPdf}
          className="font-semibold capitalize text-xl"
        >
          {showPdf ? "show-cards" : "show-pdfs"}
        </button>
      </div>
      {loading ? (
        <h1 className="flex justify-center mt-[100px] text-xl font-bold">
          Loading...
        </h1>
      ) : (
        <div className="">
          {showPdf ? (
            <div>
              <div>
                <h2>PDF Documents</h2>
                {pdfFile.map((url, index) => (
                  <div key={index}>
                    <PdfCard key={index} url={url} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <CardGroup>
              {books.map((book, index) => (
                <div div className="flex" key={index}>
                  <Cards
                    imageUrl={book.imageUrl || placeholderImageUrl}
                    link={`/book/view/${book.id}`}
                    {...book}
                    id={book.id}
                    key={book.id}
                  />{" "}
                </div>
              ))}
            </CardGroup>
          )}
        </div>
      )}
    </div>
  );
}
export default HomePage;

// firebase.listAllBooks().then((books) => setBooks(books.docs));
// firebase.listAllBooks().then((docs)=>console.log(docs.docs[0].data()))
// const bookData = books.docs.map((doc) => doc.data());\

{
  /* <CardGroup>
{books.map((book, index) => (
  <div div className="flex" key={index}>
    <Cards
      link={`/book/view/${book.id}`}
      {...book}
      id={book.id}
      key={book.id}
    />{" "}
  </div>
))}
</CardGroup> */
}

// const urls = pdfDoc.docs.map((doc) => doc.data().path);
// setPdfFile(pdfDoc.docs.map(doc => doc.data().url));
// console.log(pdfDoc.docs[0].data());
// setPdfFile(pdfDoc.docs.data());
// const urls = pdfDoc.map(doc => doc.data().path); // Extracting the URL from each document
// setPdfFile(urls);
