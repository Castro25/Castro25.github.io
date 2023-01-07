import  express  from "express";
import {checkUserEmail, registUser, getStatusByUser,  deleteUserFromFB, getUsersFromDB, loginUser} from "../controllers/users.js";

const router = express.Router();

router.post('/regist', registUser);

router.get('/get/status/:email', getStatusByUser);

router.get('/get/:email', checkUserEmail);

router.delete('/delete/:email' , deleteUserFromFB);
router.get('/', getUsersFromDB);
router.post('/login', loginUser)

export default router;