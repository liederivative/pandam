/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ExampleMenu from './containers/ExampleMenu';
import PrintPage from './containers/PrintPage';
import UsersPage from './containers/UsersPage';
import SearchClientsMenu from './containers/SearchClientsMenu';
import CreateClientsMenu from './containers/CreateClientsMenu';
import ListClientsMenu from './containers/ListClientsMenu';
import LoginPage from './containers/LoginPage';
import DebtPage from './containers/DebtPage';


const PrivateRoute = ({component: Component, store, ...props}) => {
	// console.log(props,store);
	// getRedirect = ()=>{
	// 	if()
	// }
    return (
        <Route
            {...props}
            render={(props) => store.getState().auth.authenticated === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: store.getState().router.location.pathname}}} />}
        />
    );
};

const PublicRoute = ({component: Component, store, ...props}) => {
	
    return (
        <Route
            {...props}
            render={(props) => store.getState().auth.authenticated === false || store.getState().router.location.pathname === '/login'
                ? <Component {...props} />
                : <Redirect to='/login'/>}
        />
    );
};


// const mapStateToProps = (state) => {
//     return { authenticated: state.auth.authenticated };
// };
// <IndexRoute component={}/> 

class Routes extends React.Component { 
	// modules={this.props.modules}
	render (){
		// console.log(this.props)
		console.log('rendering routes')
		return (

		  <App>
		  	<Switch>
		   		
		    	<PublicRoute store={this.props.store} exact path="/" component={HomePage} />
		    	<PublicRoute store={this.props.store} path="/login" component={LoginPage} />
		    	<Route store={this.props.store} path="/print" component={PrintPage} />
		      	<PrivateRoute store={this.props.store} path="/menu/example" component={ExampleMenu} />
		      	<PrivateRoute store={this.props.store} path="/menu/searchclients" component={SearchClientsMenu} />
		      	<PrivateRoute store={this.props.store} path="/menu/createclients" component={CreateClientsMenu} />
		      	<PrivateRoute store={this.props.store} path="/menu/listclients" component={ListClientsMenu} />
		      	<Route store={this.props.store} path="/menu/users" component={UsersPage} />
		      	<Route store={this.props.store} path="/menu/debt" component={DebtPage} />
		      	<Route path="/counter" component={CounterPage} />
		  </Switch>
		  </App>
		)
	}
}
export default Routes;


