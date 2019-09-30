(function () {
    var HOST_URL = '';
    var app = angular.module('opencastEngagePlayer', []);

    app.controller('OpencastEngagePlayerController', ['$scope', '$http', function ($scope, $http) {

        $scope.dateToText = function (dateString) {
            var d = new Date(dateString);
            return moment(d).format('DD.MM.YYYY');
        };

        $scope.secondsToText = function (ms) {
            var s = ms / 1000;
            var m = Math.floor(s / 60);
            s = Math.floor(s % 60);
            var h = Math.floor(m / 60);
            m = Math.floor(m % 60);

            h = ("0" + h).slice(-2);
            m = ("0" + m).slice(-2);
            s = ("0" + s).slice(-2);

            return h + ":" + m + ":" + s;
        };

        $scope.search = function () {
            $scope.q = $scope.newSearch;
            $scope.reloadPage('search.html');
        };

        $scope.reloadPage = function (url) {
            var u = url || '';
            $scope.page = 0;
            var limit = parseInt($scope.limitText) || 20;
            var page = $scope.page || 0;
            var sort = $scope.sort || "";
            window.location.href = u + '?limit=' + limit + '&page=' + page + '&q=' + $scope.searchItem + '&sort=' + sort;
        };

        $scope.main = function() {
            var search = {};
            window.location.search.slice(1).split("&").forEach(function (x) {
                var p = x.split("=");
                search[p[0]] = p[1];
            });

            if (search.id) {
                $http.get(HOST_URL + '/search/episode.json?id=' + search.id).then(function(data) {
                    var possibleResults = data.data['search-results'];
                    if (possibleResults.result) {
                        $scope.currentItem = possibleResults.result;
                    }
                });
            }
        };

        $scope.main();
    }]);

})();