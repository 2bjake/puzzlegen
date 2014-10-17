(function() {
var app = angular.module('Crypto', []);
app.controller('CryptoCtrl', ['$scope', function($scope) {

  $scope.sentence ="";
  $scope.lettersString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $scope.letters = [];
  $scope.lettersToNumbers = {};

  $scope.setLetters = function(lettersArray) {
    for(var i = 0; i < lettersArray.length; i++) {
      $scope.lettersToNumbers[lettersArray[i]] = i + 1;
      $scope.letters = lettersArray;
    }
  };

  $scope.resetLetters = function() {
    $scope.setLetters($scope.lettersString.split(""));
  };

  $scope.resetLetters(); // calling to init

  $scope.shuffleLetters = function() {
    var array = $scope.lettersString.split("");
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    $scope.setLetters(array);
  };

  $scope.clearSentence = function() {
    $scope.sentence = "";
  };

  $scope.dash = function(character) {
    if($scope.letters.indexOf(character.toUpperCase()) >= 0) {
      return "_____";
    } else {
      return character;
    }
  };

  $scope.clue = function(character) {
    var num = $scope.lettersToNumbers[character.toUpperCase()];
    if(num !== undefined) {
      return num;
    } else {
      return " ";
    }
  };

  $scope.lines = function() {
    var lineList = [];
    var curLine = "";

    var wordList = $scope.sentence.split(/\s+/);
    for(var i = 0; i < wordList.length; i++) {
      var word = wordList[i];
      if(curLine.length !== 0 && curLine.length + word.length > 12) {
        lineList.push(curLine);
        curLine = "";
      }

      if(curLine.length !== 0) {
        curLine += " ";
      }
      curLine += word;
    }

    if(curLine.length > 0) {
      lineList.push(curLine);
    }

    return lineList;
  };

}]);

})();
