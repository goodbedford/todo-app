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
  ToDo.all = [];
  ToDo.prototype.dateToExpire = function() {
      var one_day = 1000 * 60 * 60 * 24;
      var dateDifferenceMs = this.date.getTime() - (new Date().getTime());
      var daysDiff = dateDifferenceMs / one_day;
      return Math.round(daysDiff);
    }
  ToDo.prototype.save = function(){
    ToDo.all.push(this);
  }
  ToDo.prototype.render = function(){
    var $task =  $(listTemplate(this) );
        var index =  ToDo.all.indexOf(this);
        $task.attr("data-index", index);
        $listParent.prepend($task);
  }
  var dateFormater = function(dTxt){
    // 2023-08-23
    // new Date(2015, 9, 13)
    //console.log("this is dTxt: " + dTxt);
    var dateArr = dTxt.split("-");
    var tempDate= { month: dateArr[1],
            day: dateArr[2],
            year: dateArr[0]
          };
    //var dStr = tempDate.month +"/"+ tempDate.day + "/"+ tempDate.year
    var d = new Date(tempDate.year, (tempDate.month - 1), tempDate.day);
    return d;
  }
   var dateDiff = function(fromDate, toDate){
      var one_day = 1000 * 60 * 60 * 24;
      var dateDifferenceMs = toDate.getTime() - fromDate.getTime();
      var daysDiff = dateDifferenceMs / one_day;
      var tempDate = {diff:Math.round(daysDiff)}
      //return Math.round(daysDiff);
      return tempDate;
    }
  //console.log(dateDiff(d1,d2));

 //data model
 var task1 = new ToDo( "clean room", "hang clothes, sweep floor, water plants", new Date(2023, 6, 7) ),
     task2 = new ToDo( "task2", "hang clothes, sweep floor, water plants", new Date(2015, 6, 7) ); 
     task3 = new ToDo( "task3", "hang clothes, sweep floor, water plants", new Date(2015, 9, 13));
     task1.save();
     task2.save();
     task3.save();
 //var listOfTasks = [ task1, task2, task3];

 //change  the date format
 //for(var i =0; i < listOfTasks.length; i++){
    //console.log(" inside for loop" + listOfTasks[i].date.toLocaleDateString("en-US"));  
    // listOfTasks[i].date = listOfTasks[i].date.toLocaleDateString("en-US");
    //console.log(listOfTasks[i].date)
 //}
  // _.each(listOfTasks, function(task, index){
  //   var $task =  $(listTemplate(task) );
  //       $task.attr("data-index", index);
  //       $listParent.prepend($task);
  // });
   _.each(ToDo.all, function(task, index){
      task.render();
     // var $task =  $(listTemplate(task) );
     //     $task.attr("data-index", index);
     //     $listParent.prepend($task);
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
    if($newItem.val() != "" && 
       $newItemTitle.val() != "" &&
       $dateInput.val() != ""){ 
      console.log("the date is :", $dateInput.val() );
      //var tempTodo = new ToDo($newItemTitle.val(), $newItem.val(), $dateInput.val() );
      var tempTodo = new ToDo($newItemTitle.val(), $newItem.val(), dateFormater($dateInput.val() ) );
      //ToDo.all.push(tempTodo);
      tempTodo.save();
      tempTodo.render();
      console.log(ToDo.all)

      //console.log(tempTodo.title, tempTodo.task, tempTodo.date);
      //var index = listOfTasks.indexOf(this);
      //$task = $(listTemplate(tempTodo) );
      //$task.attr("data-index", index);

      //add li with task to parent ul
      //$listParent.prepend($task);
      $formBox[0].reset();
      $newItem.focus();
      // $newItemTitle.val("");
      // $newItem.val("");
      // $dateInput.val("");
  // var $linkForm = $("<form class='editFormStyle'>");
  //     $editBtn = $("<input type='button' class='btn'>");
  //     $editBtn.val("Edit");
  //     $linkForm.append($editBtn);
  //     //console.log($listParent.first() );
  //     $listParent.children().first().append($linkForm);
    }else{
      var $alert = $("<div></div>");
          $alert.addClass("alert alert-danger");
      var $close = $("<a></a>");
          $close.addClass("close");
          $close.attr("href", "#");
          $close.attr("data-dismiss", 'alert');
          $close.attr("aria-label", "close");
          $close.html("&times;");
      $alert.html($close);
      $alert.prepend("Please fill in all the inputs");

      $("#headerBox").prepend($alert);
    }
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
 
  var taskDueAlert = function(d1,d2, dFunc){
    var daysToAlert = dFunc(d1,d2);
    if (daysToAlert < 3){
      //add class to change color
    }

  }
  var removeListItem = function(){
    //$listParent.on("click", function(){
      
      //console.log("check index to see if deleted" + listOfTasks);
      //console.log("this delete index is ",$(this).attr("data-index") );
      $(this).remove();
      var indx = $(this).attr("data-index");
      ToDo.all.splice(indx,1);
      console.log(ToDo.all)
      $('.lists').each(function(index) {
        $(this).attr('data-index', index);
      });

      //var index = $(this).attr("data-index");
      //console.log(listOfTasks[index]);

      //});
  };

  var markCompleted = function() {
    $(this).parent().append($(this));
    $(this).addClass("completed");
  }

  //$submit.on("submit", addToList);
  $formBox.on("submit", addToList);

  $listParent.on("click", "li", removeListItem);
  //displayTasks(listOfTasks, $listParent);
  $("#headerBox").on("click","a", function(){
    console.log("my alert was clicked");
    $(this).parent().addClass("hideMe");
  })
});

