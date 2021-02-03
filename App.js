import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import LandingSrc from './components/auth/LandingSrc';
import RegisterSrc from './components/auth/RegisterSrc';
import MainSrc from './components/Main'
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))
 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbeYN3En03FuInHBTmjXXFVnF__4apjP0",
  authDomain: "instagramclone-2af7d.firebaseapp.com",
  projectId: "instagramclone-2af7d",
  storageBucket: "instagramclone-2af7d.appspot.com",
  messagingSenderId: "984552466795",
  appId: "1:984552466795:web:4382f1bdbd0362e0a9442e",
  measurementId: "G-JC0MR4M5CN"
};

if(firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
      
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View>
          <Text style={{ flex: 1, justifyContent: 'center' }}>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={ LandingSrc } options={{headerShown: false}} />
          <Stack.Screen name="Register" component={ RegisterSrc } />
        </Stack.Navigator>
      </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <MainSrc />
      </Provider>
      
    );
  }
}

export default App
