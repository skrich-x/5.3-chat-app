(function(){
  'use strict';

  //http://tiny-lasagna-server.herokuapp.com/

  var username = '';



  $(document).ready(function(){

    route();

    $(document).on('submit', '.login-form', function(event){
      event.preventDefault();
      username = ($(this).find('.login-form-username').val());
      window.location.hash = '/chat';
    });

    $(window).on('hashchange',function(event){
      event.preventDefault();
      route();

    });
  });

  function route(){
    switch(window.location.hash){
    case'':
      $('.login').html(JST['login']());
      break;
    case '#/chat':
      renderChat();
      break;
    }
  }


function renderChat(){
  $('.application').html(JST['chat']());
    console.log('username:', username);
    $.ajax({
     url:  "http://tiny-lasagna-server.herokuapp.com/collections/messages",
  }).then(function(messages){
    $('.chat').html(JST['chat'](messages));
    console.log(messages);
  });
}
//    $.ajax({
//    url:"http://tiny-lasagna-server.herokuapp.com/collections/messages/",
//    type: "POST",
//    data: {
//      username: "kyle",
//      created_at: new Date(),
//      content: "public failure."
//    }
//
//
// });


})();
