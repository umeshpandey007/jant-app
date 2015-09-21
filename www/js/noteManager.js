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
    topic1.notes = [];
    var note1 = {};
    note1.noteId = Date.now();
    note1.title="Note1";
    note1.description = "This is text of Note1";
    topic1.notes.push(note1);
    var note2 = {};
    note2.noteId = Date.now()+1;
    note2.title="Note2";
    note2.description = "This is text of Note2";
    topic1.notes.push(note2);
    topics.push(topic1);

    return {
      getListofTopics: function(){
        return topics;
      },
      createNewTopic: function(topic){
        if(topic.title != undefined || topic.description != undefined) {
          //Append topicId to new topic
          topic.topicId = Date.now();
          topic.notes = [];
          topics.push(topic);
        }
      },
      updateTopic: function(topicId,topic){
        for(var i=0; i<topics.length;i++)
        {
          if(topicId == topics[i].topicId)
          {
            topics[i] = topic;
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
