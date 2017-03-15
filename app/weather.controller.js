(function() {
        'use strict';

        angular
            .module('app')
            .controller('WeatherAppController', WeatherAppController);

        WeatherAppController.$inject = ['$http', 'toastr'];

        /* @ngInject */
        function WeatherAppController($http, toastr) {
            var vm = this;

            vm.searchCriteria = '';

            vm.searchHistory = [];

            vm.getInfo = function() {
                $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + vm.searchCriteria + "&units=imperial&appid=029f85829e6524ea874ee4b0ae46676a")
                    .then(
                        function(response) {
                            vm.info = response.data;
                            vm.d = new Date();
                            vm.searchHistory.unshift({
                                city: vm.info.name,
                                date: vm.d.toUTCString()
                            });
                        },
                        function errorCallBack(response) {
                            toastr.error("FAILED")

                    });
            vm.searchCriteria = '';
        }

        vm.btnGetInfo = function(city) {
            vm.searchCriteria = city;
            vm.getInfo();
        }


    }
})();
