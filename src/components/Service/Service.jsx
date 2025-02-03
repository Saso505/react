
/* eslint-disable */
import React, { useState, useRef } from "react";
import axios from "axios";
import style from "./Service.module.css"

function Service() {
  const [videoFile, setVideoFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const hiddenFileInput = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const videoPreviewRef = useRef(null);

  // Handle file upload
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setIsFormVisible(true);
  };

  // Open file selection dialog
  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  // Handle video recording
  const handleRecordToggle = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.play();
        }

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) recordedChunks.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: "video/webm" });
          setVideoBlob(blob);
          recordedChunks.current = [];
          stream.getTracks().forEach((track) => track.stop());
          setIsFormVisible(true);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Unable to access your camera. Please grant permissions.");
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Delete recorded/uploaded video
  const deleteRecording = () => {
    setVideoBlob(null);
    setVideoFile(null);
    setIsFormVisible(false);
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const phone = event.target.phone.value;

    if (!videoBlob && !videoFile) {
      alert("No video available. Please upload or record a video.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (videoBlob) {
      formData.append("video", videoBlob, "recording.webm");
    } else if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Video successfully uploaded!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    }
  };

  return (
    <div className="service py-10" id="Service">
      <div className="flex justify-center items-center py-10">
        <h1 className="text-5xl font-bold text-white">Service</h1>
      </div>

      <div className="flex flex-col items-center justify-center p-5 ">

        <div className="flex gap-8 py-6">
          <button
            onClick={handleUploadClick}
            className={` ${style.submitGlassB} text-white text-sm md:text-lg font-inter font-medium cursor-pointer  shadow-whiteShadow  px-6 py-2 rounded-lg `} 
          >
            Upload Video
          </button>
          <button
            onClick={handleRecordToggle}
            className={`py-2 px-6 text-lg font-bold ${isRecording ? `${style.stopGlassB} font-inter font-medium rounded-lg   py-1 cursor-pointer   shadow-whiteShadow` : `${style.startGlassB} font-inter font-medium rounded-lg  px-3 py-1 cursor-pointer   shadow-whiteShadow `
              } text-white rounded-lg`}  >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="video/*"
          ref={hiddenFileInput}
          onChange={handleVideoChange}
          className="hidden"
        />

<div className="record ">
  {/* Video Preview */}
  {(videoBlob || videoFile) && (
          <div className="mt-5">
            <video
              controls
              className="w-96 overflow-hidden  shadow-custom   border border-spacing-x-3 border-slate-400/50  "
              src={videoBlob ? URL.createObjectURL(videoBlob) : URL.createObjectURL(videoFile)}
            />
            <button
              onClick={deleteRecording}
              className="mt-5 cursor-pointer text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-sm px-4 py-3 text-center me-2 mb-2"

            >

              <i className="fa-solid fa-trash text-lg"></i>
            </button>
          </div>
        )}



        {/* Camera Preview While Recording */}
        {!videoBlob && !videoFile && (
          <div style={{ marginTop: "20px" }}>
            <video ref={videoPreviewRef} className="w-96" muted />
          </div>
        )}

        {/* Form for Name & Phone Submission */}
        {isFormVisible && (
          <form onSubmit={handleFormSubmit} className="py-1 w-96">
            <div >
        
            <div className='relative mt-3 sm:mt-1 z-0 w-full sm:py-5 xsm:py-3 group '>
              <input
                type='number'
                name='username'
                id='username'

                className='block sm:py-1 xsm:py-3 px-0 w-full text-md  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer'
                placeholder=' '
              />
              <label
                htmlFor='username'
                className='peer-focus:font-medium capitalize  font-inter absolute text-lg text-gray-300 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
            userName :
              </label>


            </div>

        

            <div className='relative mt-3 sm:mt-1 z-0 w-full sm:py-5 xsm:py-3 group '>
              <input
                type='number'
                name='id'
                id='id'

                className='block sm:py-1 xsm:py-3 px-0 w-full text-md  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer'
                placeholder=' '
              />
              <label
                htmlFor='id'
                className='peer-focus:font-medium capitalize  font-inter absolute text-lg text-gray-300 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                id :
              </label>


            </div>
</div>

            <button
              type="submit"
              className={` ${style.submitGlassB} text-white px-6 py-2 rounded-lg `}
            >
              Submit
            </button>
          </form>
        )}
      

</div>
        </div>
    </div>
  );
}

export default Service;
