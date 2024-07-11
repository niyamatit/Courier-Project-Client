/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PackageDetails } from './PackageDetails';


const PrintModal = ({ closeModal, isOpen, bookingInfo }) => {
    const formRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => formRef.current,
        documentTitle: 'Package Details',
    });

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Print Details
                                </Dialog.Title>
                                <div ref={formRef} className="mt-2 text-center">
                                    <PackageDetails bookingInfo={bookingInfo} />
                                    <PackageDetails bookingInfo={bookingInfo} />
                                    <PackageDetails bookingInfo={bookingInfo} />
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={handlePrint}
                                        className="btn border-2 border-primary text-xl text-white hover:bg-primary bg-secondary"
                                    >
                                        Print Package Details
                                    </button>
                                </div>

                                <hr className='mt-8' />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PrintModal;
