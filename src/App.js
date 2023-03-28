import { useState, useEffect } from "react";
import Auth from "./components/auth";
import { db , auth} from "./config/firebase-config";

import { getDocs, collection, addDoc, deleteDoc , doc, updateDoc} from "firebase/firestore";
const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieDate,setNewMovieDate] = useState(0)
  const [newMovieOscar,setNewMovieOscar] = useState(false);
    const [updateMovieTitle, setUpdateMovieTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");


  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("data", filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    
    getMovieList();
  }, []);

  const onSubmitMovie = async () =>{
      try {
     await addDoc(moviesCollectionRef, {
       title: newMovieTitle,
       releaseDate: newMovieDate,
       recievedAnOscar: newMovieOscar,
       userId: auth?.currentUser?.uid,
     });
     getMovieList();
      
      } catch (error) {
        console.error(error);
      }
  }


const deleteMovie = async (id) =>{
    const movieDoc = doc(db, "movies", id);
    console.log("movieDoc", movieDoc);

      try {
     await deleteDoc(movieDoc);
     getMovieList();
      
      } catch (error) {
        console.error(error);
      }
  }


  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);

    try {
      await updateDoc(movieDoc, {title: updateMovieTitle});
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  console.log("movieList",movieList)

  return (
    <div>
      <Auth />
      <div>
        <br />
        <h1>Create a Movie</h1>
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <br />
        <br />
        <input
          type="number"
          value={newMovieDate}
          onChange={(e) => setNewMovieDate(e.target.value)}
          placeholder="Enter Date"
        />
        <br />
        <br />
        <input
          type="checkbox"
          checked={newMovieOscar}
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <label>Recieved An Oscar</label>
        <br />
        <br />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie, i) => {
          return (
            <div key={i}>
              <h1>Title: {movie.title}</h1>
              <p>Date: {movie.releaseDate}</p>
              <h3 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
                Recieved Oscars
              </h3>
              <br />
              <input
                placeholder="Enter new Title"
                onChange={(e) => setUpdateMovieTitle(e.target.value)}
              />
              <button onClick={() => updateMovie(movie.id)}>
                Update Title
              </button>
              <br />
              <br />
              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
