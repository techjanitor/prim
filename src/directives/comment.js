// comment-handler uses a regex to parse out quotes from a post starting with >> and adds them to an array
// it then sends the generated quotes to the quotebox directive which will create a popup with the posts
angular.module('prim').directive('commentHandler', function($sce, emoticons, urls) {
    return {
        restrict: 'E',
        scope: {
            post: '=',
            thread: '='
        },
        templateUrl: "pages/comment.html",
        controllerAs: 'commentHandler',
        controller: function($scope, $filter) {
            // array for quote ids
            var quotes = [];
            // regex for quotes
            var re = />>(\d{1,5})/g;
            // the comment from json reply
            var raw = $scope.post.comment;
            // hold our matches
            var m;

            // loop through regex matches
            while ((m = re.exec(raw)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                // push match to quotes array
                quotes.push(m[1]);
            }

            // trim the comment, remove the quotes, and remove multiple newlines
            var comment = raw.replace(re, '').replace(/(\n){3,}/g, '\n\n').trim();

            // add emoticons
            var comment = emoticons.injectTags(comment);
            // add links
            var comment = urls.createLinks(comment);

            // set scope
            $scope.post.comment = $sce.trustAsHtml(comment);
            // this is all the collected quote ids
            $scope.post.quote_id = quotes;
        }

    };

});
