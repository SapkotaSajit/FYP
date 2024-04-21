import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  getUsersRole,

} from "../controllers/Admin/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { verifyResetCode } from "../controllers/Admin/forgotPassword.js";
import { refreshToken } from "../controllers/Admin/RefreshToken.js";
import { createService, deleteServiceById, getAllServices, getServiceById, updateServiceById } from "../controllers/Admin/ServicesController.js";
import { createRole, deleteRoleById, getRoleById, getRoles, updateRoleById } from "../controllers/Admin/RoleController.js";
import { CreateUser, deleteUsersById } from "../controllers/Admin/AdminUserController.js";
import { checkAdminRole, checkStaffRole, checkUserRole } from "../middleware/CheckRole.js";
import { upload } from "../helper/serviceImage.js";
import { getServicesByParentId, getServicesWithNullParentId } from "../controllers/API/HomeController.js";
import { bookService, deleteBookingById, getAllBookings, getAllProcessingBookings } from "../controllers/API/BookServiceController.js";
import { createguide, deleteguideById, getAllguides, getguideById, updateguideById } from "../controllers/Admin/GuideController.js";
import { uploadGuide } from "../helper/guidImages.js";
import { createGuideTypes, getAllguideTypes, getGuideTypesByGuideId } from "../controllers/Admin/GuideTypeController.js";
import { allSteps, createGuideSteps, getGuideStepsByGuideTypeId, updateGuideStepsById } from "../controllers/Admin/GuideStepsController.js";
import { uploadGuideTypes } from "../helper/guideTypesImage.js";
import { uploadGuideSteps } from "../helper/guideStepsImage.js";
import { createBookingAssign, deleteBookingAssignById, getAllUserBookingAcceptAssignments, getAllUserBookingAssignments, getAllUserBookingCompleteAssignments, getAllUserBookingRejectAssignments, getBookingAssignById, updateBookingAssignById, updateBookingAssignStatus } from "../controllers/Admin/BookingAssignController.js";
import { getAllAcceptBooking, getAllCompletedBooking, getAllPendingBooking, getAllRejectBooking } from "../controllers/Admin/BookingAdminAssigned.js";
import { forgotPassword,  resetPassword } from "../controllers/Admin/UserController.js";
import { createContact, AllContacts, getContactById, deleteContactById,  } from "../controllers/Admin/ContactController.js";
import { changePassword } from "../controllers/Admin/changePassword.js";
import countController from "../controllers/Admin/countController.js";
import { deleteGuideTypeById } from "../controllers/Admin/GuideTypeController.js";
import { updateGuideTypesById } from "../controllers/Admin/GuideTypeController.js";
import { deleteGuideStepById } from "../controllers/Admin/GuideStepsController.js";

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);
router.post('/verify-reset-code', verifyResetCode);



router.post("/change-password", verifyToken, changePassword);

router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.post('/createRole',verifyToken,checkAdminRole, createRole);
router.get("/users", verifyToken, checkAdminRole, getUsers);
router.get('/contacts',verifyToken, checkAdminRole, AllContacts);
router.get("/usersRole", verifyToken, checkAdminRole, getUsersRole);
router.delete("/deleteUser/:id", verifyToken, checkAdminRole, deleteUsersById);
router.post('/roles', verifyToken, checkAdminRole, createRole);
router.get('/roleLists', verifyToken, checkAdminRole, getRoles);
router.get('/roles/:id', verifyToken, checkAdminRole, getRoleById);
router.put('/editRole/:id', verifyToken, checkAdminRole, updateRoleById);
router.delete('/deleteRole/:id', verifyToken, checkAdminRole, deleteRoleById);
router.delete('/deleteService/:id', verifyToken, checkAdminRole, deleteServiceById);
router.put('/editService/:id',upload,updateServiceById,verifyToken, checkAdminRole,);
router.get('/services/:id', verifyToken, checkAdminRole, getServiceById);
router.get("/services", verifyToken, checkAdminRole, getAllServices);
router.post("/createService",upload,verifyToken, checkAdminRole,createService);
router.post("/createUser", verifyToken, checkAdminRole, CreateUser);

