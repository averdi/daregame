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




   var daresArray = [],
      "_id":"570fa8dd52d1164c253a6d30",
      "instagramID":null,
      "__v":0,
      "dares":""["57081e73e4b050965a5845aa","570824a4e4b050965a584630","57081f17e4b050965a5845ba","57081f17e4b050965a5845ba","57081f17e4b050965a5845ba","57081f17e4b050965a5845ba","57081f17e4b050965a5845ba","57081f17e4b050965a5845ba","57081ddee4b050965a584598"]
   }}



//js to populate table
   var headertext = [],
   headers = document.querySelectorAll("#"),
   tablerows = document.querySelectorAll("#"),
   tablebody = document.querySelector("#");

   for(var i = 0; i < headers.length; i++) {
     var current = headers[i];
     headertext.push(current.textContent.replace(/\r?\n|\r/,""));
   }
   for (var i = 0, row; row = tablebody.rows[i]; i++) {
     for (var j = 0, col; col = row.cells[j]; j++) {
       col.setAttribute("data-th", headertext[j]);
     }
   }



});
