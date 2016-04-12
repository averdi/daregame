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




});
