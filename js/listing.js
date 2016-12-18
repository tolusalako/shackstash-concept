function resetRating(){
    for (i = 0; i <= 5; ++i){
        $("#star-"+i).text("star_border");
    }
}

function getStarId(star){
    hovered = star.attr("id");
    hovered = hovered[hovered.length-1];
    return hovered;
}


$(document).ready(function () {
    $("img.hoverable").click( function() {
         src = $(this).attr("src");
         preview = $("#preview-image");
         if ( preview.attr("src") != src )
             preview.attr("src", src);
     });
    // On img option click, replace preview image
    $("img.option").click( function() {
        seq = $(this).attr("seq");
        $('.carousel').carousel('set', seq);
          $("img.option").each(function(){
            $(this).removeClass('active');
          });
        $(this).addClass('active');
    });
    // ======== Reviews  ===========
    // Open modal
    $("a.review").click( function() {
        $('#modal-review').modal('open');
    });
    // Rating
    clicked = false;
    onStar = 0;
    mode = "";
    $(".review-rating-star").mouseenter( function() {
        resetRating();
        hovered = getStarId($(this));
        for (i = 0; i <= hovered; ++i){
            $("#star-"+i).text("star");
        }
    });
    $(".review-rating-star").mouseleave( function() {
        resetRating();
        if (clicked){
            for (i = 0; i <= onStar; ++i){
                if (i == onStar)
                    $("#star-"+i).text(mode);
                else
                    $("#star-"+i).text("star");
            }
        }
    });
    $(".review-rating-star").click(function() {
        clicked = true;
        onStar = getStarId($(this));
        if ($(this).text() == "star")
            mode = "star_half";
        else if ($(this).text() == "star_half")
            mode = "star_border";
        else
            mode = "star";
        $(this).text(mode);
    });
});
