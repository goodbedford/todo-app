$(document).ready(function(){

$body = $("body");
  
  var $newItemTitle = $("#newItemTitle");
  var $newItem = $("#newItem");
  var $submit = $("#submit");
  var $listParent = $("#list");
  var listOfTask=[
        {title: "clean room",
         task: "hang clothes, sweep floor, water plants"},
        {title: "task2",
         task: "hang clothes, sweep floor, water plants"},
        {title: "task3",
          task: "hang clothes, sweep floor, water plants"},
        {title: "task4",
          task: "hang something something plants"}
  ];

  // var addToList = function(evt,liParent, item){
  //   evt.preventDefault();
  //   console.log("I was clicked");
  //   var $listItem = $("<li></li>");
  //   $listItem.val( item.val() );
  //   liParent.append($listItem);
  // }
  
  var addToList = function(){
    event.preventDefault();
    console.log("I was clicked");
    if($newItem.val() != ""){ 
      var $listItem = $("<li></li>");
      var tempTask = "<span class='miniHeader'>Title: " + $newItemTitle.val() + "</span>";
          tempTask += "<br />";
          tempTask += "Task: " + $newItem.val();
      $listItem.html( tempTask );
      $listParent.prepend($listItem);
      $newItemTitle.val("");
      $newItem.val("");
    }
  }

  var removeListItem = function(){
    $listParent.children().on("click", function(){
      this.remove();
    });
  };

  var markCompleted = function() {
    $(this).parent().append($(this));
    $(this).addClass("completed");
  }

  $submit.on("click", addToList);
  $listParent.on("click", "li", markCompleted);
    
});

