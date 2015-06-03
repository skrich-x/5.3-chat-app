(function(){
  'use strict';

  $(document).ready(function(){
    $('.login-form').on('submit', function(event){
      event.prevetDefault();
      window.location.hash = '/chat';
    });

    $(window).on('hashchange',function(event){
      event.preventDefault();
      console.log(sindow.location.hash);

    });
  });
})();
