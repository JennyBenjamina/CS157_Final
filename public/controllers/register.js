wikiApp.controller("registerController", function($scope, $http) {
  // Controller for registration view
  $scope.signUp = () => {
    if($scope.password == $scope.password2){
      $http.post("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/user/register", {
        fullName: $scope.fullName,
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      }).then((result) => {
        console.log(result);
        alert($scope.username + " has been created.");
        window.location.assign("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/#!/");
      }).catch(err => console.log(err));
    }else{
      $scope.errorbox = "Passwords must match!";
    }
  }

});