const axios = require("axios");

// axios.post('http://127.0.0.1:3000/lodging/generate')
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });


axios.get('http://127.0.0.1:3000/lodging/search', {
  params: {
    checkIn: '2023-11-28',
    checkOut: '2023-11-30',
    guests: 8,
    lodgingType: '전체 공간'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

// axios.get(`http://127.0.0.1:3000/lodging/656b01f69304f859f22e0e1f`, {
//   params: {
//     month: "2023-11"
//   }
// })
// .then(response => {
//   const data = response.data;
  
//   console.log("숙소 정보:\n",data.lodging)
//   console.log(data.reviews.map(review => `Review: ${review.review}, Rating: ${review.rating}`));
//   console.log(data.calendar);

// })
// .catch(error => {
//   console.error('숙소의 상세 정보를 조회하는 중에 오류가 발생했습니다.', error);
// });

// axios.get(`http://127.0.0.1:3000/guest/reservation_history/6572d5d63a2a5715f4c63e21?type=all`)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// axios.post(`http://127.0.0.1:3000/guest/reviews/656c35f01aace6ecfa2d180a`, {
//     memberId: '6572d5d63a2a5715f4c63e21',
//     lodgingId: '6569edea7361c55f093fe59c',
//     review: '되나?',
//     rating: 5
//   })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
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

// let bookHouse = async (
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

// const cancelReservation = async (reserveId) => {
//   axios
//     .delete("http://127.0.0.1:3000/reservation/delete", {})
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// 게스트 추가
// createGuest("테스트2");

// 숙소 예약(checkIn, checkOut, guests, lodgingId, guestId)
// bookHouse(
//   "2023-12-10",
//   "2023-12-13",
//   1,
//   "6571a436852753fc58624953",
//   "65747f784eb9bff7214ab153"
// );

// 예약 취소
// cancelReservation("657473d90eb9ad78580d468a");