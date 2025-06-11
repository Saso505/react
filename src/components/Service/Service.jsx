/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { addArchive, getAllArchives } from "../../utility/db";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import style from "./Service.module.css";

function Service() {
  const [videoFile, setVideoFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [nextId, setNextId] = useState(1); // ✅ ID جاهز

  const hiddenFileInput = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const videoPreviewRef = useRef(null);
  const ffmpeg = useRef(createFFmpeg({ log: true })).current;

  // Fetch last ID
  useEffect(() => {
    async function fetchArchives() {
      const data = await getAllArchives();
      const lastId = Math.max(...data.map((a) => Number(a.id) || 0), 0);
      setNextId(lastId + 1);
    }
    fetchArchives();
  }, []);

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

    const name = event.target.username.value;
    const id = nextId; // ✅ ناخد nextId الجاهز

    if (!videoBlob && !videoFile) {
      toast.error("No video available. Please upload or record a video.", {
        position: "top-center",
        autoClose: 3000,
      });

      return;
    }

    let videoToSend;
    let videoFilename;

    // Check if videoBlob (recorded)
    if (videoBlob) {
      // Initialize ffmpeg if not loaded
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      // Write input.webm to ffmpeg FS
      ffmpeg.FS("writeFile", "input.webm", await fetchFile(videoBlob));

      // Run conversion → output.mp4
      await ffmpeg.run(
        "-i",
        "input.webm",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-c:a",
        "aac",
        "output.mp4"
      );

      // Read output.mp4
      const data = ffmpeg.FS("readFile", "output.mp4");
      const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });

      videoToSend = mp4Blob;
      videoFilename = "recording.mp4";

      // Optional: Free up memory
      ffmpeg.FS("unlink", "input.webm");
      ffmpeg.FS("unlink", "output.mp4");
    } else if (videoFile) {
      // If uploaded file → use as is
      videoToSend = videoFile;
      videoFilename = videoFile.name;
    }

    // Build FormData
    const formData = new FormData();
    formData.append("video", videoToSend, videoFilename);

    try {
      const response = await axios.post(
        "https://deception-api-production-cfcd.up.railway.app/predict",
        formData
      );
      const result = response.data.result;

      toast(
        ({ closeToast }) => (
          <div className='flex flex-col items-center gap-3 p-3'>
            <h2 className='text-xl font-bold text-green-500'>Final Result</h2>
            <p className='text-lg text-white'>{result}</p>
            <button
              onClick={closeToast}
              className='mt-2 px-4 py-1 bg-red-600 hover:bg-red-700 rounded text-white'>
              Close
            </button>
          </div>
        ),
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          style: {
            backgroundColor: "#1f2937",
            borderRadius: "10px",
          },
        }
      );

      const newEntry = {
        name,
        id,
        result,
        videoBlob: await videoToSend.arrayBuffer(),
        videoType: videoToSend.type,
        timestamp: Date.now(),
      };

      await addArchive(newEntry);

      toast.success("Video saved in archive!", {
        position: "top-center",
        autoClose: 3000,
      });

      setVideoBlob(null);
      setVideoFile(null);
      setIsFormVisible(false);
      setNextId(id + 1); // ✅ بعد الحفظ نزوّد ID
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='service py-10' id='Service'>
      <div className='flex justify-center items-center py-10'>
        <h1 className='text-5xl font-bold text-white'>Service</h1>
      </div>

      <div className='flex flex-col items-center justify-center p-5'>
        {/* Buttons */}
        <div className='flex gap-8 py-6'>
          <button
            onClick={handleUploadClick}
            className={`${style.submitGlassB} text-white text-sm md:text-lg font-inter font-medium cursor-pointer shadow-whiteShadow px-6 py-2 rounded-lg`}>
            Upload Video
          </button>
          <button
            onClick={handleRecordToggle}
            className={`py-2 px-6 text-lg font-bold ${
              isRecording
                ? `${style.stopGlassB} font-inter font-medium rounded-lg py-1 cursor-pointer shadow-whiteShadow`
                : `${style.startGlassB} font-inter font-medium rounded-lg px-3 py-1 cursor-pointer shadow-whiteShadow`
            } text-white rounded-lg`}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type='file'
          accept='video/*'
          ref={hiddenFileInput}
          onChange={handleVideoChange}
          className='hidden'
        />

        <div className='record mt-5 flex flex-col items-center gap-6'>
          {/* Video Preview */}
          {(videoBlob || videoFile) && (
            <div className='flex flex-col items-center'>
              <video
                controls
                className='w-96 overflow-hidden shadow-custom border border-slate-400/50 rounded-lg'
                src={
                  videoBlob
                    ? URL.createObjectURL(videoBlob)
                    : URL.createObjectURL(videoFile)
                }
              />
              <button
                onClick={deleteRecording}
                className='mt-5 cursor-pointer text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-sm px-4 py-3 text-center'>
                <i className='fa-solid fa-trash text-lg'></i>
              </button>
            </div>
          )}

          {/* Camera Preview While Recording */}
          {!videoBlob && !videoFile && (
            <div>
              <video ref={videoPreviewRef} className='w-96 rounded-lg' muted />
            </div>
          )}

          {/* Form */}
          {isFormVisible && (
            <form
              onSubmit={handleFormSubmit}
              className='flex flex-col gap-6 bg-gray-800/40 p-6 rounded-lg w-96 mt-5'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='username'
                  className='text-white font-inter text-lg'>
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  placeholder='Enter username'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='id' className='text-white font-inter text-lg'>
                  ID
                </label>
                <input
                  type='number'
                  name='id'
                  id='id'
                  value={nextId}
                  readOnly
                  className='px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
              </div>

              <button
                type='submit'
                className={`${style.submitGlassB} text-white px-6 py-2 rounded-lg mt-2`}>
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Service;
