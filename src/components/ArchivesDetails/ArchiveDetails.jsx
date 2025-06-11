/* eslint-disable */

import { useLocation, useNavigate } from "react-router-dom";

export default function ArchiveDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const archive = location.state?.archive;

  if (!archive) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-900 text-white text-2xl'>
        No archive data available.
      </div>
    );
  }

  const videoUrl = URL.createObjectURL(
    new Blob([archive.videoBlob], { type: archive.videoType })
  );

  const date = new Date(archive.timestamp);
  const formattedDate = date.toLocaleString();

  const resultColor =
    archive.result === "truth"
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white";

  return (
    <>
      <div className='details bg body flex justify-center items-start w-full min-h-screen pt-24 px-4'>
        <div className='max-w-[500px] w-full flex flex-col items-center p-6 border border-[#99BBFE] rounded-lg bg-gray-800/50 shadow-lg'>
          {/* Video Frame ثابت */}
          <div className='w-[400px] h-[240px] overflow-hidden flex items-center justify-center bg-black rounded-lg border border-[#99BBFE] mb-6'>
            {videoUrl ? (
              <video
                className='w-full h-full object-cover'
                controls
                src={videoUrl}
              />
            ) : (
              <p className='text-white text-center'>No Video Available</p>
            )}
          </div>

          {/* Info Box */}
          <div className='content border border-[#99BBFE] bg-gray-900/70 rounded-lg mt-6 p-6 flex flex-col gap-6 w-full'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                Name:
              </span>
              <span className='text-white text-lg sm:text-xl font-bold'>
                {archive.name}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                Date:
              </span>
              <span className='text-white text-lg sm:text-xl font-bold'>
                {formattedDate}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                ID:
              </span>
              <span className='text-white text-lg sm:text-xl font-bold'>
                {archive.id}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                Result:
              </span>
              <span
                className={`text-lg sm:text-xl font-bold px-6 py-2 rounded-full ${
                  archive.result === "Truth"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}>
                {archive.result}
              </span>
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/archives")}
            className='mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-semibold w-full transition duration-200'>
            Back to Archives
          </button>
        </div>
      </div>
    </>
  );
}
