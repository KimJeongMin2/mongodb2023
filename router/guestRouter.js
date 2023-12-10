const express = require("express");
const Reservation = require("../models/Reservation");
const Review = require("../models/Review");
const Guest = require("../models/Guest");

const guestRouter = express.Router();

guestRouter.post("/new", async (req, res) => {
  try {
    const { name } = req.body;

    const guest = new Guest({ name });

    await guest.save();
    return res.send({ guest });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

guestRouter.get("/reservation_history/:guestId", async (req, res) => {
  const { guestId } = req.params;
  const findType = req.query.type;

  try {
    const allReservations = await Reservation.find();
    // console.log('전체 예약 데이터:', allReservations);

    let filter = { memberId: guestId };

    if (findType === "oncoming") {
      console.log("[체크인 예정인 숙소 리스트]");
      filter.checkIn = { $gte: new Date() };
    } else if (findType === "terminated") {
      console.log("[체크아웃이 완료된 숙소 리스트]");
      filter.checkOut = { $lt: new Date() };
    } else {
      console.log("[전체 숙소 리스트]");
    }

    const reservations = await Reservation.find(filter)
      .populate({
        path: "lodging",
        select: ["name", "address", "type", "checkIn", "checkOut"],
      })
      .sort({ checkIn: -1 })
      .exec();

    const formattedReservations = reservations.map((reservation, index) => {
      const reviewStatus = reservation.reviewId ? "O" : "X";
      const totalPrice = reservation.totalFee;
      return {
        번호: index + 1,
        숙소명: reservation.lodging?.name,
        체크인: reservation.checkIn,
        체크아웃: reservation.checkOut,
        가격: totalPrice,
        후기: reviewStatus,
      };
    });

    res.status(200).json(formattedReservations);
    console.log(formattedReservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "예약 내역 조회에 실패했습니다." });
  }
});

guestRouter.post("/reviews/:reservationId", async (req, res) => {
  const { reservationId } = req.params;
  const { memberId, lodgingId, review, rating } = req.body;

  try {
    // 예약 테이블의 번호 확인
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "예약을 찾을 수 없습니다." });
    }

    // memberId와 lodgingId 확인
    if (
      reservation.memberId.toString() !== memberId ||
      reservation.lodging.toString() !== lodgingId
    ) {
      return res
        .status(400)
        .json({ error: "올바른 회원 또는 숙소를 선택해주세요." });
    }

    // 리뷰 등록
    const newReview = new Review({
      review,
      rating,
      lodgingId,
      memberId,
      reservationId,
    });

    const savedReview = await newReview.save();
    console.log(savedReview._id);
    // reservation 테이블의 reviewId 업데이트
    reservation.reviewId = savedReview._id;
    await reservation.save();

    // 업데이트된 예약 정보 반환
    const updatedReservation = await Reservation.findById(reservationId)
      .populate({
        path: "lodging",
        select: ["name", "address", "type", "checkIn", "checkOut"],
      })
      .exec();

    res.status(200).json(updatedReservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "리뷰 등록에 실패했습니다." });
  }
});

module.exports = guestRouter;
