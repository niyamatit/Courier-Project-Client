

import axiosSecure from "./axiosSecure"

// create payment intent
export const createPaymentIntent = async price => {
  const { data } = await axiosSecure.post('/create-payment-intent', price)
  return data
}

// save booking info in db
export const saveBookingInfo = async paymentInfo => {
    const { data } = await axiosSecure.post('/bookings', paymentInfo)
    return data
  }


// get all bookings for a guest by email
export const getBookings = async email => {
  const { data } = await axiosSecure(`/bookings`)
  console.log(email)
  return data
}
