wikiApp.controller("signinController", function($scope, $http) {
  // Controller for signin view
  $scope.login = () => {
    let loginInfo = {
      email: $scope.email,
      password: $scope.pass
    };

    $http.post("https://CS157-PubWiki-Final-Project.jennybenjamina.repl.co/user/signin", loginInfo).then((result) => {
      //"jwt" is where the token is stored
      //sessionstorage means if you exit the window and come back, you need to reauthenticate
      localStorage.setItem("jwt", result.data.jwt);
      window.location = "#!/";
    }).catch((err) => {
      $scope.status =  err.data;
    })
  }
});