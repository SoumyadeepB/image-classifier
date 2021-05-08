import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import ImageIcon from "@material-ui/icons/Image";
import LoadingOverlay from "react-loading-overlay";
import "./App.css";

function App() {
  
  const [img, setImg] = useState("None");
  const [res, setRes] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useState(true);


  function modelReady(){
    console.log("Model is ready!");
  }

  const imageHandler = (e) => {
    setShow(false);
    var i = 1;
    var valid = false;
    var reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log("Ready state: ",reader);
        //setImg(reader.result);       

        if (valid && reader.result) {
          setImg(reader.result); 
          setDisable(false);
                
        }
        else {
          if (reader.result)
            alert("File format not supported (Uploaded file is not an image)");
        }     
      }
            
    };
    console.log("File:",e.target.files[0])    
    console.log("Reader:",reader);
    var ext = e.target.files[0].name.split(".").pop()
    valid = ext.match(/jpg|jpeg|png|gif/gi) != "";
    console.log("Valid:",valid);
    reader.readAsDataURL(e.target.files[0]);
    console.log("Final reader:", reader);
       
  };

  const classifyImg = async () => {
    // Initialize the Image Classifier method with MobileNet
    setLoading(true);
    const img = document.getElementById("img");
    console.log("On click:",img);  
    const mobilenet = require('@tensorflow-models/mobilenet');
    //const model = ml5.imageClassifier("MobileNet",modelReady);
    const model = await mobilenet.load();  
    console.log("Model:",model);  
    const result = await model.classify(img);
    console.log("result:",result); 
    setRes(result);
    setLoading(false);
    setShow(true);
  };

  return (
    <div className="App">
      <LoadingOverlay active={loading} spinner text="Generating predictions...">
        <Container style={{ minHeight: "100vh", minWidth: "98vw" }}>
          <Row className="center">
            <h1>Image Classifier </h1>
          </Row>
          <Row>
            <Col xs="12" lg="6" className="colLeft">
              <Row className="center">
                {img === "None" ? (
                  <ImageIcon
                    className="responsiveImg"
                    style={{
                      width: "400px",
                      height: "400px",
                      border: "2px solid",
                    }}
                  />
                ) : (
                    <Image src={img} id="img" className="responsiveImg" />
                  )}
              </Row>
              <br />
              <Row>
                <Col xs="12" lg="9">
                  <input
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input"
                    onChange={imageHandler}
                    className="fileInput"
                  />
                </Col>

                <Col xs="12" lg="3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={classifyImg}
                    style={{ margin: "3px" }}
                    disabled={disabled}
                  >
                    Classify
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col xs="12" lg="6">
              {show && (
                <div className="classification">
                  <h3 className="center">Class predictions</h3>
                  <ul>
                    {res.map(({ className, probability }) => (
                      <div className="bar">
                        <ProgressBar
                          key={className}
                          variant="success"
                          now={(probability * 100).toFixed(2)}
                          label={``}
                          style={{ height: "20px !important" }}
                        />
                        <h4>{`${className} (${(probability * 100).toFixed(
                          2
                        )}%)`}</h4>
                      </div>
                    ))}
                  </ul>
                </div>
              )}

              <Row>
                <Col xs="10"></Col>
                <Col
                  xs="2"
                  style={{ position: "fixed", bottom: "10px", right: "10px",textAlign:"center" }}
                >
                  <img src="https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fsoumyadeepb.github.io%2Fimage-classifier%2F" alt="Hits"/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </LoadingOverlay>
    </div>
  );
}

export default App;
