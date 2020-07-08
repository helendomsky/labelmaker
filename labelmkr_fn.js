$(function() {

  var exp = $("#EXPORT_CONTENTS");
  var inst_list = ["APG","Fort Belvoir","Fort Bliss","Fort Collins"]


  //exp.hide();
  popDrop("#inst_opts",inst_list);


  popTag("#pop_button","#inst_opts","#num_sites","#EXPORT_CONTENTS");
  triggerExportPDF("#exp_button");







  function triggerExportPDF(buttonTag){
    var bt = $(buttonTag);


    var doc = new jsPDF();          
    var elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true;
      }
    };
    var source = window.document.getElementsByTagName("body")[0];
    doc.fromHTML(
      source,
      15,
      15,
      {
        'width': 180,'elementHandlers': elementHandler
      });

    bt.on("click",function() {
      doc.output("dataurlnewwindow");
    });
  };

  function popDrop(menu, items){
    var dd = $(menu)

    for(var i =0; i<= items.length-1; i++){
      dd.append($("<option/>", { id: "it" + i, value: items[i],text: items[i]}))
    };

    
    dd.change(function() {
      //var selected = $(this).find('option:selected').text();
      //console.log(selected);
      //return selected;
      console.log(dd.val());
    });
  };

  function popTag(populateButton,installation,sites,tagLoc){
    var bt = $(populateButton);
    var tg = $(tagLoc);

    bt.on("click",function() {
      var inst = $(installation);
      var stnum = $(sites);

      for(var i = 1; i <= stnum.val(); i++){
        tg.append($("<div/>",{ id: "newtag", text: inst.val()+", Site "+i}))
      };

    });

  };

//put all the pieces together
//show a tag preview
//show the "export" button

});
