/*eslint-disable*/

import React, { useState, useRef } from "react";
import axios from "axios";

function CameraRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Keep form hidden initially
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const videoPreviewRef = useRef(null);

  const handleRecordToggle = async () => {
    if (!isRecording) {
      // Start recording
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
          setIsFormVisible(true); // Show form after stopping
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Unable to access your camera. Please grant permissions.");
      }
    } else {
      // Stop recording
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    setVideoBlob(null); // Clear the video blob
    setIsFormVisible(false); // Hide the form
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const phone = event.target.phone.value;

    if (!videoBlob) {
      alert("No video recorded. Please record a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("video", videoBlob, "recording.webm");

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Data successfully uploaded!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload data.");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Record/Stop Button */}
      {!videoBlob && (
        <button
          onClick={handleRecordToggle}
          className={`py-2 mx-5 text-lg font-lato ${isRecording ? "bg-red-300" : "bg-[#99BBFE]"
            } w-32 text-white rounded-lg mt-4 focus:ring-2 focus:outline-none`}
        >
          {isRecording ? "Stop Record" : "Start Record"}
        </button>
      )}

      {/* Video preview and controls */}
      {videoBlob && (
        <div>
          <video
            controls
            src={URL.createObjectURL(videoBlob)}
            style={{ width: "100%", maxHeight: "400px", marginTop: "10px" }}
          />
          <button
            onClick={deleteRecording}
            className="py-2 bg-red-700 text-white rounded-lg mt-4 focus:ring-2 focus:outline-none px-4"
          >
            Delete Record
          </button>
        </div>
      )}

      {/* Form will only show after video is recorded */}
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="py-5 w-1/3 ">
          <div className="relative mt-3 sm:mt-1 z-0 w-full sm:py-5 xsm:py-3 group ">
            <input type="text" name="name" id="name" className="block sm:py-1 xsm:py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium  font-lato absolute text-lg text-gray-500 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4" > name </label>


          </div>
          <div className="relative mt-3 sm:mt-1 z-0 w-full sm:py-5 xsm:py-3 group ">
            <input type="text" name="phone" id="phone" className="block sm:py-1 xsm:py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium  font-lato absolute text-lg text-gray-500 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4" > phone </label>


          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-[#99BBFE] text-white rounded-lg mt-4 focus:ring-2 focus:outline-none"
          >
            Submit
          </button>
        </form>
      )}

      {/* Camera preview while recording */}
      {!videoBlob && (
        <div style={{ marginTop: "20px" }}>
          <video
            ref={videoPreviewRef}
            style={{ width: "100%", maxHeight: "400px" }}
            muted
          />
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  return <>
    <div className="service py-10" id="Service">
      <div className="head-contact flex justify-center items-center py-10" >
        <h1 className='font-Abril text-slate-100  text-5xl'>Servise</h1>
      </div>

      <CameraRecorder />
    </div>

  </>

}
