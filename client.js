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
