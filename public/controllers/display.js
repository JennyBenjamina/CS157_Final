wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {
  // Controller for display view
  let url = $routeParams.urlName;


  if(url){
   $http.get("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/wiki/" + $routeParams.urlName).then((result) => {
     $scope.title = result.data.title;
     $scope.category = result.data.category;
     $scope.author = result.data.author;
     $scope.published = result.data.createdDate;
     $scope.updated = result.data.updatedDate;
     $scope.pageViews = result.data.pageViews;
     $scope.html = result.data.html;
   })
  }

  $scope.edit = () => {
    window.location.assign("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/#!/post/" + url);
  }
});