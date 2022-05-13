// import { render } from '@testing-library/react';
import React from 'react';
import {connect} from 'react-redux';

// import {data} from '../data';
import {addMovieToList, handleMovieSearch} from '../actions'
// import {data} from '../data';
// import {connect} from '../index';


class Navbar extends React.Component {
constructor (props){
    super(props);
    this.state={
        searchText: ''
    };
}

    handleAddToMovies=(movie)=>{
        this.props.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults:false
        });
    }
    handleSearch=()=>{
        const {searchText}=this.state;
        //now, call the api
//It is an action creater and responsible for fetching the data from
//server and send data to the store
        this.props.dispatch(handleMovieSearch(searchText));
    };

    handleChange=(e)=>{
        this.setState({
            searchText: e.target.value
        });
    };
    render(){
        // const {showSearchResults}=this.state;
        const { result:movie ,showSearchResults}=this.props.search;

        return (
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleChange} />
                    <button id="search-btn" onClick={this.handleSearch}>Search</button>

                    {showSearchResults &&
                    <div className="search-results">
                      <div className="search-result">
                          <img src={movie.Poster} alt="search-pic"/>

                          <div className="movie-info">
                              <span>{movie.Title}</span>
                              <button onClick={()=>this.handleAddToMovies(movie)}>
                                  Add to movies
                              </button>
                          </div>

                        </div>

                    </div>
                    }
                </div>
           
            </div>
          );

    }
  
}
// class NavbarWrapper extends React.Component {
//     render(){
//         return(
//             <StoreContext>
//                 {(store)=><Navbar dispatch={store.dispatch} search={this.props.search}/>}
//             </StoreContext>
//         )
//     }
// }

function mapStateToProps({search}){
    return{
        search,
    };
}
export default connect(mapStateToProps)(Navbar);