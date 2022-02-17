// ------------------ IMPORTS ------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// ------------------ ROUTES ------------------------------------------

const validateSpot = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title for your spot."),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an address for your spot."),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a city for your spot."),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a state for your spot."),
  // .isIn(abbStates)
  // .withMessage("Please provide a valid state."),
  check("zipCode")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a zip code for your spot.")
    .isLength({ min: 5, max: 5 })
    .withMessage("Please provide a zip code between 1 and 5 for Rating"),
  handleValidationErrors,
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll();
    return res.json(spots);
  })
);

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const spot = await Spot.findByPk(req.params.id, {
//       include: [User],
//     });
//     return res.json(spot);
//   })
// );

router.post(
  "/",
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res) => {
    const spot = await Spot.create(req.body);
    return res.json(spot);
  })
);

// router.put(
//   "/:id",
//   requireAuth,
//   validateEvent,
//   asyncHandler(async (req, res) => {
//     const spot = await Spot.findByPk(req.params.id);
//     const updatedSpot = await spot.update(req.body);
//     const updatedSpotx = await Spot.findByPk(updatedSpot.id, {
//       include: [User],
//     });
//     return res.json(updatedSpotx);
//   })
// );

// router.delete(
//   "/:id",
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const spot = await Spot.findByPk(req.params.id);
//     if (!spot) throw new Error("Cannot find spot");
//     await spot.destroy();
//     return res.json({});
//   })
// );

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
