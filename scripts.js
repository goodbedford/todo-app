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
    this.expireDate = 0;
 };
  ToDo.all = [];
  ToDo.prototype.dateToExpire = function() {
      var one_day = 1000 * 60 * 60 * 24;
      var dateDifferenceMs = this.date.getTime() - (new Date().getTime());
      var daysDiff = dateDifferenceMs / one_day;
      this.expireDate = Math.round(daysDiff);
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
      var dateDifferenceMs = toDate.getMilliseconds() - fromDate.getMilliseconds();
      var daysDiff = dateDifferenceMs / one_day;
      var tempDate = {diff:Math.round(daysDiff)}
      //return Math.round(daysDiff);
      return tempDate;
    }

 //data model
 var task1 = new ToDo( "clean room", "hang clothes, sweep floor, water plants", new Date(2023, 6, 7) ),
     task2 = new ToDo( "task2", "hang clothes, sweep floor, water plants", new Date(2015, 6, 7) ); 
     task3 = new ToDo( "task3", "hang clothes, sweep floor, water plants", new Date(2015, 9, 13));
     task1.save();
     task2.save();
     task3.save();

   _.each(ToDo.all, function(task, index){
      task.dateToExpire();
      task.date = task.date.toLocaleDateString();
      task.render();
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
    if($newItem.val() != "" && 
       $newItemTitle.val() != "" &&
       $dateInput.val() != ""){ 
      console.log("the date is :", $dateInput.val() );
      //var tempTodo = new ToDo($newItemTitle.val(), $newItem.val(), $dateInput.val() );
      var tempTodo = new ToDo($newItemTitle.val(), $newItem.val(), dateFormater($dateInput.val() ) );
      //ToDo.all.push(tempTodo);
      tempTodo.dateToExpire();
      tempTodo.date = tempTodo.date.toLocaleDateString();
      tempTodo.save();

      tempTodo.render();
      console.log(ToDo.all)
      $formBox[0].reset();
      $newItem.focus();
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

