import { combineReducers } from "redux";
import { ADD_MOVIES, 
    ADD_To_FAVOURITES ,
     REMOVE_FROM_FAVOURITES, 
     SET_SHOW_FAVOURITES} 
     from "../actions";

const initialMoviesState={
    list: [],
    favourites: [],
     showFavourites: false

};
export function movies(state=initialMoviesState, action){
    console.log('MOVIES REDUCER');
    // if(action.type===ADD_MOVIES){
    //     return {
    //         ...state,
    //         list: action.movies
    //     }
    // }
    // return state;
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            }
            case ADD_To_FAVOURITES:
                return {
                    ...state,
                    favourites: [action.movie, ...state.favourites]
                }
                case REMOVE_FROM_FAVOURITES:
                    const filteredArray=state.favourites.filter(
                        movie=>movie.Title !== action.movie.Title
                    );
                    return{
                        ...state,
                        favourites: filteredArray
                    };
                    case SET_SHOW_FAVOURITES:
                        return{
                            ...state,
                            showFavourites: action.val
                        }
                default:
                    return state;
    }
}
// const ADD_MOVIES='ADD_MOVIES';
//move this variable to the action file

const initialSearchState={
    result: {}
}

export function search (state=initialSearchState, action){
    console.log('SEARCH REDUCER');

    return state;
}

const initialRootState={
    movies: initialMoviesState,
    search: initialSearchState
}
// export default function rootReducer (state=initialRootState, action){
//     return{
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

export default combineReducers({
    movies,
    search
})