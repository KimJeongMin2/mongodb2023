const express = require("express");
const router = express.Router();
const Lodging = require("../models/Lodging");
const Review = require("../models/Review");
const fs = require("fs");
const { generateLodging } = require("../faker");
const Reservation = require("../models/Reservation");

router.post("/generate", async (req, res) => {
  try {
    const lodging = generateLodging();

    await lodging.save();

    fs.appendFile("lodgingName.txt", lodging.name + "\n", (err) => {
      if (err) throw err;
    });

    res.send(lodging);
  } catch (error) {
    console.error("errorrrr", error);
    res.status(500).send(error);
  }
});

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

router.get('/search', async (req, res) => {
  try {
  const { checkIn, checkOut, guests, lodgingType } = req.query;
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const totalDays = getDays(checkInDate, checkOutDate);
  const weekendDays = getWeekendDays(checkInDate, checkOutDate);
  const weekdayDays = totalDays - weekendDays;
  
  console.log("check", checkInDate)
  console.log("out", checkOutDate)
  const reservedLodgingIds = await Reservation.find({
    $or: [
      { checkIn: { $gte: checkInDate, $lt: checkOutDate } },
      { checkOut: { $gt: checkInDate, $lte: checkOutDate } },
      { checkIn: { $lte: checkInDate }, checkOut: { $gte: checkOutDate } }
    ]
  }).distinct('lodging');

  console.log("rrrrrrr", reservedLodgingIds)
  
  let lodgings = await Lodging.find({
    _id: { $nin: reservedLodgingIds },
    type: lodgingType,
    capacity: { $gte: guests },
  }).select('type name weekdayFee weekendFee');
  
  lodgings = await Promise.all(lodgings.map(async lodging => {
    const totalFee = (lodging.weekdayFee * weekdayDays) + (lodging.weekendFee * weekendDays);
    const reviews = await Review.find({ lodgingId: lodging._id });
    const averageRating = reviews.length > 0 ? 
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  
    return {
      ...lodging._doc,
      totalFee,
      averageRating
    };
  }));
  
  lodgings.sort((a, b) => b.totalFee - a.totalFee || b.averageRating - a.averageRating);
  
  if (lodgings.length === 0) {
    res.send("검색 조건에 맞는 숙소가 없습니다.");
  } else {
    res.send(lodgings);
  }
} catch (error) {
  console.error(error);
  res.status(500).send(error);
}
});


router.get("/:id", async (req, res) => {
  try {
    const lodgingId = req.params.id;
    const [year, month] = req.query.month.split("-").map(Number);

    const lodging = await Lodging.findById(lodgingId);
    if (!lodging) {
      return res.status(404).send({ message: "숙소를 찾을 수 없습니다." });
    }

    const reviews = await Review.find({ lodgingId: lodging._id });

    const start = new Date(year, month - 1, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(year, month, 0);
    end.setHours(23, 59, 59, 999);
    console.log("start", start);
    console.log("end", end);

    let reservations = await Reservation.find({
      lodging: lodging._id,
      $or: [
        { checkIn: { $gte: start, $lte: end } },
        { checkOut: { $gte: start, $lte: end } },
      ],
    });

    console.log("rrr", reservations);

    reservations = reservations.map((reservation) => {
      const newReservation = reservation.toObject();
      console.log("Original checkOut value:", newReservation.checkout);
      newReservation.checkIn = new Date(newReservation.checkIn);
      newReservation.checkOut = new Date(newReservation.checkOut);
      return newReservation;
    });

    console.log("neww", reservations);

    const calendar = Array(end.getDate()).fill(
      lodging.type === "개인실" ? lodging.rooms : "*"
    );

    for (let i = 0; i < calendar.length; i++) {
      const currentDate = new Date(year, month - 1, i + 2);
      console.log("current", currentDate);
      reservations.forEach((reservation) => {
        if (
          currentDate >= reservation.checkIn &&
          currentDate < reservation.checkOut
        ) {
          if (lodging.type === "개인실") {
            calendar[i] -= reservation.guests;
          } else {
            calendar[i] = "O";
          }
        }
      });
    }

    let firstDayOfWeek = start.getDay();
    let lastDayOfWeek = end.getDay();

    let totalWeeks = Math.ceil((calendar.length + firstDayOfWeek) / 7);
   
    let calendarString = "";
   
for (let i = 0; i < 7 * totalWeeks; i++) {
  if (i < firstDayOfWeek || i >= firstDayOfWeek + calendar.length) {
    calendarString += "  ";
  } else {
    calendarString += calendar[i - firstDayOfWeek] + " ";
  }
    
  if (i % 7 === 6) {
    calendarString += "\n";
  }
}

    const result = {
      lodging,
      reviews,
      calendar: calendarString,
    };
    console.log(lodging + "\n");

    console.log(reviews.map(review => `Review: ${review.review}, Rating: ${review.rating}`));

    console.log("Calendar:\n" + calendarString);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
