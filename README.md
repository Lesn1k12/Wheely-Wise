# Car & Motorcycle Recognizer

A React Native app that uses Google Cloud Vision API to detect cars and motorcycles in images.

---

## 🚀 Overview

This application lets users:

- 📸 Pick or capture an image from their device  
- 🔄 Convert the image to Base64  
- 📡 Send it to Google Cloud Vision API  
- 🚗 Extract localized object annotations (OBJECT_LOCALIZATION)  
- 🌐 Fetch web entity descriptions and matching image page URLs (WEB_DETECTION)  
- 🏍️ Filter results to only cars and motorcycles  
- ⚠️ Show an alert if no vehicles are detected  

---

## 🔍 Features

- **OBJECT_LOCALIZATION** – finds and localizes objects in the image  
- **WEB_DETECTION** – retrieves top web entity descriptions and pages with similar images  
- Automatic filtering for “car” and “motorcycle”  
- Loading state indicator  
- Error handling with user-friendly messages  

---

## 📋 Prerequisites

- Node.js ≥ 14  
- Expo CLI (tested on SDK 48+)  
- A Google Cloud project with Vision API enabled  
- A Google API key with Vision permissions  

---

## ⚙️ Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Lesn1k12/Wheely-Wise.git
   cd Wheely-Wise
