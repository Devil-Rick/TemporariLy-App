import { FaLocationDot } from "react-icons/fa6"
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Moment from "react-moment"
import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */

export default function ListCard({ id, listing }) {

    var options = { style: 'currency', currency: 'USD' };

    console.log(listing)
    return (
        <Link target="_blank" to={`category/${listing.property}/${id}`}>
            <div className="bg-slate-100 mx-3 overflow-hidden relative rounded-md shadow-md hover:shadow-xl transition-shadow duration-150">
                <img
                    src={listing.imgUrls[0]}
                    alt="House Image"
                    className="w-[100%] h-[200px] object-cover hover:scale-105 transition-scale duration-200 ease-in"
                    loading="lazy"
                />
                <Moment className="absolute uppercase shadow-lg text-white text-[10px] left-3 rounded-ss-md rounded-ee-md top-4 bg-pink-500 px-2 py-[1px] z-10" fromNow>{listing.timestamp}</Moment>
                <div className="mt-2 p-2">
                    <div className="flex items-center gap-2 mb-2">
                        <FaLocationDot className="text-green-500 h-4 w-4" />
                        <p className="truncate text-gray-500 text-[12px]">{listing.address}</p>
                    </div>
                    <h3 className="truncate mb-2 font-semibold text-gray-900  text-[18px]">{listing.name}</h3>
                    <p className="text-[#f5519d] mb-2">
                        <span>
                            {(listing.offer === true)
                                ? parseFloat(listing.disPrice).toLocaleString('en-US', options)
                                : parseFloat(listing.price).toLocaleString('en-US', options)}
                        </span>
                        <span>{(listing.property === "rent") && <> / Month</>}</span>
                    </p>
                    <div className="flex items-center justify-between">
                        <p className="space-x-2 font-bold">
                            <span>{listing.bed} Bed</span>
                            <span>{listing.bath} Bath</span>
                        </p>

                        <p className="flex items-center justify-between gap-2 text-[16px]">
                            <span className="hover:text-[#5bc42e]"><MdModeEdit /></span>
                            <span className="hover:text-red-600"><RiDeleteBin5Fill /></span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
