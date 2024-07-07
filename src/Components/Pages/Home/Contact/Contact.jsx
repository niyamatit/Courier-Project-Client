/* eslint-disable no-unused-vars */
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

const Contact = () => {


  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");



  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


    emailjs
      .sendForm('service_vp1tpsv', 'template_jbi26ao', form.current, {
        publicKey: 'T3RCrWQ-4dRYIw8jz',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

  };

  return (
    <div>
      <div
        className="hero bg-secondary min-h-[50vh]"
        style={{
          backgroundImage: "url(https://transp-nextjs.vercel.app/_next/static/media/banner.416d8a43.png)",
        }}>
       
        <div className="hero-content font-rancho text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl text-primary font-bold">Contact With Us</h1>
            <p className="mb-5 text-white">
            We have been pioneering the industry in Bangladesh for 2 years, and delivering value
            products within given timeframe, every single time..
            </p>
          </div>
        </div>
      </div>

      <div className='lg:flex'>

      <div className="w-full mx-auto lg:w-[60%] h-full py-10 bg-secondary flex flex-col gap-8 p-4 lg:p-8 mb-5 mt-5  shadow-shadowOne">
        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 lg:gap-6 py-2 lg:py-5">
          {errMsg && (
            <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
              {errMsg}
            </p>
          )}
          {successMsg && (
            <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
              {successMsg}
            </p>
          )}
          <div
            className="w-full flex flex-col lg:flex-row gap-10"
            data-aos="zoom-in"
          >
            <div className="flex flex-col w-full gap-4" >
              <p className="text-sm text-gray-400 uppercase tracking-wide">
                Your name
              </p>
              <input
                type="text" name="from_name"
                className={`${errMsg === "Username is required!" &&
                  "outline-designColor"
                  } contactInput h-12`}

              />
            </div>
          </div>
          <div className="flex flex-col gap-4" data-aos="zoom-in">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Email
            </p>
            <input
              type="email" name="from_email"
              className={`${errMsg === "Please give your Email!" &&
                "outline-designColor"
                } contactInput h-12`}

            />
          </div>
          <div className="flex flex-col gap-4" data-aos="zoom-in">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Message
            </p>
            <textarea
              name="message"
              className={`${errMsg === "Message is required!" && "outline-designColor"
                } contactTextArea`}
              cols="30"
              rows="8"
            ></textarea>
          </div>
          <div className="w-full" data-aos="zoom-in">
            <button
              type="submit" value="Send"
              className="w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-designColor border-transparent"
            >
              Send Message
            </button>
          </div>
          {errMsg && (
            <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
              {errMsg}
            </p>
          )}
          {successMsg && (
            <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
              {successMsg}
            </p>
          )}
        </form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116859.81515520204!2d90.30665368768476!3d23.75204248045586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b783beb16f73%3A0x89452a685b92ff93!2sNiyamat%20IT%20-%20Build%20Up%20Your%20Career!5e0!3m2!1sen!2sbd!4v1719467357108!5m2!1sen!2sbd"
        width="600"
        height="530"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
      </div>
    </div>

  );
};

export default Contact;