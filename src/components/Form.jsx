import { Link } from "react-router-dom";
import OAuth from "./OAuth";


// eslint-disable-next-line react/prop-types
export default function FormComponent({page, linkPara, text, work , link, pass}) {


    return (
        <>
            <div className="justify-between layout-container mb-6">
                <p>{text}
                    <span className="text-red-600 font-semibold hover:text-red-800 transition duration-200 ease-in-out">
                        <Link to={link}>
                            &nbsp;{work}
                        </Link>
                    </span>
                </p>
                <p className="text-blue-700 font-semibold hover:text-blue-900 transition duration-200 ease-in-out">
                    <Link to={linkPara}>
                        {pass}</Link>
                </p>
            </div>

            <button className="bg-blue-500 w-full text-white py-2 mb-4 
            font-medium rounded uppercase shadow-md hover:shadow-lg transition 
            duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-900" type="Submit">
                {page}
            </button>

            <div className="flex items-center before:border-gray-500  before:border-t before:flex-1 
            after:border-t after:flex-1 after:border-gray-500 mb-4">
                <p className="text-center font-semibold mx-4">OR</p>
            </div>

            <OAuth />
        </>
    );
}
