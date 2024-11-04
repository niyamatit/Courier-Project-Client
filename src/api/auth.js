import axiosSecure from "./axiosSecure"

export const saveUser = async user => {

    const currentUser = {
        email: user.email,
        displayName: user?.displayName,
        role: 'guest',
        status: 'verified'
    }

    const { data } = await axiosSecure.put(`/users/${user.email}`, currentUser)

    return data;

}

export const getToken = async email => {
    const { data } = await axiosSecure.post(`/jwt`, email)
    console.log("token created ------------>", data)
    return data;
}

export const clearCookie = async () => {
    const { data } = await axiosSecure.get('/logout')

    return data;
}

// Get user email role
export const getRole = async (email) => {
    const { data } = await axiosSecure(`/user/${email}`)
    return data.role
}

export const getParcel = async () => {
    const { data } = await axiosSecure.get('/parcel');
    return data;
};

export const getPackage = async () => {
    const { data } = await axiosSecure.get(`/package`);
    return data;
};

export const getAllPackage = async (email) => {
    const { data } = await axiosSecure.get(`/package/${email}`);
    console.log("Fetching packages for email:", email);
    return data;
};


export const getAllRider = async (email, status = "processing") => {
    const { data } = await axiosSecure.get(`/rider/${email}?status=${status}`);
    console.log("Fetching riders for email:", email);
    return data;
};


export const getAllRecharge = async (email, status = "processing") => {
    const { data } = await axiosSecure.get(`/recharge/${email}?status=${status}`);
    // console.log("Fetching riders for email:", email);
    return data;
};


// Save user data in database
export const updateRole = async ({ email, role }) => {
    const currentUser = {
        email,
        role,
        status: 'Verified',
    }
    const { data } = await axiosSecure.put(`/users/update/${email}`, currentUser)
    return data
}

// update action save data in database
export const updateAction = async ({ update, id, note }) => {
    const currentAction = { update, note }
    console.log(update)
    const { data } = await axiosSecure.patch(`/package/${id}`, currentAction)
    return data
}

// update action save data in database
export const updateActionOnline = async ({ update, id }) => {
    const currentAction = { update }
    console.log(update)
    const { data } = await axiosSecure.patch(`/bookings/${id}`, currentAction)
    return data
}


// Get all users
export const getAllUsers = async () => {
    const { data } = await axiosSecure(`/users`)
    return data
}
// Get all apply
export const getPendingApply = async () => {
    const { data } = await axiosSecure(`/apply`)
    return data
}