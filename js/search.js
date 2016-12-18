


$(document).ready(function () {

    // Options select
    grey = "rgb(128, 128, 128)"
    teal = "rgb(0,150,136)"
    $(".material-icons.clickable").click(function (){
        var color = $(this).css("color");
        if (color == grey){
            $(this).css("color", teal);
            $(this).addClass("selected");
        }else{
            $(this).css("color", grey);
            $(this).removeClass("selected");
        }
    });

    var sliders = document.getElementsByClassName('sliders');

    for ( var i = 0; i < sliders.length; i++ ) {

    	noUiSlider.create(sliders[i], {
    		start: [0, 100],
    		connect: [false, true, false],
    		range: {
    			'min': 0,
    			'max': 255
    		},
    		format: wNumb({
    			decimals: 1
    		})
    	});

    	// Bind the color changing function to the slide event.
    	// sliders[i].noUiSlider.on('slide', setColor);
    }





//     var slider = document.getElementById('rating-slider');
//     console.log(slider)
//     console.log(noUiSlider)
//       noUiSlider.create(slider, {
//        start: [0, 5],
//        connect: true,
//        step: 0.1,
//        range: {
//          'min': 0,
//          'max': 5
//        },
//        tooltips: [true, wNumb({ decimals: 1 })],
//        format: wNumb({
//          decimals: 1
//        })
//       });
});
