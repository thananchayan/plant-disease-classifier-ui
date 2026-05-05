# 🌿 Plant Leaf Disease Detection System

An end-to-end AI-powered system for detecting plant leaf diseases using
deep learning.

------------------------------------------------------------------------

## 🚀 Overview

This project uses a Convolutional Neural Network (CNN) built with
TensorFlow/Keras to classify plant leaf diseases across 21 classes.\
It provides real-time predictions via a FastAPI backend and a
user-friendly web interface.

------------------------------------------------------------------------

## 🔍 Features

-   🌱 Detects diseases in plant leaves (Corn, Grape, Potato, Tomato)
-   📊 Achieves **94.6% test accuracy** and **0.947 macro F1-score**
-   ⚡ Real-time predictions using FastAPI
-   🖥️ Web interface with drag-and-drop image upload (React)
-   📱 Mobile support via React Native (Expo)
-   ☁️ Deployed on Hugging Face Spaces & Render

------------------------------------------------------------------------

## 🧠 Model Details

-   Framework: TensorFlow / Keras
-   Dataset: PlantVillage (38.6k images)
-   Classes: 21 disease categories
-   Input size: 128x128 images

------------------------------------------------------------------------

## ⚙️ Tech Stack

-   Backend: FastAPI, Python
-   Frontend: React, React Native (Expo)
-   ML: TensorFlow, Keras
-   Deployment: GCP, Hugging Face Spaces, Render

------------------------------------------------------------------------

## 🌐 Live Demo

-   Web App: https://plant-disease-classifier-ui.onrender.com/
-   Model Demo:
    https://huggingface.co/spaces/thananchayan/plant-disease-classifier

------------------------------------------------------------------------

## 📦 Installation

``` bash
git clone https://github.com/your-username/plant-disease-classifier.git
cd plant-disease-classifier
npm install
npm run dev
```

------------------------------------------------------------------------

## 📡 API Usage

### POST /predict-file/

Upload an image and get prediction:

``` bash
curl -X POST "http://localhost:7860/predict-file/" -F "file=@leaf.jpg"
```

------------------------------------------------------------------------

## ⚠️ Limitations

-   The model is trained on **21 specific plant leaf classes**
-   It may produce predictions for unrelated images (closed-set
    classification)
-   Best performance with clear leaf images from supported plants

------------------------------------------------------------------------

## 💡 Future Improvements

-   Add "Unknown" class for better real-world robustness
-   Implement input validation for non-leaf images
-   Improve model generalization with more diverse datasets

------------------------------------------------------------------------

## 📬 Contact

-   LinkedIn: https://www.linkedin.com/in/thavamohan-thananchayan
-   GitHub: https://github.com/thananchayan

------------------------------------------------------------------------

