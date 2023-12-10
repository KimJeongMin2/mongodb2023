const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Lodging = require("../models/Lodging");
const Guest = require("../models/Guest");

const getDays = (start, end) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((end - start) / oneDay));
  return diffDays;
};
const getWeekendDays = (start, end) => {
  let result = 0;
  const current = new Date(start.getTime());
  const endDateTime = end.getTime();
  const weekendDays = [5, 6, 0];

  while (current.getTime() < endDateTime) {
    if (weekendDays.includes(current.getDay())) {
      result++;
    }
    current.setDate(current.getDate() + 1);
  }

  return result;
};

// 예약 등록
router.post("/new", async (req, res) => {
  try {
    const { checkIn, checkOut, guests, lodgingId, guestId } = req.body;

    const lodging = await Lodging.findOne(lodgingId);
    const guest = await Guest.findOne(guestId);

    // console.log("lodging: ", lodging);
    // console.log("guest: ", guest);

    if (!lodging || !guest)
      return res.status(400).send({ error: "lodging or guest does not exist" });

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const totalDays = getDays(checkInDate, checkOutDate);
    const weekendDays = getWeekendDays(checkInDate, checkOutDate);
    const weekdayDays = totalDays - weekendDays;

    const review = null;
    const totalFee =
      weekdayDays * lodging.weekdayFee + weekendDays * lodging.weekendFee;

    const reservation = new Reservation({
      checkIn,
      checkOut,
      guests,
      totalFee,
      lodging,
      guest,
      review,
    });

    await reservation.save();
    return res.send({ reservation });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// 예약 취소
router.delete("/delete", async (req, res) => {
  try {
    const { reserveId } = req.body;
    const reservation = await Reservation.findOneAndDelete(reserveId);
    if (!reservation)
      return res.status(400).send({ error: "reservation does not exist" });

    res.send(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;