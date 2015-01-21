(function () {
    var authenticationApp = angular.module('authenticationApp', []);

    authenticationApp.controller('AuthenticationController', function ($http) {

        var self = this;

        self.signupMessage = null;
        self.signinMessage = null;

        $http.get('/api/messages')
            .success(function (data) {

                if (data.signinMessage) {
                    self.signinMessage = data.signinMessage[0];
                }

                if (data.signupMessage) {
                    self.signupMessage = data.signupMessage[0];
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    });
})();
