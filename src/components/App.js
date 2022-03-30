import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies} from '../actions';


class App extends React.Component{
  componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log('UPDATED',);//2
      this.forceUpdate();
    })
    //make api call
    //dispatch action i.e add movie to the store
    //1
    store.dispatch(addMovies(data));
    console.log('STATE', this.props.store.getState());//3
  }
  render(){
  const {list}=this.props.store.getState();//{list: [], favourites:[]}
  console.log('RENDER', this.props.store.getState());
  return (
    <div className="App">
   <Navbar />
   <div className="main">
     <div className="tabs">
       <div className="tab">Movies</div>
       <div className="tab">Favourites</div>
     </div>

     <div className="list">
       {list.map((movie, index) =>(
         <MovieCard movie={movie} key={`movies-${index}`} />//index added for unique key
       ))}

     </div>
   </div>
    </div>
  );
 }
}

export default App;
