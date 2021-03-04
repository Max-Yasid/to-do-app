import './App.css';
import darkBackground  from './assets/images/bg-desktop-dark.jpg';
import lightground  from './assets/images/bg-desktop-light.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContentAll from './components/content';
import { Component } from 'react';

class App extends Component{
  darkBackground = "hsl(235, 21%, 11%)";
  lightBackground = "hsl(0, 0%, 98%)";
  componentWillMount(){
    document.body.style.backgroundColor = this.darkBackground;
  }
  constructor(props){
    super(props);
    this.state = {
      selectedThemeIsDark: true,
    }
}
  changeTheme = () => {
    this.setState({
        selectedThemeIsDark: !this.state.selectedThemeIsDark,
    });
    document.body.style.backgroundColor = this.state.selectedThemeIsDark ? this.lightBackground : this.darkBackground;
}

  render = () => {
    let selectedThemeIsDark = this.state.selectedThemeIsDark;
    return (
      <div className="App">
        <img 
          className="darkImageBackground"
          src={selectedThemeIsDark ? darkBackground : lightground} 
          alt="salida background" 
        />
        <main className="content-container d-flex justify-content-center align-items-center">
          <ContentAll 
            selectedThemeIsDark={selectedThemeIsDark}
            changeTheme={this.changeTheme}
          />
        </main>
      </div>
    );
  }
}

export default App;