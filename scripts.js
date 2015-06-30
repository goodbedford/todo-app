$(document).ready(function(){

$body = $("body");
  
  var $newItemTitle = $("#newItemTitle");
  var $newItem = $("#newItem");
  var $submit = $("#submit");
  var $listParent = $("#list");
  var $dateInput = $("#myDate");
  var listOfTask = [
        {title: "clean room",
         task: "hang clothes, sweep floor, water plants",
         date: new Date(2023, 6, 7)},
        {title: "task2",
         task: "hang clothes, sweep floor, water plants",
         date: new Date(2015, 6, 7)},
        {title: "task3",
          task: "hang clothes, sweep floor, water plants",
          date: new Date(2015, 9, 13)},
        {title: "task4",
          task: "hang something something plants",
          date: new Date(2015, 9, 7)}
  ];

  var displayTasks = function(listOfTask, parentUl){
    $.each(listOfTask, function(index, item){
      var $tempLi = $("<li />");
      var tempItem = "<span class='miniHeader'>Title: " + item.title + "</span>";
          tempItem += "<br />";
          tempItem += "Task: " + item.task;
          tempItem += "<br />";
          tempItem += "<span id='dateText' class='date-display'>Date: " + item.date.toLocaleDateString("en-US") + "</span>";
        $tempLi.html( tempItem );
        parentUl.prepend($tempLi);
    });
  }
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
    if($newItem.val() != "" && $newItemTitle.val() != ""){ 
      var $listItem = $("<li></li>");
      var tempTask = "<span class='miniHeader'>Title: " + $newItemTitle.val() + "</span>";
          tempTask += "<br />";
          tempTask += "Task: " + $newItem.val();
          tempTask += "<br />";
          tempTask += "<span id='dateText' class='date-display'>Date: " + $dateInput.val()  + "</span>";
      $listItem.html( tempTask );
      $listParent.prepend($listItem);
      $newItemTitle.val("");
      $newItem.val("");
    }
  }
  var dateFormater = function(dTxt){
    // 2023-08-23
    // new Date(2015, 9, 13)
    var dateArr = dTxt.split("-");
    var tempDate= { month: dateArr[1],
            day: dateArr[2],
            year: dateArr[0]
          };
    var d = new Date(tempDate.year, tempDate.month, tempDate.day);
    return d;
  }
  var d1 = new Date();
  var d2 = new Date(2015, 6, 30);
  var one_day = 1000 * 60 * 60 * 24;

   var dateDiff = function(fromDate, toDate){
      var dateDifferenceMs = toDate.getTime() - fromDate.getTime();
      var daysDiff = dateDifferenceMs / one_day;
      return Math.round(daysDiff);
    }
  console.log(dateDiff(d1,d2));

  var taskDueAlert = function(d1,d2, dFunc){
    var daysToAlert = dFunc(d1,d2);
    if (daysToAlert < 3){
      //add class to change color
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
  $listParent.on("click", "li", removeListItem);
  displayTasks(listOfTask, $listParent);
    
});

