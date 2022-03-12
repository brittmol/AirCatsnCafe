// ------------------ IMPORTS ------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");
const { Booking } = require("../../db/models");
const { User } = require("../../db/models");
const { Review } = require("../../db/models");

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
    .withMessage("Please provide a valid zip code."),
  check("hrPrice")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an hourly price for your spot.")
    .isLength({ min: 1 })
    .withMessage("Please provide a valid hourly price."),
  handleValidationErrors,
];

// ------------------ SPOTS -----------------------------------------

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Booking,
          include: [User, Spot],
        },
        {
          model: Review,
          include: [User, Spot],
        },
      ],
    });
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
    const newSpot = await Spot.findByPk(spot.id, {
      include: [
        {
          model: User,
        },
        {
          model: Booking,
          include: [User, Spot],
        },
        {
          model: Review,
          include: [User, Spot],
        },
      ],
    });
    return res.json(newSpot);
  })
);

router.put(
  "/:id",
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    const updatedSpot = await spot.update(req.body);
    const newSpot = await Spot.findByPk(updatedSpot.id, {
      include: [
        {
          model: User,
        },
        {
          model: Booking,
          include: [User, Spot],
        },
        {
          model: Review,
          include: [User, Spot],
        },
      ],
    });
    return res.json(newSpot);
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    if (!spot) throw new Error("Cannot find spot");
    await spot.destroy();
    return res.json(spot);
  })
);

// ------------------ BOOKINGS -----------------------------------------
router.get(
  "/:id/bookings",
  asyncHandler(async (req, res) => {
    // const userId = req.session.auth.userId
    const spotId = req.params.id;
    const bookings = await Booking.findAll({
      where: { spotId },
    });
    return res.json(bookings);
  })
);

router.post(
  "/:id/bookings",
  requireAuth,
  asyncHandler(async (req, res) => {
    const booking = await Booking.create(req.body);
    const newBooking = await Booking.findByPk(booking.id, {
      include: [{ model: User }, { model: Spot }],
    });
    return res.json(newBooking);
  })
);

router.put(
  "/:spotId/bookings/:bookingId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { spotId, bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
    const updatedBooking = await booking.update(req.body);
    const newBooking = await Booking.findByPk(updatedBooking.id, {
      include: [{ model: User }, { model: Spot }],
    });
    return res.json(newBooking);
  })
);

router.delete(
  "/:spotId/bookings/:bookingId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { spotId, bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw new Error("Cannot find spot");
    await booking.destroy();
    return res.json(booking);
  })
);

// ------------------ REVIEWS -----------------------------------------

router.get(
  "/:id/reviews",
  asyncHandler(async (req, res) => {
    // const userId = req.session.auth.userId
    const spotId = req.params.id;
    const reviews = await Review.findAll({
      where: { spotId },
    });
    return res.json(reviews);
  })
);

router.post(
  "/:id/reviews",
  requireAuth,
  asyncHandler(async (req, res) => {
    const review = await Review.create(req.body);
    const newReview = await Review.findByPk(review.id, {
      include: [{ model: User }, { model: Spot }],
    });
    return res.json(newReview);
  })
);

router.put(
  "/:spotId/reviews/:reviewId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { spotId, reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    const updatedReview = await review.update(req.body);
    const newReview = await Review.findByPk(updatedReview.id, {
      include: [{ model: User }, { model: Spot }],
    });
    return res.json(newReview);
  })
);

router.delete(
  "/:spotId/reviews/:reviewId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { spotId, reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review) throw new Error("Cannot find spot");
    await review.destroy();
    return res.json(review);
  })
);

// ------------------ EXPORTS ------------------------------------------
module.exports = router;
