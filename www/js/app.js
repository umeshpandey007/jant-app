// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function IIFEForController(window) {

  var jantApp = angular.module('jantApp', ['ionic','notesManagerMod']);

  jantApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('topics',{
        url: '/topics',
        templateUrl: 'partials/topics.html',
        controller: 'TopicCtrl'
      })
      .state('notes',{
        url: '/notes',
        templateUrl: 'partials/notes.html',
        controller: 'NoteCtrl'
      })
      .state('editTopic',{
        url:'/editTopic/:topicId',
        templateUrl: 'partials/edit_topic.html',
        controller: 'EditTopicCtrl'
      })
      .state('addTopic',{
      url:'/addTopic',
      templateUrl: 'partials/edit_topic.html',
      controller: 'EditTopicCtrl'
    });

    $urlRouterProvider.otherwise('/topics');
  }]);

  jantApp.controller('TopicCtrl',['$scope','$state','noteManager',function($scope,$state,noteManager){
    $scope.shouldShowDelete=false;
    $scope.shouldShowReorder=false;
    $scope.topicsList = noteManager.getListofTopics();
    $scope.NewTopic = function() {
      $state.go('addTopic');
    }

  }]);

  jantApp.controller('NoteCtrl',['$scope',function($scope){
    $scope.shouldShowDelete=false;
    $scope.shouldShowReorder=false;

  }]);

  jantApp.controller('EditTopicCtrl',['$scope','$state','$stateParams','noteManager',
    function($scope,$state,$stateParams,noteManager){

      if($stateParams.topicId === undefined) {
        $scope.topicName = "New Topic";
        $scope.topic = {};
      } else {
        $scope.topic = noteManager.getTopic($stateParams.topicId);
        $scope.topicName = $scope.topic.title;
      }
      $scope.SaveTopic = function() {
      //Save $scope.topic in NoteManager topic
      if($stateParams.topicId === undefined) {
        noteManager.createNewTopic($scope.topic);
      } else {
        noteManager.updateTopic($stateParams.topicId,$scope.topic);
      }
      $state.go('topics');
    }
  }]);


  jantApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
})(window);
