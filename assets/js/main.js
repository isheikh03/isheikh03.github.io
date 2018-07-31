$("#collapsibleNavbar").find(".nav-item").on("click", function(){
    
    if( $( window ).width() <576){
        $(".navbar-toggler").trigger("click");
    }
    
});
    
