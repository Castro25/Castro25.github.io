import  express  from "express";
import {checkUserEmail, registUser, getStatusByUser,  deleteUserFromFB, getUsersFromDB, loginUser, connectionAttempt} from "../controllers/users.js";

const router = express.Router();

router.post('/regist', registUser);

router.get('/get/status/:email', getStatusByUser);

router.get('/get/:email', checkUserEmail);

router.post('/login', loginUser)

router.post('/attempt', connectionAttempt)

//router.delete('/delete/:email' , deleteUserFromFB);
//router.get('/', getUsersFromDB);


export default router;