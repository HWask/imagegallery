import React from "react";
import {NavLink} from "react-router-dom";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
	this.state={pagecount : 0};
	
	this.Links = this.Links.bind(this);
	this.componentDidMount=this.componentDidMount.bind(this);
  }

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
  
  Links() {
    const pageCount=this.state.pagecount;
    let html=[];
    for(let i=0;i<pageCount;i++) {
      html.push(<NavLink activeClassName="active" className="page"
        to={"/page-"+(i+1)}>{i+1}</NavLink>);
    }

    return html;
  }

  render() {
    return (
      <div id="pagination">
		<div id="center">
        {this.Links()}
		</div>
      </div>
    );
  }
}

export default Pagination;
