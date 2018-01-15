const axios = require('axios');

//axios.defaults.baseURL = 'http://localhost:8080/';


let api = {

    getNewList: function () {
        return axios.get('http://localhost:8080/v1/cities')
            .then(function (response) {
                console.log("getNewList response =");
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });


    },

    getOldCity: function (city) {
        if (city) {
            return axios.get('http://localhost:8080/v1/autocomplete?q=' + city)
                .then(function (response) {
                    //console.log("getOldCity response =");
                    //console.log(response);
                    return response;
                })
                .catch(function (error) {
                    console.error(error);
                    alert (error);
                });
        } else {
            console.log("request for city was empty");
            return new Promise(function () {
                return;
            });
        }
    }

};


module.exports = api;