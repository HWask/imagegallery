import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import RedirectToMainPage from "./RedirectToMainPage";
import ImageUpload from "./ImageUpload";

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {pagecount:0};
    //this.componentDidMount=this.componentDidMount.bind(this);
  }

 /*
  componentDidMount() {
    fetch("http://localhost:420/api/pagecount")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({pagecount : json.count});
    })
    .catch((err) => {
      console.log("error");
    });
  }
*/

  render() {
    return (
	<BrowserRouter>
		<nav className="nav">
			<Link className="link" to="/page-1">View Gallery</Link>
			<Link className="link" to="/upload">Upload Image</Link>
		</nav>
	
	
        <Route path="/page-:id" component={ImageContainer}></Route>
		<Route path="/upload" component={ImageUpload}></Route>
        <Route path="/" exact component={RedirectToMainPage}></Route>
	</BrowserRouter>
    );
  }
}

export default App;
