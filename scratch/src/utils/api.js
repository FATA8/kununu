const axios = require('axios');

//axios.defaults.baseURL = 'http://localhost:8080/';

const compare = function(a, b) {

    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

let api = {

    getNewList: function () {
        return axios.get("http://localhost:8080/v1/cities")
            .then(function (response) {
                console.log("getNewList response =");
                console.log(response);
                //response.data.sort(compare);
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
                    console.log("response=");
                    console.log(response.data);
                    response.data.sort(compare);
                    return response;
                })
                .catch(function (error) {
                    // if you try to search "*", "?" it will throw error 500
                    // if you try to search "#", " " it will throw error 400
                    console.error(error);
                    //window.alert ("getOldCity error:\n" + error);
                    return {
                        data: []
                    };
                });
        } else {
            // looking for empty string
            return new Promise((resolve, reject) => {
                console.log("request for city was empty...");
                // dosomething...
                resolve();
            }).then(function () {
                console.log("returning empty data");
                return {
                    data: []
                };
            });
        }
    }

};

module.exports = api;