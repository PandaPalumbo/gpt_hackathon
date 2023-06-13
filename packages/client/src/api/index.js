import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const googleVisionAPI = async () => {
    const docRef = doc(db, "business", "info");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return false;
    }
}

export const GetGPTAdvertisement = async () => {

}
