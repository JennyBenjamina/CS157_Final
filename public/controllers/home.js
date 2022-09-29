wikiApp.controller("homeController", function($scope, $http) {
  // Controller for home view

  $scope.search = () => {
    $http.get("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/wiki/search/" + $scope.searchWords)
    .then((result) => {
      $scope.title = result.data[0].title;
      $scope.author = result.data[0].author;
      $scope.category = result.data[0].category;
      $scope.updated = result.data[0].updatedDate;
      $scope.pageViews = result.data[0].pageViews;
      $scope.searchWords = "";
      $scope.urlName = result.data[0].urlName;
    })
    .catch((err) => {
      $scope.title = "";
      $scope.author = "";
      $scope.category = "";
      $scope.updated = "";
      $scope.pageViews = "";
      $scope.searchWords = "";
      $scope.urlName = "";
      console.log(err.data);
    })
  }

  $scope.view = () => {
    if($scope.title){
      window.location.assign("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/#!/" + $scope.urlName);
    }
  }
});