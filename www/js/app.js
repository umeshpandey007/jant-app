// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function IIFE(window) {

  var jantApp;

  jantApp = angular.module('jantApp', ['ionic']);

  jantApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('topics',{
        url: '/topics',
        templateUrl: 'partials/topics.html',
        //controller: 'TopicCtrl'
      })
      .state('notes',{
        url: '/notes',
        templateUrl: 'partials/notes.html',
        //controller: 'NoteCtrl'
      })
      .state('edit',{
        url:'/edit',
        templateUrl: 'partials/edit.html',
        //controller: 'EditCtrl'
      });

    $urlRouterProvider.otherwise('/topics');
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
