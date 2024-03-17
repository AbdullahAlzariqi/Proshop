import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

//@desc Auth User & get Token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
    res.send('auth user')
})


//@desc Register User
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
})



//@desc logout user & clear cookie
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
})



//@desc Get user Profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})


//@desc Update user Profile
//@route PUT /api/users/profile      No id because it uses token
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
})



//@desc Get all users
//@route GET /api/users
//@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    res.send('get all users')
})



//@desc Get  user by ID
//@route GET /api/users/:id
//@access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
    res.send('get all users By id')
})



//@desc delete user 
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})



//@desc update user
//@route DELETE /api/users/:id
//@access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})


export {
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers
}

