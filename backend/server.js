const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const util = require("util");
const uuidv4 = require('uuid/v4');
const formidable =  require("formidable");
const sharp = require('sharp');

const app = express();
const port=420;
const base="localhost";
const imagesPerPage=12;

app.use("/images",express.static("images"));
app.use("/thumbnails",express.static("thumbnails"));

app.use(express.json());
app.use(cors());

function toBaseURL() {
  return "http://"+base+":"+port;
}

app.listen(port,() => {
  console.log("Server started");
});

app.post("/api/upload",(req, res)=>{
	let form=new formidable.IncomingForm();
	form.multiples = false;
	//form.maxFileSize = 3 * 1024 * 1024; //max 3mb
	
	form.parse(req,(err,fields,files)=>{
		if(err) {
			res.status(500);
			res.end();
		}

		let filepath=files.upload.path;
		let name=files.upload.name;
		let ext=path.extname(name);
		let rnd=uuidv4();
		let folder=path.join(__dirname,"images/");
		let follderthumb=path.join(__dirname,"thumbnails/");
		let newFile=folder+rnd+ext;
		
		fs.rename(filepath,newFile,err=>{
			if(err) {
				res.status(500);
				res.end();
				return;
			}
			
			//keeps aspect automatically by cropping parts away
			let w=320;
			sharp(newFile).resize(w, 9/16*w).toFile(follderthumb+rnd+ext, (err, info) => {
				if(err) {
					res.status(500);
					res.end();
					return;
				}
				
				res.redirect("http://localhost:3000");
				//res.json({result:"success"});
			});
		});
	});
});

app.get("/api/pagecount",(req, res) => {
  const imagdir=path.join(__dirname,"images");
  fs.readdir(imagdir,(err,files) => {
    if(err) {
      console.log("Error: Line 37");
      res.status(500);
	  res.end();
      return;
    }

    const imageCount=files.length;
    const pages = Math.ceil(imageCount/imagesPerPage);

    res.json({count : pages});
  });
});

app.get("/api/images",(req, res) => {
  let page=-1;
  try {
    page=parseInt(req.query.page);
  } catch(e) {
    res.status(500);
	res.end();
    return;
  }

  const imagdir=path.join(__dirname,"images");
  fs.readdir(imagdir,(err,files) => {
    if(err) {
      console.log("Error: Line 37");
      res.status(500);
	  res.end();
      return;
    }

    const imageCount=files.length;
    const pages = Math.ceil(imageCount/imagesPerPage);
	
    if(page < 1 || page > pages) {
      res.status(500);
	  res.end();
      return;
    }

    let json={count:0,imgs:[]};
    let j=0;
    for(let i=(page-1)*imagesPerPage;i<imageCount;i++) {
      j++;
	  

      json.imgs.push({title:files[i], 
				url:toBaseURL()+"/images/"+files[i],
				thumbnail:toBaseURL()+"/thumbnails/"+files[i]
				});
				
		if(i === (page*imagesPerPage-1)) {
			break;
		}
    }
	
    json.count=j;
    res.json(json);
  });
});



