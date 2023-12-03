const axios = require("axios");

axios.post('http://127.0.0.1:3000/test', {
    name: 'test name',
    description: 'test description'
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});

axios.get('http://127.0.0.1:3000/lodging/search', {
  params: {
    checkIn: '2023-11-28',
    checkOut: '2023-11-30',
    guests: 2,
    lodgingType: '개인실'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

axios.get(`http://127.0.0.1:3000/lodging/${id}`, {
  params: {
    month: month
  }
})
.then(response => {
  const data = response.data;

  console.log('숙소 기본 정보:', data.lodging);
  console.log('모든 별점과 리뷰:', data.reviews);
  console.log('예약 현황(달력 형태):', data.calendar.join(' '));
  if (data.availableRooms !== undefined) {
    console.log('예약 가능한 방의 개수:', data.availableRooms);
  }
})
.catch(error => {
  console.error('숙소의 상세 정보를 조회하는 중에 오류가 발생했습니다.', error);
});


