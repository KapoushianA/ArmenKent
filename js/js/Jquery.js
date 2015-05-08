$("document").ready(function(){
    $('#a').bind('click', toggleTheText);

});
function toggleTheText() {
    $('h5').toggle(2500);
}