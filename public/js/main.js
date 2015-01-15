(function () {
    var studiosApp = angular.module('studiosApp', []);

    studiosApp.controller('StudiosController', function($http) {
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

        self.deleteStudio = function(id) {
            $http.delete('/api/studios/' + id)
                .success(function (data) {
                    self.studios = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
    });

    studiosApp.controller('TabsController', function () {
        var self = this;

        self.tab = 0;

        self.changeTab = function (tabNumber) {
            self.tab = tabNumber;
        };

        self.isSelected = function (tabNumber) {
            return self.tab === tabNumber;
        };
    });
})();