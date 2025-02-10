
/* eslint-disable */

import React from 'react'
import lie from '../../assets/team/test_truth.mp4'

export default function ArchiveDetails() {
    return (
        <>

<div className='details  bg body items-center w-full flex h-screen '>

    <div className='container  h-full items-center   mb-20 justify-center flex  mx-auto'>
   <div className="video md:w-[400px] md:h-[300px] h-[200px] w-[300px] border border-spacing-2   border-[#99BBFE] rounded-lg" >
   <video className=' w-full h-full rounded-lg' controls autoPlay muted loop>
            <source src={lie} type='video/mp4' />
        </video>

        <div className="content border border-spacing-2 border-[#99BBFE] rounded-lg mt-10 py-2">
            <p className='text-white font-Abril font-bold text-lg sm:text-2xl p-3 '>Name : <span> </span></p>
            <p className='text-white font-Abril font-bold text-lg sm:text-2xl p-3  '> id : <span></span> </p>
            <p className='text-white font-Abril font-bold text-lg sm:text-2xl p-3  '>truth</p>

        </div>

   </div>



    </div>
    </div>





        </>
    )
}
