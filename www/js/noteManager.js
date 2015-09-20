/**
 * Created by Umesh on 9/13/2015.
 */
(function IIFEForNotesManager(window) {

  var notesManagerMod = angular.module('notesManagerMod',[]);
  window.notesManagerMod = notesManagerMod;

  notesManagerMod.factory('noteManager',function(){
    var topics=[];

    //sample topic
    var topic1 = {};
    topic1.topicId = Date.now();
    topic1.title="Home";
    topic1.description = "This is a sample Home category";
    topics.push(topic1);

    return {
      getListofTopics: function(){
        return topics;
      },
      createNewTopic: function(topic){
        if(topic.title != undefined || topic.description != undefined) {
          //Append topicId to new topic
          topic.topicId = Date.now();
          topics.push(topic);
        }
      },
      updateTopic: function(topicId,topic){
        for(var i=0; i<topics.length();i++)
        {
          if(topicId == topics[i].topicId)
          {
            topics[i] = topic;
          }
        }
        topics[i] = undefined;
      },
      deleteTopic: function(topicId){
        for(var i=0; i<topics.length();i++)
        {
          if(topicId == topics[i].topicId)
          {
            topics.splice(i,1);
          }
        }
      },
      getTopic: function(topicId){
        for(var i=0; i<topics.length();i++)
        {
          if(topicId == topics[i].topicId)
          {
            return topics[i];
          }
        }
        return undefined;
      },
      createNewNote: function(topicId,note){
        for(var i=0;i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            topics[i].notes.push(note);
          }
        }
      },
      deleteNote: function(topicId,noteId){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            for(var j=0;j<topics[i].notes.length;j++)
            {
              if(notedId == topics[i].notes[j].noteId)
              {
                topics[i].notes.splice(j,1);
              }
            }
          }
        }
      },
      getNote: function(topicId,noteId){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            for(var j=0;j<topics[i].notes.length;j++)
            {
              if(notedId == topics[i].notes[j].noteId)
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
