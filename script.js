// Make the github AJAX call for my Repos
$.getJSON("https://api.github.com/users/erismik/repos", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        items.push(
            "<tr>"+
            "<td><a href=\""+val.html_url+"\">"+val.name+"</a></td>"+
            "<td>"+val.description+"</td>"+
            "<td>"+val.language+"</td>"+
            "<td>"+val.updated_at+"</td>"+
            "<td>"+val.created_at+"</td>"+
            "</tr>"
        );
    });

    $("#current table").append(items.join(""));
});

// Make the bitbucket AJAX call for my Repos
$.getJSON("https://api.bitbucket.org/2.0/repositories/itsEris", {origin: "http://bitbucket.com"}, function(data) {
    var items = [];
    var stuff = data.values;
    $.each(stuff, function(key, val) {
        items.push(
            "<tr>"+
            "<td><a href=\""+val.links.html.href+"\">"+val.name+"</a></td>"+
            "<td>"+val.description+"</td>"+
            "<td>"+val.language+"</td>"+
            "<td>"+val.updated_on+"</td>"+
            "<td>"+val.created_on+"</td>"+
            "</tr>"
        );
    });

    $("#current table").append(items.join(""));
});

// Sort function for the table (Copied from W3 schools)
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("current");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}