/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllArchives } from "../../utility/db";

export default function Archives() {
  const navigate = useNavigate();
  const [archives, setArchives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchArchives() {
      const data = await getAllArchives();
      setArchives(data);
    }
    fetchArchives();
  }, []);

  const filteredArchives = archives.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArchiveClick = (archive) => {
    navigate("/archived", { state: { archive } });
  };

  return (
    <>
      <div className='archives bg py-20 px-48'>
        <div className='container mx-auto'>
          <div className='head'>
            <h1 className='font-Abril text-slate-100 md:text-5xl text-2xl py-10 text-center relative'>
              Archives
            </h1>
          </div>

          {/* Search */}
          <div className='header flex items-center justify-between py-5'>
            <div className='search-name sm:w-1/3 w-1/2'>
              <form
                className='w-full'
                onSubmit={(e) => {
                  e.preventDefault();
                }}>
                <div className='flex w-full'>
                  <div className='relative w-full'>
                    <input
                      type='search'
                      id='location-search'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
                      placeholder='Search by name'
                    />
                    <button
                      type='submit'
                      className='absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-[#262463] rounded-e-lg border border-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        />
                      </svg>
                      <span className='sr-only'>Search</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Archives List */}
          {filteredArchives.length === 0 ? (
            <p className='text-center text-gray-300 text-xl mt-10'>
              No videos found.
            </p>
          ) : (
            filteredArchives.map((entry) => {
              const videoUrl = URL.createObjectURL(
                new Blob([entry.videoBlob], { type: entry.videoType })
              );

              const date = new Date(entry.timestamp);
              const formattedDate = date.toLocaleString();

              return (
                <React.Fragment key={entry.timestamp}>
                  <div className='content mt-10 flex items-center justify-between py-5'>
                    <div
                      className='card flex md:gap-10 gap-5 cursor-pointer'
                      onClick={() => handleArchiveClick(entry)}>
                      <div className='video cursor-pointer'>
                        <video
                          className='md:w-56 w-40 rounded-lg'
                          src={videoUrl}
                          muted
                        />
                      </div>
                      <div className='card-body flex justify-center flex-col'>
                        <h3 className='capitalize py-3 text-gray-300 text-sm sm:text-base font-semibold'>
                          Name: {entry.name}
                        </h3>
                        <p className='text-gray-300 text-sm sm:text-base font-semibold'>
                          ID: {entry.id}
                        </p>
                        <p className='text-gray-300 text-sm sm:text-base font-semibold'>
                          Result: {entry.result}
                        </p>
                        <p className='text-gray-300 text-sm sm:text-base font-semibold'>
                          Date: {formattedDate}
                        </p>
                      </div>
                    </div>
                    <div className='info'>
                      <button
                        type='button'
                        onClick={() => handleArchiveClick(entry)}
                        className='bg-[#99BBFE] font-Abril font-medium rounded-lg text-white sm:px-6 px-3 py-2 cursor-pointer md:text-xl text-sm capitalize shadow-whiteShado'>
                        Info Video
                      </button>
                    </div>
                  </div>
                  <div className='line w-full h-[2px] mt-5 bg-[#99BBFE] rounded-lg'></div>
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
