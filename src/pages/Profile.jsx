import { useEffect, useState } from "react";

// Imports for Authorization and Editing functionality using firebase authentication
import { getAuth } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import UpdateProfile from "../components/UpdateProfile";
import ListingCard from "../components/ListingCard";

export default function Profile() {
  const auth = getAuth();

  const [myListing, setMyListing] = useState();
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
      );
      const querySnapshot = await getDocs(q);

      let listing = []
      querySnapshot.forEach((snap) => (
        listing.push({ id: snap.id, data: snap.data() })
      ))

      setMyListing(listing);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid])

  return (
    <>
      <section className="text-center">
        <h1 className="text-3xl mt-6 font-extrabold">My Profile</h1>
        <UpdateProfile />
        {!loading && myListing.length > 0 &&
          <>
          <h2 className="text-2xl mt-6 font-extrabold">My Listings</h2>
          <ul>
            {myListing.map((item, index) => (
              <ListingCard key={index} id={item.id} listing={item.data}/>
            ))}
          </ul>
          </>
        }
      </section>
    </>
  )
}
