import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
    return (
        <button className="layout-container bg-red-500 w-full text-white py-2 mb-4 
            font-medium rounded uppercase shadow-md hover:shadow-lg transition 
            duration-150 ease-in-out hover:bg-red-700 active:bg-red-900">
            <span className="mr-3 bg-white rounded-full p-[2px]" ><FcGoogle /></span>
            <span>Continue With Google</span>
        </button>
    )
}
