import React from "react";

class ImageUpload extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		return (
			<div>
				<form action="http://localhost:420/api/upload" enctype="multipart/form-data" method="post">
					<input className="input" type="file" name="upload" accept="image/*" />
					<input className="input" type="submit" value="Upload" />
				</form>
			</div>
		);
	}
}

export default ImageUpload;