import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.config"

export function UploadProfilePicture(img: any){
    const imgRef = ref(storage, `profilePicture/${img?.name}-${uuidv4()}`)
    return uploadBytes(imgRef, img).then((resp) => {
        return getDownloadURL(imgRef)
    }).catch((err) => {
        console.log(err.message)
    })
}