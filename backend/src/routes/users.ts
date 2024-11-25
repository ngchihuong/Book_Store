import { check } from "express-validator";
import express from "express"
import { authRolesController, fetchAllAccountController, fetchCurrentUserController, loginController, logOutController, registerController, searchUserController, validateToken } from "../controllers/userController";
import verifyToken from "../middleware/auth";
import authRoles from "../middleware/authRoles";

const router = express.Router();

//api/users/....

//router user
router.post("/register", [
    check("email", "Email is required").isEmail(),
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    check("phoneNumber", "Phone Number is required").isString()
],
    registerController
);
router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 })
],
    loginController);
router.post("/logout", logOutController);
router.get("/validate-token", verifyToken, validateToken)
router.get("/me", verifyToken, fetchCurrentUserController)


//router admin
router.get("/admin", verifyToken, authRoles(["admin"]), authRolesController)
router.get("/users", verifyToken, authRoles(['admin']), fetchAllAccountController)
router.get('/search/:name', verifyToken, authRoles(["admin"]), searchUserController)
// router.put("/change-role/:id", verifyToken, authRoles(["admin"]), changeRoleUserController)

export default router;