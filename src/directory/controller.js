angular.module('prim').controller('DirectoryCtrl', function(Handlers, Utils) {

    // using controllerAs
    var self = this;

    // Get the directory json from pram
    Handlers.directory.get(function(data) {
        self.data = data.directory;
    }, function(error) {
        Utils.apiError(error.status);
    });

    // set default column and order for table sorting
    self.sort = {
        column: 'last_post',
        desc: true
    };

    // reverse the sorting or change the column
    self.changeSorting = function(column) {
        var sort = self.sort;
        if (angular.equals(sort.column, column)) {
            sort.desc = !sort.desc;
        } else {
            sort.column = column;
            sort.desc = false;
        }
    };

});
