import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';


class App extends React.Component{
  componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log('UPDATED',);//2
      this.forceUpdate();
    })
    //make api call
    //dispatch action i.e add movie to the store
    store.dispatch({//1
      type: 'ADD_MOVIES',
      movies: data

    });
    console.log('STATE', this.props.store.getState());//3
  }
  render(){
  const movies=this.props.store.getState();
  console.log('RENDER')
  return (
    <div className="App">
   <Navbar />
   <div className="main">
     <div className="tabs">
       <div className="tab">Movies</div>
       <div className="tab">Favourites</div>
     </div>

     <div className="list">
       {movies.map((movie, index) =>(
         <MovieCard movie={movie} key={`movies-${index}`} />//index added for unique key
       ))}

     </div>
   </div>
    </div>
  );
 }
}

export default App;
