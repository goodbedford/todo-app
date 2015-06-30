$(document).ready(function(){

$body = $("body");
  
  var $newItemTitle = $("#newItemTitle");
  var $newItem = $("#newItem");
  var $submit = $("#submit");
  var $listParent = $("#list");
  var $formBox = $("#formBox");
  var $dateInput = $("#myDate");
  var listTemplate = _.template( $("#list-template").html() );

  var ToDo = function (title, task, date){
    this.title = title,
    this.task = task,
    this.date = date;
  };
  var dateFormater = function(dTxt){
    // 2023-08-23
    // new Date(2015, 9, 13)
    //console.log("this is dTxt: " + dTxt);
    var dateArr = dTxt.split("-");
    var tempDate= { month: dateArr[1],
            day: dateArr[2],
            year: dateArr[0]
          };
    var dStr = tempDate.month +"/"+ tempDate.day + "/"+ tempDate.year
    //var d = new Date(tempDate.year, tempDate.month, tempDate.day);

    return dStr;
  }
 
 //data model
 var task1 = new ToDo()


 var listOfTasks = [
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

 for(var i =0; i < listOfTasks.length; i++){
    console.log(" inside for loop" + listOfTasks[i].date.toLocaleDateString("en-US"));  
    listOfTasks[i].date = listOfTasks[i].date.toLocaleDateString("en-US");
    //console.log(listOfTasks[i].date)
 }
  _.each(listOfTasks, function(task, index){
    var $task =  $(listTemplate(task) );
        //$task.attr("data-index", index);
        $listParent.prepend($task);
  });

  var displayTasks = function(listOfTasks, parentUl){
    $.each(listOfTasks, function(index, item){
      var $tempLi = $("<li />");
      var tempItem = "<span class='miniHeader'>Title: " + item.title + "</span>";
          tempItem += "<br />";
          tempItem += "Task: " + item.task;
          tempItem += "<br />";
          tempItem += "<span id='dateText' class='date-display'>Due Date: " + item.date.toLocaleDateString("en-US") + "</span>";
        $tempLi.html( tempItem );
        parentUl.prepend($tempLi);
    });
  }
  var addToList = function(){
    event.preventDefault();
    console.log("I was clicked");
    var tempTodo = new ToDo($newItemTitle.val(), $newItemTitle.val(), dateFormater($dateInput.val() ) );
    listOfTasks.push(tempTodo);
    console.log(listOfTasks)
    //console.log(tempTodo.title, tempTodo.task, tempTodo.date);
    $task = $(listTemplate(tempTodo) );
    $listParent.prepend($task);
    // if($newItem.val() != "" && 
    //    $newItemTitle.val() != "" &&
    //    $dateInput.val() != ""){ 
    //   var $listItem = $("<li></li>");
    //   var tempTask = "<span class='miniHeader'>Title: " + $newItemTitle.val() + "</span>";
    //       tempTask += "<br />";
    //       tempTask += "Task: " + $newItem.val();
    //       tempTask += "<br />";
    //       tempTask += "<span id='dateText' class='date-display'>Due Date: " + dateFormater($dateInput.val() )  + "</span>";
    //   $listItem.html( tempTask );
    //   $listParent.prepend($listItem);
    //   $newItemTitle.val("");
    //   $newItem.val("");
    //   $dateInput.val("");
    //}
  }
  // var addToList = function(evt,liParent, item){
  //   evt.preventDefault();
  //   console.log("I was clicked");
  //   var $listItem = $("<li></li>");
  //   $listItem.val( item.val() );
  //   liParent.append($listItem);
  // }
  
  // var addToList = function(){
  //   event.preventDefault();
  //   console.log("I was clicked");
  //   if($newItem.val() != "" && 
  //      $newItemTitle.val() != "" &&
  //      $dateInput.val() != ""){ 
  //     var $listItem = $("<li></li>");
  //     var tempTask = "<span class='miniHeader'>Title: " + $newItemTitle.val() + "</span>";
  //         tempTask += "<br />";
  //         tempTask += "Task: " + $newItem.val();
  //         tempTask += "<br />";
  //         tempTask += "<span id='dateText' class='date-display'>Due Date: " + dateFormater($dateInput.val() )  + "</span>";
  //     $listItem.html( tempTask );
  //     $listParent.prepend($listItem);
  //     $newItemTitle.val("");
  //     $newItem.val("");
  //     $dateInput.val("");
  //   }
  // }

  var d1 = new Date();
  var d2 = new Date(2015, 6, 30);
  var one_day = 1000 * 60 * 60 * 24;

   var dateDiff = function(fromDate, toDate){
      var dateDifferenceMs = toDate.getTime() - fromDate.getTime();
      var daysDiff = dateDifferenceMs / one_day;
      return Math.round(daysDiff);
    }
  //console.log(dateDiff(d1,d2));

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

  //$submit.on("submit", addToList);
  $formBox.on("submit", addToList);

  $listParent.on("click", "li", removeListItem);
  //displayTasks(listOfTask, $listParent);
    
});

