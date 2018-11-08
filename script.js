const GITLAB_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 492.50943 453.67966"><title>Gitlab</title><g fill="none" fill-rule="evenodd"><path d="M491.58891 259.39833l-27.55867-84.81467L409.41291 6.48633c-2.80934-8.648-15.04533-8.648-17.856 0l-54.61867 168.09733H155.57158l-54.62-168.09733c-2.80933-8.648-15.04533-8.648-17.856 0L28.47825 174.58366.92092 259.39833c-2.514669 7.736.24 16.21066 6.82 20.992l238.51333 173.28933 238.51466-173.28933c6.58-4.78134 9.33333-13.256 6.82-20.992" fill="#fc6d26"/><path d="M246.25478 453.67966l90.684-279.096h-181.368z" fill="#e24329"/><path d="M246.25478 453.67912l-90.684-279.09466h-127.092z" fill="#fc6d26"/><path d="M28.47878 174.58406L.92012 259.39873c-2.513336 7.736.24 16.21066 6.82133 20.99066l238.51333 173.28933z" fill="#fca326"/><path d="M28.47878 174.58433h127.092L100.95212 6.487c-2.81067-8.64933-15.04667-8.64933-17.856 0z" fill="#e24329"/><path d="M246.25478 453.67912l90.684-279.09466h127.09199z" fill="#fc6d26"/><path d="M464.03064 174.58406l27.55867 84.81467c2.51333 7.736-.24 16.21066-6.82134 20.99066L246.25465 453.67872z" fill="#fca326"/><path d="M464.03064 174.58433h-127.092L391.55731 6.487c2.81066-8.64933 15.04666-8.64933 17.856 0z" fill="#e24329"/></g></svg>';
const BB_ICON = '<svg role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bitbucket</title><path d="M.778 1.211c-.424-.006-.772.334-.778.758 0 .045.002.09.01.134l3.263 19.811c.084.499.515.867 1.022.872H19.95c.382.004.708-.271.77-.646l3.27-20.03c.068-.418-.216-.813-.635-.881-.045-.008-.089-.011-.133-.01L.778 1.211zM14.52 15.528H9.522L8.17 8.464h7.561l-1.211 7.064z"/></svg>'
const GH_ICON = '<svg role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'

// Make the github AJAX call for my Repos
$.getJSON("https://api.github.com/users/erismik/repos", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        items.push(
            "<tr>"+
            "<td>"+GH_ICON+"<a href=\""+val.html_url+"\">"+val.name+"</a></td>"+
            "<td>"+val.description+"</td>"+
            "<td>"+val.language+"</td>"+
            "<td>"+cleanTime(val.updated_at)+"</td>"+
            "<td>"+cleanTime(val.created_at)+"</td>"+
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
            "<td>"+BB_ICON+"<a href=\""+val.links.html.href+"\">"+val.name+"</a></td>"+
            "<td>"+val.description+"</td>"+
            "<td>"+val.language+"</td>"+
            "<td>"+cleanTime(val.updated_on)+"</td>"+
            "<td>"+cleanTime(val.created_on)+"</td>"+
            "</tr>"
        );
    });

    $("#current table").append(items.join(""));
});

// Make the gitlab AJAX call for my repos
$.getJSON("https://gitlab.com/api/v4/users/erismik/projects", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        items.push(
            "<tr>"+
            "<td>"+GITLAB_ICON+"<a href=\""+val.web_url+"\">"+val.name+"</a></td>"+
            "<td>"+val.description+"</td>"+
            "<td>"+"Not Avail."+"</td>"+
            "<td>"+cleanTime(val.last_activity_at)+"</td>"+
            "<td>"+cleanTime(val.created_at)+"</td>"+
            "</tr>"
        );
    });

    $("#current table").append(items.join(""));
});

// Cleans up the time to be human readable
function cleanTime(ind) {
	var d = new Date(ind);
	var output = (d.getMonth()+1).toString().padStart(2, '0') + "/" + d.getFullYear();
	return output;
}

// Sort function for the table (Copied from W3 schools, slightly modified for my own use)
function sortTable(n, isDate=false) {
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
        if (isDate) {
          if (x.innerHTML.slice(-4) > y.innerHTML.slice(-4)) {
            shouldSwitch = true;
            break;
          } else if (x.innerHTML.slice(-4) === y.innerHTML.slice(-4)){
            if (x.innerHTML.slice(2) > y.innerHTML.slice(2)) {
              shouldSwitch = true;
              break;
            }
          }
        }
        else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }

      } else if (dir == "desc") {
        if (isDate) {
          if (x.innerHTML.slice(-4) < y.innerHTML.slice(-4)) {
            shouldSwitch = true;
            break;
          } else if (x.innerHTML.slice(-4) === y.innerHTML.slice(-4)){
            if (x.innerHTML.slice(2) < y.innerHTML.slice(2)) {
              shouldSwitch = true;
              break;
            }
          }
        }
        else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
