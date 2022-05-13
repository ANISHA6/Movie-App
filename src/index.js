import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './components/App';
import rootReducer from './reducers';
// import {ConnectedAppComponent} from './components/App'


//function logger(obj, next, action)
//logger(obj)(next)(action)

// const logger= function({dispatch, getState}){
//   return function(next){
//     return function (action){
//       //middleware code
//       console.log('ACTION_TYPE=', action.type);
//       next(action);
//     }
//   }
// }
//second way to write middleware function
const logger=({dispatch, getState})=>(next)=>(action)=>{
  // logger code
  if(typeof action !=='function'){
    console.log('ACTION_TYPE= ', action.type);

  }
        next(action);
}

// const thunk=({dispatch, getState})=>(next)=>(action)=>{
//   // logger code
//   if(typeof action==='function'){
//     action(dispatch);
//     return;
//   }
//         next(action);
// }

const store=createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('store', store);
console.log('state',store.getState());

//create react context
// export const StoreContext=createContext();
// console.log('StoreContxt', StoreContext);
// console.log(' BEFORE STATE', store.getState());//Internally call the reducer to get the initial state

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name: 'superman'}]
// });
// console.log(' AFTER STATE', store.getState());//Internally call the reducer to get the initial state


//   class Provider extends React.Component {
//   render(){
//     const {store}=this.props;
//   return (<StoreContext.Provider value={store}>
//     {this.props.children}
//   </StoreContext.Provider>
  
//   );
//   }
// }

// const connectedAppComponent=connect(callback)(App)
// export function connect(callback){
  //Inplace of App we have passed Component
//   return function (Component){
//      class ConnectedComponent extends React.Component {
//        constructor (props){
//          //we don't have to acess store in constructor
//          //so insed of returning class we have to wrap
//          super(props);
//         this.unsubscribe= this.props.store.subscribe(()=> this.forceUpdate());
//        }

//        componentWillUnmount(){
//          this.unsubscribe();
//        }
//       render(){
//         const {store}=this.props;
//             const state=store.getState();
//             const dataToBePassedAsProps=callback(state);
//             return (
            
//             <Component
//             {...dataToBePassedAsProps}
//             dispatch={store.dispatch}
//             />
//             );
          
        
//       }
//     }
//     class connectedComponentWrapper extends React.Component {
//       render(){
//         return(
//           <StoreContext.Consumer>
//             {(store)=><ConnectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return connectedComponentWrapper;
//   }

// }


ReactDOM.render(
  //now store is available each and every decendent of app
  //and we will use it via consumer property
  //instead of wrapping like this let's create our own class provider
  // <StoreContext.Provider value={store}>
  //   <App store={store}/>
  // </StoreContext.Provider>,
  // document.getElementById('root')

  <Provider store={store}>
    <App />

  </Provider>,
  document.getElementById('root')

);