router.get('/pendingBookings', verifyToken, checkAdminRole, getAllPendingBooking);
router.get('/completedBookings', verifyToken, checkAdminRole, getAllCompletedBooking);
router.get('/acceptBookings', verifyToken, checkAdminRole, getAllAcceptBooking);
router.get('/rejectBookings', verifyToken, checkAdminRole, getAllRejectBooking);
router.get('/servicesWithNullParent',getServicesWithNullParentId);
router.get('/parentServices/:parentId', getServicesByParentId);

router.get('/bookings',verifyToken,checkAdminRole, getAllBookings);
router.get('/assignedBookings',verifyToken,checkAdminRole, getAllProcessingBookings);
router.post('/bookService/:serviceId',verifyToken, checkUserRole, bookService);
router.delete('/deleteBooking/:id', verifyToken, checkAdminRole, deleteBookingById);



router.post('/createGuide',verifyToken,checkAdminRole, uploadGuide, createguide);
router.get('/guides', getAllguides);
router.get('/guides/:id', getguideById);
router.put('/editguide/:id',upload,updateguideById,verifyToken, checkAdminRole);
router.put('/guides/:id', updateguideById); 
router.delete('/guides/:id', deleteguideById);

router.get('/guidesTypes', getAllguideTypes);
router.get('/guidesTypes/:id', getGuideTypesByGuideId);


router.get('/guideTypes',verifyToken,checkAdminRole, getAllguideTypes);
router.get('/guideType/:guide_id',getGuideTypesByGuideId);
router.post("/createGuideTypes",uploadGuideTypes,createGuideTypes,verifyToken, checkAdminRole,);
router.delete('/deleteGuideType/:id', verifyToken, checkAdminRole, deleteGuideTypeById);
router.put('/editguideTypes/:id', upload, verifyToken, updateGuideTypesById, checkAdminRole);
router.put('/editguideTypes/:id', updateGuideTypesById);










router.get('/guideSteps', verifyToken,checkAdminRole, allSteps );
router.get('/guideStep/:guideTypes_id',getGuideStepsByGuideTypeId);
router.delete('/deleteGuideStep/:id', deleteGuideStepById, verifyToken, checkAdminRole);
router.put('/editguideSteps/guideTypes_id', upload, verifyToken, updateGuideStepsById, checkAdminRole);
router.put('/editguideSteps/guideTypes_id', updateGuideStepsById);
router.put('/editguideSteps/:id', upload, verifyToken, updateGuideStepsById, checkAdminRole);




router.post("/createGuideSteps",uploadGuideSteps,createGuideSteps,verifyToken, checkAdminRole,);
router.patch('/bookingAssign/:id/status',verifyToken, checkStaffRole, updateBookingAssignStatus);
router.post('/assignBooking/:bookingId', createBookingAssign);
router.get('/assignUsersBookings/:userId',verifyToken, checkStaffRole, getAllUserBookingAssignments);
router.get('/assignUsersCompletedBookings/:userId',verifyToken, checkStaffRole, getAllUserBookingCompleteAssignments);
router.get('/assignUsersAcceptedBookings/:userId',verifyToken, checkStaffRole, getAllUserBookingAcceptAssignments);
router.get('/assignUsersRejectedBookings/:userId',verifyToken, checkStaffRole, getAllUserBookingRejectAssignments);
router.get('/:id', getBookingAssignById);
router.put('/:id', updateBookingAssignById);
router.delete('/:id', deleteBookingAssignById,checkAdminRole);




router.post('/createContact', createContact);

router.post('/createContact', createContact);
router.get('/AllContacts', AllContacts);
router.get('/getContactById/:id', getContactById);


router.get('/totalUser', countController.getTotalUsers);
router.get('/totalStaff', countController.getTotalStaff);

export default router;



