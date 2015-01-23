/*jslint */
/*global angular */

(function () {
    "use strict";

    angular
        .module('rehearsalApp')
        .controller('StudiosController', ['$http', function ($http) {
            var self = this;

            self.studios = [];

            $http.get('/api/studios')
                .success(function (data) {
                    self.studios = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

            self.newStudio = {};

            self.addNewStudio = function () {
                $http.post('/api/studios', self.newStudio)
                    .success(function (data) {
                        self.studios = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
                self.newStudio = {};
            };

            self.deleteStudio = function (id) {
                $http.delete('/api/studios/' + id)
                    .success(function (data) {
                        self.studios = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };
        }]);
}());
