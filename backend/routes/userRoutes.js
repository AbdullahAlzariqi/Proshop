import {
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers
} from "../controllers/userController.js";
import express from "express";
const router = express.Router();


router.route('/').
    get(getUsers).
    post(registerUser);


router.post('/logout', logoutUser);
router.post('/login', authUser);

router.route('/profile').
    get(getUserProfile).
    put(updateUserProfile)

router.route('/:id').
    get(getUserById).
    put(updateUser).
    delete(deleteUser)


export default router




