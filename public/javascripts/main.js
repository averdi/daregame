$(function() {

$ajax({
  url: '/dares/api/random',
  method: 'GET'
  })
  .done(function(data) {
    console.log('A single dare: ', data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('Uh oh');
    console.log(jqXHR, textStatus, errorThrown);
  })
  .always(function() {

  });




});
