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



// Render as json object and you can easily extract media id from it
   // METHOD 2
   // $.ajax({
   //     type: 'GET',
   //     url: 'http://api.instagram.com/oembed?callback=&url=http://instagram.com/p/Y7GF-5vftL‌​/',
   //     cache: false,
   //     dataType: 'jsonp',
   //     success: function(data) {
   //         try{
   //             var media_id = data[0].media_id;
   //         }catch(err){}
   //     }
   // });
   //
   //
   // $.ajax({ type: 'GET', url: 'http://api.instagram.com/oembed?callback=&url=http://instagram.com/p/Y7GF-5vftL‌​/', cache: false, dataType: 'jsonp', success: function(data) { try{ var media_id = data[0].media_id; }catch(e){ } } });
   // METHOD 1
   // $.ajax({
   //     type: 'GET',
   //     url: 'http://api.instagram.com/oembed?callback=&url='+Url, //You must define 'Url' for yourself
   //     cache: false,
   //     dataType: 'json',
   //     jsonp: false,
   //     success: function (data) {
   //         try {
   //             var MediaID = data.media_id;
   //         } catch (err) {
   //             console.log(err);
   //         }
   //    }
   // });


});
