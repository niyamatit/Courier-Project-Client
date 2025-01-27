import axiosSecure from "./axiosSecure"

// save room
export const addPackage = async packageData => {
    const { data } = await axiosSecure.post(`/package`, packageData)
    return data
  }
export const addMerchantPackage = async packageData => {
    const { data } = await axiosSecure.post(`/packageMerchant`, packageData)
    return data
  }