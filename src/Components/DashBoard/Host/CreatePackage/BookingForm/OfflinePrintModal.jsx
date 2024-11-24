/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { OfflineBookingDetails } from "./OfflineBookingDetails";
import OfflineSticker from "../OfflineSticker";
// import StickerDetails from "../StickerDetails";

const OfflinePrintModal = ({ closeModal, isOpen, bookingInfo }) => {
  const packageRef = useRef(); // For PackageDetails
  const stickerRef = useRef(); // For StickerDetails

  const handlePrintPackage = useReactToPrint({
    content: () => packageRef.current,
    documentTitle: 'Package Details',
  });

  const handlePrintSticker = useReactToPrint({
    content: () => stickerRef.current,
    documentTitle: 'Sticker Details',
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Print Details
                </Dialog.Title>
                <div ref={packageRef} className="mt-2 text-center">
                  <OfflineBookingDetails bookingInfo={bookingInfo} />
                  <OfflineBookingDetails bookingInfo={bookingInfo} />
                  <OfflineBookingDetails bookingInfo={bookingInfo} />
                </div>

                <div ref={stickerRef} className="mt-2 text-center">
                  {Array.from({ length: bookingInfo?.lot || 1 }).map((_, index) => (
                    <OfflineSticker key={index} bookingInfo={bookingInfo} />
                  ))}

                </div>

                <div className="flex justify-center mt-4">
                  {/* Button to print PackageDetails */}
                  <button
                    onClick={handlePrintPackage}
                    className="btn border-2 border-primary text-xl text-white hover:bg-primary bg-secondary mx-2"
                  >
                    Print Package Details
                  </button>

                  {/* Button to print StickerDetails */}
                  <button
                    onClick={handlePrintSticker}
                    className="btn border-2 border-primary text-xl text-white hover:bg-primary bg-secondary mx-2"
                  >
                    Print Sticker
                  </button>
                </div>

                <hr className="mt-8" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OfflinePrintModal;
