import { Link } from "react-router-dom";
import logoImg from "../../assets/nexp-update.png";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.setAttribute("data-elfsight-app-lazy", "true");
    document.body.appendChild(script);
  }, []);

  return (
    <footer className="bg-blue-400 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex justify-between">
          <div className="mb-6 md:mb-0">
            <a href="" className="flex items-center">
              <img src={logoImg} className="h-20 rounded-lg mr-3" alt="" />
            </a>

            <div className="md:w-[500px] lg:w-[500px] md:mr-10">
              <p className="text-justify">
                We fuse our global network with our depth of expertise in air
                freight, ocean freight, railway transportation, trucking, and
                multimode transportation, also we are providing sourcing,
                warehousing, E-commercial fulfillment, and value-added service
                to our customers including kitting, assembly, customized
                package and business inserts, etc.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-white sm:gap-6 sm:grid-cols-4">
            {/* Services */}
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Our Services
              </h2>

              <ul className="text-white font-medium space-y-2">
                <li>Air Freight</li>
                <li>Ocean Freight</li>
                <li>Railway Freight</li>
                <li>Warehousing</li>
                <li>Distribution</li>
              </ul>
            </div>

            {/* Social */}
            <div className="ml-5">
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Follow us
              </h2>

              <ul className="text-white font-medium space-y-4">
                <li>
                  <a
                    href="https://www.facebook.com/Niyamat.Express"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
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

            {/* Legal */}
            <div className="hidden md:block lg:block">
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Legal
              </h2>

              <ul className="text-white font-medium">
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

            {/* Contact */}
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Contact Us
              </h2>

              <div className="text-white font-medium space-y-2">
                <div className="font-semibold">
                  <span>Email:</span>{" "}
                  <span className="block sm:inline">
                    support@niyamatexpress.com
                  </span>
                </div>

                <div>
                  <span className="font-semibold">Tel:</span>{" "}
                  <span className="block sm:inline">
                    09617179001, 09617179177
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6 text-white">
          {/* China Office */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              China Business Office:
            </h3>

            <p>
              Room no.232,(2ndfloor), 689 Gongren road, Yiwu City,
              Zhejiang, China.
            </p>

            <p>Telephone: +86 18657971575</p>
          </div>

          {/* UK Office */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              UK Business Office:
            </h3>

            <p>
              Unit – 25, The Sidings, Hainault road, E11 1HD,
              London, United kingdom.
            </p>

            <p>Telephone: +4402085584400</p>
          </div>

          {/* Bangladesh Office */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              Bangladesh Office:
            </h3>

            <p>
              Doric Madani Tower, Chittagong Road, Narayanganj 1430
            </p>
          </div>

          {/* Saudi Arabia Office */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              Saudi Arabia Office:
            </h3>

            <p>
              Al Ajialah, Al-Shemaysi, Riyadh 12745,
              Saudi Arabia
            </p>

            <p>
              Ranjha Electronics Shop, 4065-4141 Shalhoub,
              12745
            </p>

            <p>Mobile: +966 57 305 0850</p>
          </div>

          {/* Japan Office */}
          {/* Japan Office */}
<div>
  <h3 className="text-lg font-bold mb-2">
    Japan Office:
  </h3>

  <p>
    APARTMEN : TAKARA DAIICHI SKY HEIGHTS 403,
  </p>

  <p>
    1-17-4 CHIKAMADORI,
    MINAMIKU,
    NAGOYA-SHI,
  </p>

  <p>
    457-0071
  </p>

  <p className="mt-2">
    Mobile: +81 7085287886
  </p>
</div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2026{" "}
            <a
              href="https://niyamatexpress.com/"
              className="hover:underline"
            >
              Niyamat Express™
            </a>
            . All Rights Reserved by Niyamat Express.
            <p className="text-start mt-2">
              Developed By{" "}
              <a href="https://niyamatit.com/" className="font-semibold">
                Niyamat IT
              </a>{" "}
              <span className="font-bold">Part Of</span>{" "}
              <a
                className="font-bold"
                href="https://www.niyamatgroup.com/"
              >
                Niyamat Unity
              </a>
            </p>
          </span>

          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* Social Media Icons */}
          </div>
        </div>
      </div>

      <div className="elfsight-app-5c88a7da-0668-469b-a647-e6f25a35dc6d" />
    </footer>
  );
};

export default Footer;