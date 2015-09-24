$(function(){
  $(document).on("click", document, function(){

    $(".extra").empty()

    // Show anchor name
    $(".extra").append("<h3>anchor name:</h3>");
    newline();
    $(".extra").append(plots[0].anchor);
    newparagraph();

    // Show all region names
    $(".extra").append("<h3>region names: ");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ", ");
    }
    newparagraph();

    // Show active region
    $(".extra").append("<h3>active region:</h3>");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ": ");
      $(".extra").append(plots[0].data_region.info_table[i].active);
      newline();
    }
    newparagraph();

    // Show region boundaries
    $(".extra").append("<h3>region boundaries:</h3>");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ": ");
      $(".extra").append(plots[0].data_region.info_table[i].left + ", ");
      $(".extra").append(plots[0].data_region.info_table[i].right);
      newline();
    }
    newparagraph();

    // Show region indices
    $(".extra").append("<h3>region indices:</h3>");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ": ");
      $(".extra").append(plots[0].data_region.info_table[i].left_idx + ", ");
      $(".extra").append(plots[0].data_region.info_table[i].right_idx);
      newline();
    }
    newparagraph();

    // Show data confined in each region
    $(".extra").append("<h3>y values in each region:</h3>");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      var region_name = plots[0].data_region.info_table[i].region_name;
      var left_idx = plots[0].data_region.info_table[i].left_idx;
      var right_idx = plots[0].data_region.info_table[i].right_idx;
      $(".extra").append("<strong>"+region_name + ":</strong>");
      newline();
      for (var j=left_idx; j<=right_idx; j++){
        $(".extra").append(plots[0].raw_data[j][1] + ",");
        newline();
      }
    }
    newparagraph();

  });

  function newline(){
    $(".extra").append("<br>");
  }
  function newparagraph(){
    $(".extra").append("<br><br>");
  }
  $(document).trigger("click");
});
