(function(){
  'use strict';

  var username = localStorage.getItem('username');


  $(document).ready(function(){

    routeUser();

    $(document).on('submit', '.login-form', function(event) {
      event.preventDefault();
      username = $(this).find('.login-form-username').val();
      localStorage.setItem('username', username);
      window.location.hash = '/chat';
    });

    $(document).on('submit', '.message-form', function(event) {
      var messageText;

      event.preventDefault();
      messageText = $(this).find('.message-form-textarea').val();
      addMessage(messageText);
    });

    $(window).on('hashchange', function(event) {
        routeUser();
    });

  });

  function routeUser() {
    switch(window.location.hash) {
      case '':
        renderLogin();
        break;
      case '#/chat':
        renderChat();
        break;
    }
  }

  function renderLogin() {
    $('.application').html(JST['login']());
  }


  function displayChats(data){
    $('.application').html(JST['chat'](data));
    console.log(data);

  }

  function renderChat(data){
    $('.application').html(JST['chat']());
    console.log('username:', username);
    var fetchedData = fetchMessages(data);
    console.log(fetchedData);
    displayChats(fetchedData);

    $.ajax({
   url:"http://tiny-lasagna-server.herokuapp.com/collections/messages/",
   type: "POST",
   data: {
     username: "kyle",
     created_at: new Date(),
     content: ""
    }
  }
)};
  // $(document).on('submit', '.type-message', function(event){
  //     event.preventDefault();
    //   $.ajax({
    //      url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/",
    //      type: 'POST',
    //      username: "kyle",
    //      created_at: new Date(),
    //    });
    //  });

  function fetchMessages(data) {
    console.log("fetch");
    var dataToBeReturned;
    $.ajax({
      url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/"
    }).then(displayChats);

  }
})();
