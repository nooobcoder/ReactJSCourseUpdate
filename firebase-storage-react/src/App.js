import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import './App.css';
import { storage } from './firebase';


export default function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return null;

    const storageRef = ref(storage, `files/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    // console.log(snapshot);
    if (snapshot) {
      e.target[0].value = null;
      const url = await getDownloadURL(storageRef)
      console.log(url);
    }
  }

  return (
    <div className='App'>
      <div className="app" name="upload_file">
        <form className='app__form' onSubmit={handleSubmit}>
          <input type="file" />
          <button type="submit" className="button" onClick={e => e.preventDefault()}>Upload</button>
        </form>
      </div>
    </div >
  );
}
