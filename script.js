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
