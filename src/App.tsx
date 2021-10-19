import { useState, useEffect } from "react";
import * as C from "./App.styles";
import * as Photos from './services/photos';
import { Photo } from "./types/Photo";
import {PhotoItem } from './components/PhotosItem'


const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(()=>{
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);

  return (

    <C.Container>
      <C.Area>
        <C.Header><h1>Galerya de Fotos</h1></C.Header>


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