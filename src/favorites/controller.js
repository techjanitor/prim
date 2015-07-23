angular.module('prim').controller('FavoritesCtrl', function($scope, $routeParams, $location, hotkeys, FavoritesHandler, Utils) {

    // using controllerAs
    var self = this;

    // get the thumb address
    self.thumb = Utils.getThumbSrc;

    // if there is no page number go to page 1
    if (!$routeParams.page) {
        $routeParams.page = 1;
    }

    // Get tag page json
    FavoritesHandler.get({
        page: $routeParams.page
    }, function(data) {
        self.data = data.favorites.items;
        // Pagination items from json
        self.pagination = {
            totalItems: data.favorites.total,
            currentPage: data.favorites.current_page,
            numPages: data.favorites.pages,
            itemsPerPage: data.favorites.per_page,
            maxSize: 3
        };
    }, function(error) {
        Utils.apiError(error.status);
    });

    hotkeys.bindTo($scope)
        .add({
            combo: 'shift+left',
            description: 'Previous Page',
            callback: function() {
                if (self.pagination.currentPage > 1) {
                    var page = self.pagination.currentPage - 1;
                    $location.path('/favorites/' + page);
                }
            }
        })
        .add({
            combo: 'shift+right',
            description: 'Next Page',
            callback: function() {
                if (self.pagination.currentPage < self.pagination.numPages) {
                    var page = self.pagination.currentPage + 1;
                    $location.path('/favorites/' + page);
                }
            }
        });

});