import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 as uuidv4 } from "uuid"; // uuid importunu düzelt

const upload = async (file) => {
  // 1) Dosya geçerli değilse veya dosya türü resim değilse fonksiyonu durdur
  try{
  if (!file || !file.type.startsWith("image")) {
    console.error("Invalid file or file type is not an image.");
    return null;
  }

  
    // 2) Dosyanın yükleneceği konumun referansını al
    const imageRef = ref(storage, `images/${uuidv4()}_${file.name}`);

    // 3) Referansa dosyayı yükle
    await uploadBytes(imageRef, file);

    // 4) Yüklenen dosyanın URL'ini al ve return et
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export default upload;
