SudokuApp.controller('NavCtrl', ['$scope', '$http', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$mdDialog', 'UserService', 'Game', 'User', '$location', '$mdToast', function ($scope, $http, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, UserService, Game, User, $location, $mdToast) {

  console.log('NavCtrl')

  $scope.currentUser = null;

$scope.UserService = UserService;
$scope.$watchCollection('UserService', function(){
  $scope.currentUser = UserService.currentUser;

  console.log('inside',$scope.currentUser)
});
//Get Math Fact
$http.get('/api/numbers').success(function(data){
    console.log(data.text)
    $scope.mathFacts = data
  })

//Games
Game.query().then(function(games){
    $scope.games = games;
  });

//Set Current Board
$scope.selectGame = function(board){
  $scope.selectedBoard = board
  console.log('selected',$scope.selectedBoard)
  // console.log('type',typeof($scope.selectedBoard.playersboard))
}

//Empty Current Board
$scope.empty = function(){
  $scope.selectedBoard = [];
}

//Delete Game
$scope.deleteGame = function(game){
  game.$delete();
}

//New Game Modal
$scope.newGame= function(){
  $scope.empty();
  $mdDialog.show({
    templateUrl:'views/newGameModal.html',
    clickOutsideToClose: true,
    controller: 'GameCtrl'
  })
}

//Build Toggle
function buildToggler(navID) {
  var debounceFn =  $mdUtil.debounce(function(){
    $mdSidenav(navID)
    .toggle()
    .then(function () {
      $log.debug("toggle " + navID + " is done");
    });
  },200);
  return debounceFn;
}

//Hide Show Menu
$scope.toggleLeft = buildToggler('left');

// Logout
$scope.logout = function(){
  $scope.empty();
  UserService.logout(function(err,data){
  });
  $location.path('/');
  $mdToast.show($mdToast.simple().content('Bye!'));
}

//Add Game Toast
$scope.addGame =function(){
  $mdToast.show($mdToast.simple().content('New Game'));
}

// Menu Toast
$scope.showMenu =function(){
  $mdToast.show($mdToast.simple().content('List Games'));
}

//Show Logout Toast
$scope.toastLogout =function(){
  $mdToast.show($mdToast.simple().content('Logout'));
}


}]);