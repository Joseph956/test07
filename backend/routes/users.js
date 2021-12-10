const express = require('express');
const router = express.Router();
const multer = require('../middlware/multer-config');
const auth = require('../middlware/auth');
const usersCtrl = require("../controllers/users");

router.get("/", auth.token, usersCtrl.findAllPublished);
router.get("/:id", auth.token, usersCtrl.findOneProfil);
router.put("/:id", auth.token, multer, auth.haveRightOnProfile, usersCtrl.updateProfil);
router.delete("/:id", auth.token, auth.haveRightOnProfile, usersCtrl.deleteProfil);
router.get('/search', auth.token,);

// // Modérateur: Modérer les interactions entre salariés.
// // Employés: Doivent pouvoir reperer facilement les derniers posts.
// // Accès à un forum de publication (textes).
// // Accès à un forum de publication (multimédias).
// //Organiser des tests de fonctionalités avec les salariés.

module.exports = router;