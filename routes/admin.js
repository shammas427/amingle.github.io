const express = require("express");
const router = express.Router();

const auth =
require("../middleware/auth");

router.get(
"/dashboard",
auth,
(req,res)=>{

if(
req.user.role !== "admin"
){

return res.status(403).json({
message:"Admin Only"
});

}

res.json({
message:"Welcome Admin"
});

});

module.exports = router;
