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
        url: '/notes/:topicId',
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
    })
    .state('editNote',{
      url:'/editNote/:topicId/:noteId',
      templateUrl: 'partials/edit_note.html',
      controller: 'EditNoteCtrl'
    })
    .state('addNote',{
      url:'/addNote/:topicId',
      templateUrl: 'partials/edit_note.html',
      controller: 'EditNoteCtrl'
    });

    $urlRouterProvider.otherwise('/topics');
  }]);

  jantApp.controller('TopicCtrl',['$scope','$state','$ionicListDelegate','noteManager',
    function($scope,$state,$ionicListDelegate,noteManager){
    $scope.shouldShowReorder=false;
    $scope.topicsList = noteManager.getListofTopics();
    $scope.NewTopic = function() {
      $state.go('addTopic');
    };
    $scope.EditTopic = function(topicId) {
      var params = {topicId:topicId};
      $state.go('editTopic',params);
      $ionicListDelegate.closeOptionButtons();
    };

    $scope.DelTopic = function(topicId) {
      noteManager.deleteTopic(topicId);
    };

  }]);

  jantApp.controller('EditTopicCtrl',['$scope','$state','$stateParams','$ionicHistory','noteManager',
    function($scope,$state,$stateParams,$ionicHistory,noteManager){

      if($stateParams.topicId === undefined) {
        $scope.topicName = "New Topic";
        $scope.topic = {};
      } else {
        $scope.topic = noteManager.getTopic($stateParams.topicId);
        $scope.topicName = $scope.topic.title;
      }
      $scope.SaveTopic = function() {
        //Save $scope.topic in NoteManager topic
        if($scope.topic.topicId === undefined) {
          noteManager.createNewTopic($scope.topic);
        } else {
          noteManager.updateTopic($scope.topic.topicId,$scope.topic);
        }
        $state.go('topics');
      };

      $scope.GoBack = function() {
        $ionicHistory.goBack();
      };

  }]);

  jantApp.controller('NoteCtrl',['$scope','$state','$stateParams','$ionicHistory','noteManager',
    function($scope,$state,$stateParams,$ionicHistory,noteManager){
    $scope.shouldShowReorder=false;
    $scope.topic = noteManager.getTopic($stateParams.topicId);
    $scope.topicName = $scope.topic.title;
    $scope.notesList = noteManager.getListofNotes($scope.topic.topicId);
    $scope.NewNote = function() {
      var params = {
        topicId:$stateParams.topicId
      };
      $state.go('addNote',params);
    };

    $scope.GoBack = function() {
      $ionicHistory.goBack();
    };

    $scope.DelNote = function(topicId,noteId) {
      noteManager.deleteNote(topicId,noteId);
    };

  }]);

  jantApp.controller('EditNoteCtrl',['$scope','$state','$stateParams','$ionicHistory','noteManager',

    function($scope,$state,$stateParams,$ionicHistory,noteManager) {

      if($stateParams.noteId === undefined) {
        $scope.noteName = "New Note";
        $scope.note = {};
      } else {
        $scope.note = noteManager.getNote($stateParams.topicId,$stateParams.noteId);
        $scope.noteName = $scope.note.title;
      }
      $scope.SaveNote = function() {
        var topic = noteManager.getTopic($stateParams.topicId);
        if($scope.note.noteId === undefined) {
          noteManager.createNewNote(topic.topicId,$scope.note);
        } else {
          noteManager.updateNote(topic.topicId,$stateParams.noteId,$scope.note);
        }
        var params = {
          topicId:topic.topicId
        };
        $state.go('notes',params);
      };

      $scope.GoBack = function() {
        $ionicHistory.goBack();
      };

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
