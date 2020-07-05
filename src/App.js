import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in/sign-in-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {          
          this.setState({currentUser : {
            id: snapshot.id,
            ...snapshot.data()
          } });
        }
        )  
      }    
      
      this.setState({currentUser : userAuth});
    }
    )
  }

  componentWillUnmount() {
    this.unsubsubscribeFromAuth();
  }

  render() {
  return (
    <div>
      <Header currentUser = {this.state.currentUser}/>
      <Switch>
        <Route exact path = '/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInAndSignUpPage}/>
      </Switch>
    </div>
  );
  }
}

export default App;
