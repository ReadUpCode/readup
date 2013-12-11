var setupUI = function(){

  // Show and hide input elements (placeholder, suggestions, etc.) at correct times
  $(".main-input-text").focus(function(){
    $(this).parent().addClass("typing");
  }).blur(function(){
    var thisInput = $(this).parent();
    setTimeout(function() {
      thisInput.removeClass("open typing");
    }, 10);
  }).keyup(function(){
    if(!$(this).val()) {
      $(this).parent().removeClass("has-text");
    } else {
      $(this).parent().addClass("has-text");
    }
  });

  $("#search-input-tab").on("click", function(){
    $("#paste-link-input, #paste-link-input-tab").removeClass("open");
    $("#search-input, #search-input-tab").toggleClass("open");
    $("#search-input").find(".main-input-text").focus();
  });

  $("#paste-link-input-tab").on("click", function(){
    $("#search-input, #search-input-tab").removeClass("open");
    $("#paste-link-input, #paste-link-input-tab").toggleClass("open");
    $("#paste-link-input").find(".main-input-text").focus();
  });

  $("#search-input, #search-input-tab, #paste-link-input, #paste-link-input-tab").on("click", function(event){
    event.stopPropagation();
  });

  $('html').on("click", function() {
    $("#search-input, #search-input-tab, #paste-link-input, #paste-link-input-tab").removeClass("open typing");
  });
};

$(function() {
  setupUI();
});
