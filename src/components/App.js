import React from "react";
import { connect } from "react-redux";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
// import {StoreContext} from '../index';
// import {connect} from '../index';

class App extends React.Component {
  componentDidMount() {
    //   const {store}=this.props;
    //   store.subscribe(()=>{
    //     console.log('UPDATED',);//2
    //     this.forceUpdate();
    //   })
    //make api call
    //dispatch action i.e add movie to the store
    //1
    //data=moviesList
    this.props.dispatch(addMovies(data));
    // console.log('STATE', this.props.store.getState());//3
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      //found the movie
      return true;
    }
    return false;
  };
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    const { movies, search } = this.props; //{movies :{}, search: {}}
    const { list, favourites = [], showFavourites = [] } = movies;
    // console.log('RENDER', this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;
    // return(
    // <StoreContext.Consumer>
    //  {(store)=>{
    return (
      <div className="App">
        {/* <StoreContext.Provider value={store}> */}
        {/* each and every decendent of navbar as well as navbar
    component have thie acess of store, but we don't have to do here 
    because we have in app*/}
        <Navbar search={search} />
        {/* </StoreContext.Provider> */}
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                // key={`movies-${index}`}
                key={movie.imdbID}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              /> //index added for unique key
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display!</div>
          ) : null}
        </div>
      </div>
    );

    // </StoreContext.Consumer>
    // );
  }
}

//create AppWrapper
// class AppWrapper extends React.Component {
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store)=> <App  store={store}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
//we have told conect two things that we want this amount of data
//and as props, insinde App component
//and this connect function intern return new component
const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
