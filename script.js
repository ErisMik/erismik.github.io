// Make the github AJAX call for my Repos
$.getJSON("https://api.github.com/users/erismik/repos", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        items.push(
            "<tr>"+
            "<td><a href=\""+val["html_url"]+"\">"+val["name"]+"</a></td>"+
            "<td>"+val["description"]+"</td>"+
            "<td>"+val["language"]+"</td>"+
            "<td>"+val["updated_at"]+"</td>"+
            "</tr>"
        );
    });

    $("#current table").append(items.join(""));
});

// Make the bitbucket AJAX call for my Repos
$.getJSON("https://api.bitbucket.org/2.0/repositories/itsEris", {origin: "http://bitbucket.com"}, function(data) {
    var items = [];
    var stuff = data["values"];
    $.each(stuff, function(key, val) {
        items.push(
            "<tr>"+
            "<td><a href=\""+val["links"]["html"]["href"]+"\">"+val["name"]+"</a></td>"+
            "<td>"+val["description"]+"</td>"+
            "<td>"+val["language"]+"</td>"+
            "<td>"+val["updated_on"]+"</td>"+
            "</tr>"
        );
    });

    $("#current table").append(items.join(""));
});
