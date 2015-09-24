/**
 * Created by Umesh on 9/13/2015.
 */
(function IIFEForNotesManager(window) {

  var notesManagerMod = angular.module('notesManagerMod',[]);
  window.notesManagerMod = notesManagerMod;

  notesManagerMod.factory('noteManager',function(){
    var topics= (angular.fromJson(window.localStorage['topics'])) || [];

    var persistInLocalStorage = function() {
      window.localStorage['topics'] = angular.toJson(topics);
    };
    
    return {
      persistInLocalStorageFn: function(){
        persistInLocalStorage();
      },
      getListofTopics: function(){
        return topics;
      },
      createNewTopic: function(topic){
        if(topic.title != undefined || topic.description != undefined) {
          //Append topicId to new topic
          topic.topicId = Date.now();
          topic.notes = [];
          topics.push(topic);
          persistInLocalStorage();
        }
      },
      updateTopic: function(topicId,topic){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            topics[i] = topic;
            persistInLocalStorage();
            return;
          }
        }
        topics[i] = undefined;
      },
      deleteTopic: function(topicId){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            topics.splice(i,1);
          }
        }
        persistInLocalStorage();
      },
      getTopic: function(topicId){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            return topics[i];
          }
        }
        return undefined;
      },
      getListofNotes: function(topicId){

        var topic = {};
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            topic = topics[i];
          }
        }
        return topic.notes;
      },
      createNewNote: function(topicId,note){
        for(var i=0;i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            if(note.title != undefined || note.description != undefined) {
              note.noteId = Date.now();
              topics[i].notes.push(note);
              persistInLocalStorage();
            }
          }
        }
      },
      updateNote: function(topicId,noteId,note){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            for(var j=0;j<topics[i].notes.length;j++)
            {
              if(noteId == topics[i].notes[j].noteId)
              {
                topics[i].notes[j] = note;
                persistInLocalStorage();
                return;
              }
            }
          }
        }
        topics[i].notes[j] = undefined;
      },
      deleteNote: function(topicId,noteId){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            for(var j=0;j<topics[i].notes.length;j++)
            {
              if(noteId == topics[i].notes[j].noteId)
              {
                topics[i].notes.splice(j,1);
              }
            }
          }
        }
        persistInLocalStorage();
      },
      getNote: function(topicId,noteId){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            for(var j=0;j<topics[i].notes.length;j++)
            {
              if(noteId == topics[i].notes[j].noteId)
              {
                return topics[i].notes[j];
              }
            }
          }
        }
        return undefined;
      }


    };

  });
})(window);
