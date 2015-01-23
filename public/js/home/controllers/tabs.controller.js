/*jslint */
/*global angular*/

(function () {
    "use strict";

    angular
        .module('rehearsalApp')
        .controller('TabsController', [function () {
            var self = this;

            self.tab = 0;

            self.changeTab = function (tabNumber) {
                self.tab = tabNumber;
            };

            self.isSelected = function (tabNumber) {
                return self.tab === tabNumber;
            };
        }]);
}());
