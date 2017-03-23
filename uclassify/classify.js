$(function() {
    //$("#submitImage input").jqBootstrapValidation({
    $("#submitImage input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            //var minim = $("#payload").html($('#payload').val());
            var minim = $("#payload").val();
            var payLoad = '"' + minim + '"';
            //$("#success").append(payLoad);
            //Initialize Params
            var params = {

                'subscription-key': '0af900bd04f94a789f32631be3ed645f',

                // visualFeatures: "All",
                maxCandidates: "1",
            };

            $.ajax({
                url: 'https://api.projectoxford.ai/vision/v1.0/describe?' + $.param(params),
                type: "POST",
                contentType: 'application/json',
                data: '{ "Url": ' + payLoad + ' }', //Push payload  to API
                cache: false,
                success: function(response) {
                    

                    //Now we do stuff

                    console.log(response.description.captions)
                    console.log(response.description.tags)
                    var jsondata = response;
                    $.each(jsondata.description.captions, function(i, d) {
                        var row = '<tr>';
                        $.each(d, function(j, e) {
                            row += '<td>' + e + '</td>';
                        });
                        row += '</tr>';
                        $('#mytable tbody').append(row);
                            
                            $('<img />')
                            .attr('src' ,minim)
                            .load(function(){
                                $('article').append($(this));
                            });
                           
                        //alert('Looking Good');
                        $("#success").append("Data received.Looks good!")

                    });
                    //End of stuff doing

                    //clear all fields
                   // $('#cvAjax').trigger("reset");
                },
                error: function() {
                    // Fail message
                  // alert('Yikes');
                  $("#success").append("Ooops!Something is not Right!");
                },
            })
        },
        
    });





    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#focus').focus(function() {
    $('#success').html('');
});