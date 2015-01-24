/*jslint */
/*global angular*/

(function () {
    "use strict";

    angular
        .module('rehearsalApp')
        .directive('header', function () {
            return {
                restrict: 'A',
                templateUrl: './js/common/directives/header.template.html',
                controller: 'HeaderController',
                controllerAs: 'header'
            };
        });
}());