(function () {
    var studiosApp = angular.module('studiosApp', []);

    studiosApp.controller('StudiosController', function($http) {
        var self = this;

        $http.get('/api/studios')
            .success(function (data) {
                self.studios = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    });

    studiosApp.controller('TabsController', function () {
        this.tab = 0;

        this.changeTab = function (tabNumber) {
            this.tab = tabNumber;
        };

        this.isSelected = function (tabNumber) {
            return this.tab === tabNumber;
        };
    });
})();