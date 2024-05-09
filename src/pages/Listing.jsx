import { useState } from "react"

export default function Listing() {

  const [formData, setFormData] = useState({
    property: 'sell',
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
  })

  const { property, name, bed, bath, furnished, parking, address, description, offer, price, disPrice } = formData;

  const modify = () => {

  }

  return (
    <main className="px-3 mx-auto max-w-md">
      <h1 className="text-3xl mt-6 font-extrabold">Create a Listing</h1>
      <form className="mt-5">
        <div className="mb-4">
          <p className="mb-2 font-semibold text-l">Sell / Rent</p>
          <div className="flex-nowrap layout-container">
            <button
              type="button"
              id="property"
              value="sell"
              onClick={modify}
              className={`listing-button ${property === 'rent' ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Sell
            </button>

            <button
              type="button"
              id="property"
              value="rent"
              onClick={modify}
              className={`listing-button ${property === 'sell' ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
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

        <div className="mb-4 flex-nowrap layout-container">
          <div className="mr-7">
            <p className="mb-2 font-semibold text-l">Beds</p>
            <input
              type="number"
              id="bed"
              value={bed}
              className="py-2 px-3 bg-slate-100 rounded text-l transition duration-150 ease-in-out"
              onChange={modify}
              max='20'
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
              onClick={modify}
              className={`listing-button ${parking ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Yes
            </button>

            <button
              type="button"
              id="parking"
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
              className={`listing-button ${furnished ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Yes
            </button>

            <button
              type="button"
              id="furnished"
              onClick={modify}
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
            required
          />
        </div>

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
              className={`listing-button ${offer ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              Yes
            </button>

            <button
              type="button"
              id="offer"
              onClick={modify}
              className={`listing-button ${!offer ? 'bg-slate-600 text-white' : 'bg-slate-100'}`}
            >
              No
            </button>
          </div>
        </div>

        <div className={`mb-4 ${property === 'rent' && 'flex-nowrap layout-container'}`}>
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

        <div className="mb-4 w-full">
          <p className="mb-2 font-semibold text-l">Upload Images</p>
          <p>The first image will be the cover. Max images (6).</p>
          <input
            type="file"
            id="images"
            accept=".jpg, .jpeg, .png"
            // value={images}
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
