const axios = require("axios");

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/"
});


/*
    We use this function for sorting values at combobox
 */
const compare = function (a, b) {

    if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
    }
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
    }
    return 0;
};


let api = {

    getNewList: function () {
        return axiosClient.get("v1/cities")
            .then(function (response) {
                //console.log("getNewList response =");
                //console.log(response);

                // we can turn off sorting data by commenting next line
                response.data.sort(compare);
                return response;
            })
            .catch(function (error) {
                console.error("getNewList error", error);
                console.log("returning empty data");
                return {
                    data: []
                };
            });
    },

    getOldCity: function (city) {
        if (city) {
            return axiosClient.get("v1/autocomplete?q=" + city)
                .then(function (response) {
                    //console.log("getOldCity response =");
                    //console.log(response.data);
                    response.data.sort(compare);
                    return response;
                })
                .catch(function (error) {
                    // if you try to search "*", "?" it will throw error 500
                    // if you try to search "#", " " it will throw error 400
                    console.error("getOldCity error", error);
                    //window.alert ("getOldCity error:\n" + error);
                    return {
                        data: []
                    };
                });
        } else {
            // looking for empty string
            return new Promise((resolve, reject) => {
                //console.log("request for city was empty...");
                resolve();
            }).then(function () {
                //console.log("returning empty data");
                return {
                    data: []
                };
            });
        }
    }

};

module.exports = api;