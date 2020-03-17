import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLink from './components/imagelink/imageLink';
import FaceRecogination from './components/faceRecogination/FaceRecogination';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';


const particleOption ={
  particles: {
    number:{
      value:40,
        density:{
          enable: true,
          value_area: 800
        }
      }
    }
};

const app = new Clarifai.App({
  apiKey: 'b24eeacd93a0473586416400d65ea88d'
 });

const initialState = { 
    input:'',
    imageUrl:'',
    box:{},
    route: 'signin',
    isSignedIn: false,
    user:{
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
    }
}


class App extends Component {

    constructor(props) {
      super(props);
      this.state = initialState;
    }

    loadUser = (data) => {
       this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
       }})
    }

calculateFaceLocation=(data)=>{
  const clairFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return{
    leftCol: clairFace.left_col * width,
    topRow: clairFace.top_row * height,
    rightCol: width - (clairFace.right_col * width),
    bottomRow: height - (clairFace.bottom_row * height)
  }
}

  displayBox=(box)=>{
    console.log(box);
    this.setState({box: box})
    
  }

  onInputChange =(event) =>{
        this.setState({input: event.target.value});
        
      }
      
  onButtonSubmit=()=>{
        this.setState({imageUrl: this.state.input});

    app.models.predict( 
      Clarifai.FACE_DETECT_MODEL , this.state.input)
      .then(response =>this.displayBox(this.calculateFaceLocation(response)))
       .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() { 
    return (

      <div className="">
        <Particles className='particles' params={particleOption} />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          
          { this.state.route === 'home'
            ? <div>
            <Logo />
            <Rank name={this.state.user.name}/>
            <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecogination box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>
            : (
              this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
          }        
      </div>
    );
  }
}
 
export default App;

