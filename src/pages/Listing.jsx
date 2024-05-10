import { useState } from "react"
import Spinner from "../components/spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// Firebase Imports
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";


export default function Listing() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [geoLocation, setGeoLocation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    property: 'rent',
    name: '',
    bed: 1,
    bath: 1,
    parking: false,
    furnished: true,
    address: '',
    description: '',
    offer: true,
    price: 0,
    disPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })

  const { property, name, bed, bath, furnished, parking, address, description, offer, price, disPrice, images, longitude, latitude } = formData;

  const modify = (e) => {
    let bool = null;

    if (e.target.value === "true") {
      bool = true;
    }
    if (e.target.value === "false") {
      bool = false;
    }

    if (e.target.files) {
      setFormData( // Files (images) handling
        {
          ...formData,
          images: e.target.files
        }
      )
    }

    if (!e.target.files) {
      setFormData(
        {
          ...formData,
          [e.target.id]: bool ?? e.target.value
        }
      )
    }
  }

  const addListing = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(images);

    if (disPrice >= price) { // Validating price and discounted price
      setLoading(false);
      toast.error('Discount Amount cannot be greater than Original Price.');
      return;
    }

    if (images.length > 6) { // Validating number of image uploads for a single listing
      setLoading(false);
      toast.error('Exceeded max Image Count');
      return;
    }

    //Getting and Validating the longitude and latitude for the map component
    let getGeolocation = {};

    if (geoLocation) {
      const options = { //parameters for API request
        method: 'GET',
        url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
        params: {
          address: address,
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_GEOLOCATION_API_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_GEOLOCATION_HOST_KEY
        }
      };

      try {
        const response = await axios.request(options);
        const data = response.data;
        console.log(data);
        if (data.results.length == 0) {
          setLoading(false);
          toast.error('Enter Full Address');
          return;
        }
        getGeolocation.lat = data.results[0].location.lat;
        getGeolocation.lng = data.results[0].location.lng;
      } catch (error) {
        setLoading(false);
        setGeoLocation(false);
        toast.error('Enter correct co-ordinates Longitude and Latitude');
        return;
      }
    } else {
      getGeolocation.lat = latitude;
      getGeolocation.lng = longitude;
    }

    // Storing the images in the storage of firebase
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      console.log(error.message);
      toast.error("Images not uploaded");
      return;
    });


    // uploading data to users db
    const formDataCopy = {
      ...formData,
      imgUrls,
      getGeolocation,
      timestamp : serverTimestamp(),
      userRef: auth.currentUser.uid,
    }
    delete formDataCopy.images
    !formDataCopy.offer && delete formDataCopy.disPrice
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    
    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false);

    toast.success('Listing Created Successfully')
    navigate(`/category/${formDataCopy.property}/${docRef.id}`)
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="px-3 mx-auto max-w-md">
      <h1 className="text-3xl mt-6 font-extrabold">Create a Listing</h1>
      <form className="mt-5" onSubmit={addListing}>
        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Sell / Rent</p>
          <div className="flex-nowrap layout-container">
            <button
              type="button"
              id="property"
              value="sell"
              onClick={modify}
              className={`listing-button ${property === 'sell' ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Sell
            </button>

            <button
              type="button"
              id="property"
              value="rent"
              onClick={modify}
              className={`listing-button ${property === 'rent' ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Rent
            </button>
          </div>

        </div>

        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Full Name</p>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Full Name..."
            className="w-full py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
            onChange={modify}
            maxLength='32'
            minLength='4'
            required
            autoComplete="name"
          />
        </div>

        <div className="mb-4 flex">
          <div className="mr-7">
            <p className="mb-2 font-semibold text-l">Beds</p>
            <input
              type="number"
              id="bed"
              value={bed}
              className="py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
              onChange={modify}
              max='20'
              min='1'
              required
            />
          </div>
          <div>
            <p className="mb-2 font-semibold text-l">Baths</p>
            <input
              type="number"
              id="bath"
              value={bath}
              className="py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
              onChange={modify}
              max='20'
              min='1'
              required
            />
          </div>

        </div>

        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Parking Spot</p>
          <div className="flex-nowrap layout-container">
            <button
              type="button"
              id="parking"
              value={true}
              onClick={modify}
              className={`listing-button ${parking ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Yes
            </button>

            <button
              type="button"
              id="parking"
              value={false}
              onClick={modify}
              className={`listing-button ${!parking ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              No
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Furnished</p>
          <div className="flex-nowrap layout-container">
            <button
              type="button"
              id="furnished"
              onClick={modify}
              value={true}
              className={`listing-button ${furnished ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Yes
            </button>

            <button
              type="button"
              id="furnished"
              onClick={modify}
              value={false}
              className={`listing-button ${!furnished ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              No
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Full Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            placeholder="Full Address..."
            className="w-full py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
            onChange={modify}
            autoComplete="Address"
            required
          />
        </div>

        {!geoLocation &&
          <div className="mb-4 flex">
            <div className="mr-7">
              <p className="mb-2 font-semibold text-l">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                className="py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
                onChange={modify}
                min='-90'
                required
              />
            </div>
            <div>
              <p className="mb-2 font-semibold text-l">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                className="py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
                onChange={modify}
                min='-180'
                required
              />
            </div>
          </div>
        }

        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            placeholder="Description..."
            className="w-full py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
            onChange={modify}
            required
          />
        </div>

        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Offer</p>
          <div className="flex-nowrap layout-container">
            <button
              type="button"
              id="offer"
              onClick={modify}
              value={true}
              className={`listing-button ${offer ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Yes
            </button>

            <button
              type="button"
              id="offer"
              onClick={modify}
              value={false}
              className={`listing-button ${!offer ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              No
            </button>
          </div>
        </div>

        <div className={`mb-4 ${property === 'rent' && 'flex items-end'}`}>
          <div className="mr-7">
            <p className="mb-2 font-semibold text-l">Regular Price</p>
            <input
              type="number"
              id="price"
              value={price}
              className="py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
              onChange={modify}
              min='40'
              required
            />
          </div>
          {property === 'rent' &&
            <p className="mb-2 font-semibold text-l">
              $ / Month
            </p>
          }
        </div>

        {offer &&
          <div className="mb-4">
            <p className="mb-2 font-semibold text-l">Discounted Price</p>
            <input
              type="number"
              id="disPrice"
              value={disPrice}
              className="py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
              onChange={modify}
              required
            />
          </div>
        }

        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Upload Images</p>
          <p>The first image will be the cover. Max images (6).</p>
          <input
            type="file"
            id="images"
            accept=".jpg,.png,.jpeg"
            className="mt-1 py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
            onChange={modify}
            multiple
            required
          />
        </div>

        <button className="bg-blue-500 w-full text-white py-2 mb-4 
            font-medium rounded uppercase shadow-md hover:shadow-lg transition 
            duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-900" type="submit">
          create Listing
        </button>
      </form>
    </main>
  )
}
