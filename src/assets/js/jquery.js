$(document).ready(function() {
    $('#myTab a').on('click', function(e) {
        e.preventDefault()
        $(this).tab('show');
    });
    $('#publish').on('click', function(e) {
        var title = $('#questionpopup').find("#question_title").val();
        var question = $('#questionpopup').find("#question_text").val();
        var tag = $('#questionpopup').find("#question_tag").val();

        var tag = tag.split(',');
        var tg = "";
        for (var i = 0; i < tag.length; i++) {
            tg += '<div class="chip"> ' + tag[i] + '</div> ';
        }
        tg += '<br/>';
        var dict = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var d = new Date();
        var day = d.getDate();
        var m = d.getMonth();
        var y = d.getFullYear();
        var dat = ' ' + day + ' ' + dict[m] + ' ' + y;

        $('#recent-questions').append('<hr class="my-4">' +
            '<div class="card p-4 shadow individual">' +
            '<div class="card-header">' +
            '<div class="media">' +
            '<img class="d-flex rounded-circle avatar z-depth-1-half mr-3 shadow" src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" alt="Anonymous">' +
            '<div class="media-body mt-1 font-weight-bold">' +
            '<a href="profile.html"><strong>Anonymous <span class="badge badge-primary"><i>Verified</i></span></strong></a><p class="card-text" style="float:right"><i class="fa fa-clock-o" aria-hidden="true"></i>' + dat + '</p>' +
            '<p class="card-text "><h5>' + title + '<h5></p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="card-body">' +
            '<div class="row">' +
            '<div class="col-1">' +
            '<div class="rating">' +
            '<div><i class="fa fa-chevron-up"></i></div>' +
            '<div><i class="fa fa-chevron-down"></i></div>' +
            '</div>' +
            '</div>' +
            '<div class="col-10">' +
            '<p >' + question + '</p>' +
            '<br/>' + tg +
            '<br/>' +
            '<div class="jumbotron" style="padding:5px;height:30px">' +
            '<p><i class="fa fa-eye" aria-hidden="true"></i>1 views</p>' +
            '</div>' +
            '<a href="answer.html" class="btn btn-primary" >Answer</a>' +
            '<div class="dropdown" style="float:right">' +
            '<button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '</button>' +
            '<div class="dropdown-menu">' +
            '<button class="dropdown-item delete" type="button">Delete</button>' +
            '<button class="dropdown-item" type="button">Edit</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );

        $('#questionpopup').modal('toggle');
        deletecard();
        scrollToBottom();

    });

    function scrollToBottom() {
        $('html,body').animate({ scrollTop: document.body.scrollHeight }, "slow");
    }

    function deletecard() {
        $('.delete').on('click', function() {
            var conf = confirm('The question will be deleted from feed');
            if (conf == true) {
                $(this).closest('.individual').remove();
            }
        });
    }

    function getDisplayed(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imgD').attr('src', e.target.result).width(200).height(200);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#images').change(function() {
        getDisplayed(this);
    });
    $('#questionpopup').on('hidden.bs.modal', function() {
        $(':input').val('');
    });

    deletecard();
});