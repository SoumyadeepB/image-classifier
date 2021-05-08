<h1 align="center"> Image Classification in the browser </h1>


This repository explores the possibility to run Machine Learning models on the browser, even on low-power mobile devices.
We run an Image Classification task using ReactJs as front-end along with TensorflowJS (with the pretrained MobileNet model) for inference.

[MobileNets](https://arxiv.org/pdf/1704.04861.pdf) are small, low-latency, low-power models parameterized to meet the resource constraints of a variety of use cases. They can be built upon for classification, detection, embeddings and segmentation similar to how other popular large scale models, such as Inception, are used.

MobileNets trade off between latency, size and accuracy while comparing favorably with popular models from the literature.

The application is hosted on Github-pages and can be accessed [here](https://soumyadeepb.github.io/image-classifier/). 

![image](https://user-images.githubusercontent.com/12089275/117553686-3bfad300-b053-11eb-98fe-4c78d78a9136.png)

## Requirements

- ReactJS
- TensorflowJS
- MobileNet

All dependencies are enlisted in the [package.json](./package.json)


## Available Scripts

In the project directory, you can run:

### `npm start`

This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

