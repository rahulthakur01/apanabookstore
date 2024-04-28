import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
function OrderPage() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firebase.isLoggedIn && firebase.user) {
      const userid = firebase.user.uid;
      firebase.fetchMyBooks(userid).then((books) => {
        if (books) {
          setBooks(books.docs);
          console.log(books);

          setLoading(false);
        } else {
          console.log(
            "User is not logged in or there was an error fetching books."
          );
          setLoading(false);
        }
      });
    }
  }, [firebase.isLoggedIn, firebase.user]);

  if (!firebase.isLoggedIn) return;

  return (
    <div className="mt-[85px] ">
      {loading ? (
        <h1 className="text-xl font-bold">Loading...</h1>
      ) : (
        <div>
          <div className="relative">
            <h2 className="text-xl font-semibold ml-6 ">Orders</h2>
            <div className="w-[70px] h-[2px] bg-red-950 absolute left-6"></div>
          </div>

          {books.length > 0 ? (
            <div className="flex items-center ">
              {books.map((book) => (
                <Cards
                  link={`/books/orders/${book.id}`}
                  {...book.data()}
                  id={book.id}
                  key={book.id}
                />
              ))}
            </div>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default OrderPage;
