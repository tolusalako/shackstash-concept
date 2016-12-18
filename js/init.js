$(document).ready(function() {
    //Init
    $('.modal').modal();
    $('select').material_select();
  //   $('#main-nav').pushpin({
  //    top: 0,
  //    offset: 0
  //  });
  
    // Focus
    $('#find-housing').click(function () {
        $(this).addClass("hide");
        $("#search-form").removeClass("hide");
        setTimeout(function(){
            $('#search').focus();
        }, 50);
    });

    // Focus out
    $('#search').focusout(function () {
        $("#search-form").addClass("hide");
        $("#find-housing").removeClass("hide");
    });


    $("#nav-messages").click(function (event) {
        // If !auth open login modal
        if (!authenticated){
            event.preventDefault();
            $("#modal-login").modal('open');
        }
    });


    $("#facebook-login").click(function () {
        FB.getLoginStatus(function(response) {
            if (response.status != 'connected')
                FB.login(function (response) {
                    statusChangeCallback(response);
                });
            else {
                $("#modal-login").modal('close');
            }
        }, true);
    });

    //FB
    $.ajaxSetup({ cache: true });
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '409192906135596',
      version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    });
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
    FB.Event.subscribe('auth.login', function(response) {
        statusChangeCallback(response);
      });
    });
  });

  function statusChangeCallback(response) {
   // The response object is returned with a status field that lets the
   // app know the current login status of the person.
   // Full docs on the response object can be found in the documentation
   // for FB.getLoginStatus().
   if (response.status === 'connected') {
     // Logged into your app and Facebook.
     Materialize.toast('Login Successful!', 4000);
     var auth_response = response['authResponse'];
     FB.api('/me', {fields: 'last_name, first_name, picture'}, function(response) {
         csrf = $('#input-csrf');
         response['token'] = auth_response['accessToken'];
         response['exp'] = auth_response['expiresIn'];
         console.log(response);
         $.ajax({
       		type : "POST",
            headers: {
                  'X-CSRF-TOKEN':csrf.val(),
              },
       		contentType : "application/x-www-form-urlencoded",
       		url : "login/fb",
       		data : JSON.stringify(response),
       		dataType : 'json',
       		timeout : 100000,
       		success : function(data) {
       			console.log("SUCCESS: ", data);
       		},
       		error : function(e) {
       			console.log("ERROR: ", e.responseText);
       		},
       		done : function(e) {
       			console.log("DONE");
       		}
       	});
    });
   } else if (response.status === 'not_authorized') {
     // The person is logged into Facebook, but not your app.
     Materialize.toast('Please login!', 4000)
   } else {
     // The person is not logged into Facebook, so we're not sure if
     // they are logged into this app or not.
     Materialize.toast('Login to facebook!', 4000);
   }
 }



  function updateStatusCallback(){
      console.log("yea!");
  }
