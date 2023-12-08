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
//     checkIn: '2023-11-28',
//     checkOut: '2023-11-30',
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

axios.get(`http://127.0.0.1:3000/lodging/656b01f69304f859f22e0e1f`, {
  params: {
    month: "2023-11"
  }
})
.then(response => {
  const data = response.data;
  
  console.log("숙소 정보:\n",data.lodging)
  console.log(data.reviews.map(review => `Review: ${review.review}, Rating: ${review.rating}`));
  console.log(data.calendar);

})
.catch(error => {
  console.error('숙소의 상세 정보를 조회하는 중에 오류가 발생했습니다.', error);
});


