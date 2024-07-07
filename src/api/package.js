import axiosSecure from "./axiosSecure"

// save room
export const addPackage = async packageData => {
    const { data } = await axiosSecure.post(`/package`, packageData)
    return data
  }