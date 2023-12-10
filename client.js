const axios = require("axios");

// axios.post('http://127.0.0.1:3000/lodging/generate')
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// axios.get('http://127.0.0.1:3000/lodging/search', {
//   params: {
//     checkIn: '2023-12-01',
//     checkOut: '2023-12-02',
//     guests: 2,
//     lodgingType: '개인실'
//   }
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error);
// });

// axios
//   .get(`http://127.0.0.1:3000/lodging/656b01f69304f859f22e0e1f`, {
//     params: {
//       month: "2023-11",
//     },
//   })
//   .then((response) => {
//     const data = response.data;

//     console.log("숙소 정보:\n", data.lodging);
//     console.log(
//       data.reviews.map(
//         (review) => `Review: ${review.review}, Rating: ${review.rating}`
//       )
//     );
//     console.log(data.calendar);
//   })
//   .catch((error) => {
//     console.error(
//       "숙소의 상세 정보를 조회하는 중에 오류가 발생했습니다.",
//       error
//     );
//   });

// axios
//   .get(`http://127.0.0.1:3000/guest/reservation_history/${guestId}?type=all`)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// axios
//   .post(`http://127.0.0.1:3000/guest/reviews/${reservationId}`, {
//     memberId: "6572c6b77abb3af236b8148d",
//     lodgingId: "6572c4f2bf3ef10ad248b4f8",
//     review: "되나?",
//     rating: 5,
//   })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const createGuest = async (name) => {
//   axios
//     .post("http://127.0.0.1:3000/guest/new", {
//       name: name,
//     })
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// const bookHouse = async (
//   checkInDate,
//   checkOutDate,
//   personnel,
//   lodgingId,
//   guestId
// ) => {
//   axios
//     .post("http://127.0.0.1:3000/reservation/new", {
//       checkIn: checkInDate,
//       checkOut: checkOutDate,
//       guests: personnel,
//       lodging: lodgingId,
//       guest: guestId,
//     })
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

const bookHouse = async (
  checkInDate,
  checkOutDate,
  personnel,
  lodgingId,
  guestId
) => {
  axios
    .post("http://127.0.0.1:3000/reservation/new", {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: personnel,
      lodging: lodgingId,
      guest: guestId,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const cancelReservation = async (reserveId) => {
  axios
    .delete(`http://127.0.0.1:3000/reservation/delete/${reserveId}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// 게스트 추가
// createGuest("테스트2");

// 숙소 예약(checkIn, checkOut, guests, lodgingId, guestId)
// bookHouse(
//   "2023-12-10",
//   "2023-12-13",
//   1,
//   "6575823de85bd08a6e59bb8f",
//   "6572d5d63a2a5715f4c63e21"
// );

// 예약 취소
cancelReservation("6575b37aaae9ba04e3d9aa71");
