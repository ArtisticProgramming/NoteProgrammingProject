(function () {

    // Initialize namespace 'utilities' (or use existing one if present)
    window.noteUtilityJs = window.noteUtilityJs || {};

    $('body').on('click', '.OpenCloseNote', function () {
        var heigth="100px";
        debugger;
        var selctor =$(this).parent().parent().children(".cardHeigth")
        var sele = $(this).parent().parent().parent();
        var h = $(selctor).css("height");
        if (h == heigth) {
            $(selctor).css('height', 'auto');
            $(selctor).css('overflow-y', 'hidden');
            $(sele).removeClass("col-lg-6")
            $(sele).addClass("col-lg-12")
            //    $(selctor).animate({height:autoH}, 400, function() {
            //     // Animation complete.
            //   });

        } else {
            $(selctor).css('height', heigth);
            $(selctor).css('overflow-y', 'scroll');
            $(sele).removeClass("col-lg-12")
            $(sele).addClass("col-lg-6")
            // $(selctor).animate({height:"100px"}, 400, function() {
            //     // Animation complete.
            //   });
        }
        return false;
    });


})();