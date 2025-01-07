
/*eslint-disable*/

import React, { useState, useRef } from "react";
import photo from "../../assets/photo.jpg";


export default function Profile() {
  function ImageUpload() {
    const [image, setImage] = useState(null);
    const hiddenFileInput = useRef(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          
          const ctx = canvas.getContext("2d");
          
          // Calculate the scale factor to ensure the image covers the entire canvas
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          
          // Calculate the dimensions and offset for drawing
          const drawWidth = img.width * scale;
          const drawHeight = img.height * scale;
          const offsetX = (canvas.width - drawWidth) / 2;
          const offsetY = (canvas.height - drawHeight) / 2;
          
          // Draw the image
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          
          canvas.toBlob(
            (blob) => {
              const processedFile = new File([blob], file.name, {
                type: "image/png",
                lastModified: Date.now(),
              });
              console.log(processedFile);
              setImage(processedFile);
            },
            "image/jpeg",
            0.8
          );
        };
      };
    };


    //api for uploading image

    // const handleUploadButtonClick = (file) => {
    //   var myHeaders = new Headers();
    //   const token = "adhgsdaksdhk938742937423";
    //   myHeaders.append("Authorization", `Bearer ${token}`);
  
    //   var formdata = new FormData();
    //   formdata.append("file", file);
  
    //   var requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: formdata,
    //     redirect: "follow",
    //   };
  
    //   fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //       console.log(JSON.parse(result));
    //       const profileurl = JSON.parse(result);
    //       setImage(profileurl.img_url);
    //     })
    //     .catch((error) => console.log("error", error));
    // };

    // get data from api
    // const ProfileForm = () => {
    //   const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     phone: "",
        
    //   });
    //   const [error, setError] = useState(null);
 
    
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       const token = "adhgsdaksdhk938742937423"; // Replace with secure token handling.
    //       try {
    //         const response = await fetch("https://trickuweb.com/api/get_profile", {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });
    
    //         if (!response.ok) {
    //           throw new Error(`Error: ${response.status}`);
    //         }
    
    //         const data = await response.json();
    
    //         // Populate form data with API response
    //         setFormData({
    //           name: data.name || "",
    //           email: data.email || "",
    //           phone: data.phone || "",
          
    //         });
    
    //       } catch (err) {
    //         setError(err.message);

    //       }
    //     };
    
    //     fetchData();
    //   }, []);

    // update data



  

    const handleClick = () => {
      hiddenFileInput.current.click();
    };

    return (
      <div className="image-upload">
        <div onClick={handleClick} className="cursor-pointer bg-white  rounded-lg">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="rounded-lg md:w-40 md:h-40    bg-white xsm:w-36 xsm:h-36 focus:ring-blue-300 dark:focus:ring-blue-800"
            />
          ) : (
            <img
              src={photo}
              alt="Default Logo"
              className="rounded-lg md:w-40 md:h-40   xsm:w-36 xsm:h-36 shadow-lg"
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="btn py-7">
          <button
            className="bg-white  text-[#191E3F] md:px-10 xsm:px-8 py-2 rounded-lg font-lato font-medium"
            onClick={() => alert("API Integration Pending!")}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className="profile bg h-screen flex flex-col justify-center items-center px-5 sm:px-0" id="Profile">
      <div className="container glass-container rounded-lg shadow-lg lg:max-w-screen-lg md:max-w-screen-md xsm:max-w-screen-sm mx-auto p-6 lg:p-8 xsm:grid sm:grid-cols-2 md:gap-6 xsm:grid-col-1  " style={{
        boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)", // Custom white shadow
      }}>
        {/* Form Section */}
        <div className="form md:w-full sm:w-3/4  xsm:w-full sm:order-1 xsm:order-2"> 
          <div className={`relative py-5 z-0 w-full group flex items-center ${isDisabled ? "space-x-2 flex-row-reverse" : ""}`}>
            <input
              type="text"
              name="name"
              id="name"
              disabled={isDisabled}
              aria-label="Name input field"
              className={`block w-full px-0 py-2 text-lg text-gray-900 bg-transparent ${isDisabled 
                ? "border-none px-7 py-0 mt " 
                : "border-b-2 border-gray-300 focus:border-gray-500"
              } appearance-none dark:text-white focus:outline-none peer`}
              placeholder=" "  // Placeholder for label animation effect
            />
            <label
              htmlFor="name"
              className={`peer-focus:font-medium font-Abril text-lg text-gray-500 dark:text-white duration-300 ${
                isDisabled
                  ? "flex text-2xl"
                  : "absolute transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
              }`}
            >
              Name:
            </label>
          </div>

          {/* Email Input */}
          <div className={`relative py-5 z-0 w-full group flex items-center ${isDisabled ? "space-x-2 flex-row-reverse" : ""}`}>
            <input
              type="email"
              name="email"
              id="email"
              disabled={isDisabled}
              className={`block w-full px-0 py-2 text-lg text-gray-900 bg-transparent ${isDisabled 
                ? "border-none px-7 py-0 mt " 
                : "border-b-2 border-gray-300 focus:border-gray-500"
              } appearance-none dark:text-white focus:outline-none peer`}
              placeholder=" "  // Placeholder for label animation effect
            />
            <label
              htmlFor="email"
              className={`peer-focus:font-medium font-Abril text-lg text-gray-500 dark:text-white duration-300 ${
                isDisabled
                  ? "flex text-2xl"
                  : "absolute transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
              }`}
            >
              Email:
            </label>
          </div>

          {/* Phone Input */}
          <div className={`relative py-5 z-0 w-full group flex items-center ${isDisabled ? "space-x-2 flex-row-reverse" : ""}`}>
            <input
              type="phone"
              name="phone"
              id="phone"
              disabled={isDisabled}
              className={`block w-full px-0 py-2 text-lg text-gray-900 bg-transparent ${isDisabled 
                ? "border-none px-7 py-0 mt " 
                : "border-b-2 border-gray-300 focus:border-gray-500"
              } appearance-none dark:text-white focus:outline-none peer`}
              placeholder=" "  // Placeholder for label animation effect
            />
            <label
              htmlFor="phone"
              className={`peer-focus:font-medium font-Abril text-lg text-gray-500 dark:text-white duration-300 ${
                isDisabled
                  ? "flex text-2xl"
                  : "absolute transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
              }`}
            >
              Phone:
            </label>
          </div>

          <div className="country py-5 text-center">
            <select className="block w-3/4  px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-[#191E3F] font-lato font-medium">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div className="btn-profile py-5">
            <button
              className="mt-5 py-2 px-8 bg-[#99BBFE] text-white rounded-lg hover:bg-[#86adfa] text-lg"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              {isDisabled ? "Edit" : "Send"}
            </button>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="image flex flex-col justify-start items-center text-center pt-5 lg:mt-0 xsm:order-1 sm:order-2">
          <ImageUpload />
        </div>
      </div>
    </div>
  );
}
