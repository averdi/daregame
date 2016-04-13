$(function() {

  var changeDare = function(category){
    $.ajax({
      url: '/dares/api/random?category=' + category,
      method: 'GET'
      })
      .done(function(dare) {

        $('#category span').text(dare.category);
        $('#description span').text(dare.description);
        $('#hashtag span').text(dare.hashtag);

      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('Uh oh');
        console.log(jqXHR, textStatus, errorThrown);
      })
      .always(function() {

      });
  };

  $('#chicken-out').click(function(event) {
    event.preventDefault();
    var category = $(this).prev().val();
    changeDare(category);
  });

  // navbar javascript:

   $('.navbar-toggler').on('click', function(event) {
    event.preventDefault();
    $(this).closest('.navbar-minimal').toggleClass('open');
  })


//button

    var removeSuccess;
    removeSuccess = function () {
        return $('.button').removeClass('success');
    };
    $(document).ready(function () {
        return $('.button').click(function () {
            $(this).addClass('success');
            return setTimeout(removeSuccess, 3000);
        });
   }.call(this));


});
