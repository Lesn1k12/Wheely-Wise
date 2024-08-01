import React, { useState } from "react";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

const API_KEY = "key";
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

const useVision = () => {
  const [uploading, setUploading] = useState(false);
  const [googleResponse, setGoogleResponse] = useState<string | null>(null);
  const [imageInformation, setImageInformation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitToGoogle = async ({ image }: { image: string }) => {
    setUploading(true);
    setError(null);
    
    try {
      const base64ImageData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("криптоване фото: ", base64ImageData);

      const body = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [
              { type: "OBJECT_LOCALIZATION", maxResults: 2 },
              { type: "WEB_DETECTION", maxResults: 1 },
            ],
          },
        ],
      };

      const response = await axios.post(API_URL, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      const result = response.data;
      console.log("result: ", result);

      const objects = result?.responses?.[0]?.localizedObjectAnnotations;
      const webEntities = result?.responses?.[0]?.webDetection?.webEntities;
      const pagesWithMatchingImages = result?.responses?.[0]?.webDetection?.pagesWithMatchingImages;

      if (objects) {
        const vehicles = objects.filter((obj: { name: string }) =>
          obj.name.toLowerCase().includes("car") || obj.name.toLowerCase().includes("motorcycle")
        );

        if (vehicles.length > 0) {
          const description = webEntities?.[0]?.description || "No description found";
          const information = pagesWithMatchingImages?.[0]?.url || "No URL found";
          setGoogleResponse(description);
          setImageInformation(information);
        } else {
          alert("Choose an image with a car or motorcycle");
          router.back();
        }
      } else {
        const description = webEntities?.[0]?.description || "No description found";
        const information = pagesWithMatchingImages?.[0]?.url || "No URL found";
        setGoogleResponse(description);
        setImageInformation(information);
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      console.log("Error: ", err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    googleResponse,
    error,
    submitToGoogle,
    imageInformation,
  };
};

export default useVision;
