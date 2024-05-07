import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const navigate = useNavigate();

    const google = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();

            const res = await signInWithPopup(auth, provider)
            const user = res.user;
            const docRef = doc(db, 'users', user.uid)

            await setDoc(docRef, {
                fullName: user.displayName,
                email: user.email,
                timestamp: serverTimestamp()
            })

            navigate('/')
            toast.success('Successfully added user')

        } catch (error) {
            toast.error('Google authorization error')
        }
    }

    return (
        <button type="button" onClick={google} className="layout-container bg-red-500 w-full text-white py-2 mb-4 
            font-medium rounded uppercase shadow-md hover:shadow-lg transition 
            duration-150 ease-in-out hover:bg-red-700 active:bg-red-900">
            <span className="mr-3 bg-white rounded-full p-[2px]"><FcGoogle /></span>
            <span>Continue With Google</span>
        </button>
    )
}
