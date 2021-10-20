import { useState, useEffect, FormEvent } from "react";
import * as C from "./App.styles";
import * as Photos from './services/photos';
import { Photo } from "./types/Photo";
import {PhotoItem } from './components/PhotosItem'


const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  console.log(photos)

  useEffect(()=>{
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size> 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if(result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  return (

    <C.Container>
      <C.Area>
        <C.Header><h1>Galerya de Fotos</h1></C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
            <input type="file" name="image"/>
            <input type="submit" value="Enviar" />
            {uploading && "Enviando..."}
        </C.UploadForm>

        {loading &&
          <C.Screenwarning>
            <div className="emoji">✋</div>
            <div>Carregando...</div>
          </C.Screenwarning>
        }

        {!loading && photos.length > 0 && 
          <C.PhotoList>
            {photos.map((item, index)=>(
                <PhotoItem key={index} url={item.url} name={item.name}/>
            ))}
          </C.PhotoList>
        }

        {!loading && photos.length === 0 &&
                  <C.Screenwarning>
                    <div className="emoji">🤪</div>
                    <div>Nao há Fotos carregando...</div>
                  </C.Screenwarning>
                  
                }
                
        
      </C.Area>
    </C.Container>
  );
}

export default App;