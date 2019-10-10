import React from "react";
import Pagination from "./Pagination";

class ImageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
	  count:0,
      imgs: []
    };

    this.componentDidUpdate=this.componentDidUpdate.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.imgHTML=this.imgHTML.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      fetch("http://localhost:420/api/images?page="+this.props.match.params.id)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState(json);
      })
      .catch((err) => {
        console.log("error");
      });
    }
  }

  componentDidMount() {
    fetch("http://localhost:420/api/images?page="+this.props.match.params.id)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState(json);
    })
    .catch((err) => {
      console.log("error");
    });
  }

  imgHTML() {
    let imgs = this.state.imgs;
    let html=[];
    for(let i=0;i<imgs.length;i++) {
      html.push(<a href={imgs[i].url} target="blank">
        <img className="image" alt={imgs[i].title} src={imgs[i].thumbnail} />
      </a>);
    }

    return html;
  }

  render() {
    return (
	<>
      <div id="images">
        {this.imgHTML()}
      </div>
	  <Pagination />
	</>
	);
  }
}

export default ImageContainer;
