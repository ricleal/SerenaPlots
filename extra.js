$(function(){
  $(document).on("click", document, function(){

    $(".extra").empty()

    // Show anchor name
    $(".extra").append("anchor name: ");
    newline();
    $(".extra").append(plots[0].anchor);
    newparagraph();

    // Show all region names
    $(".extra").append("region names: ");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ", ");
    }
    newparagraph();

    // Show active region
    $(".extra").append("active region: ");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ": ");
      $(".extra").append(plots[0].data_region.info_table[i].active);
      newline();
    }
    newparagraph();

    // Show region boundaries
    $(".extra").append("region boundaries: ");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ": ");
      $(".extra").append(plots[0].data_region.info_table[i].left + ", ");
      $(".extra").append(plots[0].data_region.info_table[i].right);
      newline();
    }
    newparagraph();

    // Show region indices
    $(".extra").append("region indices: ");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      $(".extra").append(plots[0].data_region.info_table[i].region_name + ": ");
      $(".extra").append(plots[0].data_region.info_table[i].left_idx + ", ");
      $(".extra").append(plots[0].data_region.info_table[i].right_idx);
      newline();
    }
    newparagraph();

    // Show data confined in each region
    $(".extra").append("y values in each region: ");
    newline();
    for (var i=0; i<plots[0].data_region.info_table.length; i++){
      var region_name = plots[0].data_region.info_table[i].region_name;
      var left_idx = plots[0].data_region.info_table[i].left_idx;
      var right_idx = plots[0].data_region.info_table[i].right_idx;
      $(".extra").append(region_name + ": ");
      newline();
      for (var j=left_idx; j<=right_idx; j++){
        $(".extra").append(plots[0].raw_data[j][1] + ", ");
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
