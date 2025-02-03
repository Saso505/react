/* eslint-disable */
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import team images
import salma from '../../assets/team/salma.jpg';
import sara from '../../assets/team/sara.jpg';
import yara from '../../assets/team/yara.jpg';
import nada from '../../assets/team/nada.jpg';
import rania from '../../assets/team/rania.jpg';
import mohamed from '../../assets/team/mohamed.jpg';
import sief from '../../assets/team/sief.jpg';
import afnan from '../../assets/team/afnan.jpg';

// Create an array of team member objects with image, name, and position
const teamMembers = [
  { img: salma, name: 'Salma Osama', role: 'Front End', position: 'Front End', facebook: 'https://www.facebook.com/profile.php?id=100047044611996&sk=friends', link: 'https://www.linkedin.com/feed/', cv: 'https://docs.google.com/document/d/1tZLZr0AuSnzQ8DH5KyduGjx6g0N3vYg1/edit?usp=sharing&ouid=113792791113747167535&rtpof=true&sd=true' },
  { img: sara, name: 'Sara Youssef ', role: 'Hardware developer', position: 'Machine learning engineer', facebook: 'https://www.facebook.com/profile.php?id=100040774626165&mibextid=ZbWKwL', link: 'https://www.linkedin.com/in/sara-youssef-a82377292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ', cv: 'https://drive.google.com/file/d/1_dZiQA92AtrFa0HA5WAkbQ4UteFuEQqB/view?usp=drivesdk ' },
  { img: yara, name: 'Yara Moustafa', role: 'Machine learning engineer', position: 'Machine learning engineer ', facebook: 'https://www.facebook.com/share/18HJoCniBV/', link: 'https://www.linkedin.com/in/yara-elmeligy-349234252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', cv: 'https://drive.google.com/file/d/1YK3pdl6-SVYcWnwjjRAOK8F5oFh0mBDN/view?usp=drivesdk ' },
  { img: nada, name: 'Nada Atef', role: 'Machine learning engineer', position: 'Machine learning engineer', facebook: 'https://www.facebook.com/profile.php?id=100078137199154', link: 'https://www.linkedin.com/in/eng-nadaatef?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', cv: 'https://drive.google.com/file/d/1gaxu-Hvu9AdSJPg3yczH3Clm-pwGRK5o/view?usp=sharing ' },
  { img: rania, name: 'Rania Essam', role: 'Back End', position: 'Back-end', facebook: 'https://www.facebook.com/rania.essam.7792', link: 'https://www.linkedin.com/in/rania-essam-305135249/', cv: 'https://drive.google.com/file/d/1TExH6Qv128c0p0j5LxA-rsyI18mflzAZ/view' },
  { img: mohamed, name: 'Mohamed Osama', role: 'Hardware developer', position: 'Front End', facebook: 'https://www.facebook.com/share/1BDnhtdxwQ/', link: 'https://www.linkedin.com/in/mohamed-osama-b10884226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', cv: 'https://drive.google.com/drive/folders/16Yqm210HwxFbCUZfa4X4QdI6MS1AfLGb?usp=sharing ' },
  { img: sief, name: 'Saif Eldin Ahmed', role: 'Machine learning engineer', position: 'Machine learning engineer', facebook: 'https://www.facebook.com/seif.sakr.90?rdid=KYgl15BuS9UfjT2e&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14gH8pZ8ak%2F#', link: 'https://www.linkedin.com/in/seif-sakr-078a95304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ', cv: 'https://drive.google.com/file/d/1UzbQxsryUiumEqxYBE6dhXKKxgsi3aVd/view?usp=sharing' },
  { img: afnan, name: 'Afnan Mohamed', role: 'Hardware developer', position: 'Machine learning engineer', facebook: 'https://www.facebook.com/share/1CrL5KRkov/', link: 'https://www.linkedin.com/in/afnan-elshazly-078aa824a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ', cv: 'https://www.linkedin.com/in/afnan-elshazly-078aa824a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ' },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const swiperRef = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="team py-20" id="Team">
      <div className="head-contact flex justify-center items-center py-10 relative">
        <h1 className="font-Abril text-slate-100 text-5xl">Team</h1>
      </div>
      <div className="w-[85%] mx-auto relative">
        <Swiper
          ref={swiperRef}
          effect={'coverflow'}
          grabCursor={true}
          loop={true}
          slidesPerView={4}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="swiper_container py-10"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div
                className="team-member cursor-pointer"
                onClick={() => {
                  setSelectedMember(selectedMember === index ? null : index);
                  if (swiperRef.current) {
                    swiperRef.current.swiper.autoplay.stop();
                  }
                }}
              >
                <img src={member.img} alt={member.name} className="w-full rounded-lg" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Info box for selected member */}
        {selectedMember !== null && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center relative sm:w-[300px] md:w-[400px] h-[250px]">
              <button
                className="absolute top-2 right-2 text-gray-600 text-xl"
                onClick={() => {
                  setSelectedMember(null);
                  if (swiperRef.current) {
                    swiperRef.current.swiper.autoplay.start();
                  }
                }}
              >
                &times;
              </button>
              <img src={teamMembers[selectedMember].img} alt={teamMembers[selectedMember].name} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <div className="allData flex justify-between items-center ">


                <div className="team-member-info text-start">

                  <h3 className="font-Abril text-[rgb(25,30,63)] text-xl">{teamMembers[selectedMember].name}</h3>
                  <p className="font-Poppins text-gray-500 text-base">{teamMembers[selectedMember].position}</p>

                </div>

                <div className="social-media ">
                  <h4 className="font-Poppins text-gray-900 text-xl capitalize font-Abril font-medium">Social Links</h4>
                  <a href={teamMembers[selectedMember].facebook}><i className="fa-brands  fa-facebook-f  text-[#191e3f] text-lg  mx-2" ></i></a>
                  <a href={teamMembers[selectedMember].link}> <i className="text-teal-800 fa-brands  fa-linkedin-in text-lg"></i></a>
                  <a href={teamMembers[selectedMember].cv}> <i className="fa-solid fa-user text-slate-500 text-lg mx-2"></i></a>
                </div>
              </div>


            </div>
          </div>
        )}
      </div>
    </div>
  );
}
