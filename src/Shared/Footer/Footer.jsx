import { Link } from "react-router-dom";
import logoImg from '../../assets/nexp-update.png'

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="" className="flex items-center">
              <img src={logoImg} className="h-20 rounded-lg mr-3" alt="" />
            </a>
            <div className="md:w-[600px] lg:w-[700px] md:mr-10">
              <p className="text-justify">
                We fuse our global network with our depth of expertise in air freight, ocean freight, railway transportation, trucking, and multimode transportation, also we are providing sourcing, warehousing, E-commercial fulfillment, and value-added service to our customers including kitting, assembly, customized package and business inserts, etc.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 text-white sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                Our Services
              </h2>
              <ul className="text-white dark:text-gray-300 font-medium">
                <li>Air Freight</li>
                <li>Ocean Freight</li>
                <li>Railway Freight</li>
                <li>Warehousing</li>
                <li>Distribution</li>
              </ul>
            </div>
            <div className="ml-5">
              <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-white dark:text-gray-300 font-medium space-y-4">
                <li className="">
                  <a href="https://www.facebook.com/Niyamat.Express" className="hover:underline ">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden md:block lg::block">
              <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-white dark:text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <Link to="termCondition" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                Contact US
              </h2>
              <ul className="text-white dark:text-gray-300 font-medium">
                <p className="mt-4 flex flex-col  md:flex-row lg:flex-row gap-2">Email: <span>support@niyamatexpress.com</span></p>
                <p>Tel: 09697687401, 09638840680</p>
              </ul>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div>
            <h3 className="text-lg font-bold mb-2">China Business Office:</h3>
            <p>Room no.232,(2ndfloor), 689 Gongren road, Yiwu City, Zhejiang, China.</p>
            <p>Telephone: ‪+86 18657971575‬</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">UK Business Office:</h3>
            <p>Unit – 25, The Sidings, Hainault road, E11 1HD, London, United kingdom.</p>
            <p>Telephone: ‪+4402085584400‬</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Bangladesh Office:</h3>
            <p>Doric Madani Tower ,Chittagong Road, Narayanganj 1430</p>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center dark:text-gray-300">
            © 2025{" "}
            <a href="https://niyamatexpress.com/" className="hover:underline">
              Niyamat Express™
            </a>
            . All Rights Reserved by Niyamat Express.
            <p className="text-start">Developed By <a href="https://niyamatit.com/">Niyamat IT</a> <a className="font-bold">Part Of</a> <a className="font-bold" href="https://www.niyamatgroup.com/">Niyamat Unity</a></p>
          </span>

          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* Social Media Icons (unchanged) */}
            {/* <!-- Keeping your original social icons block unchanged --> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
