
var DavFilm = window.DavFilm || {};

(function rideScopeWrapper($) {
    var authToken;
    DavFilm.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function doARequestPlease(mydata) {
      // TODO faire ma requette post
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/films',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PutSomeDataHere: {
                    Data1: mydata.data1,
                    Data2: mydata.data2
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
      //TODO quoi faire aprés mon appel API
        console.log('Response received from API: ', result);
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#serviceForm').submit(handleRequestClick);

        $('#signOut').click(function() {
            DavFilm.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });

        DavFilm.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });


    function handleRequestClick(event) {
      //TODO get you data from dom and send to your request
        var myData = '';
        event.preventDefault();
        doARequestPlease(myData);
    }


    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
