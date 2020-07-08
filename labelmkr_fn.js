$(function() {

  var exp = $("#EXPORT_CONTENTS");
  var genus_list = ["Aedes","Culex","Culiseta","Psorophora"]
  var inst_list = ["Aberdeen Proving Grounds","Fort Belvoir","Fort Bliss","Rocky Mountain Arsenal"]
  var city_state = ["Aberdeen, MD","Fairfax, VA","El Paso, TX","Commerce City, CO"]
  //exp.hide();
  popDrop("#inst_opts",inst_list,city_state);
  popDrop("#genus_opts",genus_list,genus_list)

  popTag("#pop_button","#inst_opts","#genus_opts","#num_sites","#date_rec","#date_emg","#EXPORT_CONTENTS");
  triggerExportPDF("#exp_button");







  function triggerExportPDF(buttonTag){
    var bt = $(buttonTag);

    bt.on("click",function() {


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


      doc.output("dataurlnewwindow");
      doc.save("tags.pdf");
    });
  };

  function popDrop(menu, items, attribute){
    var dd = $(menu)

    for(var i =0; i<= items.length-1; i++){
      dd.append($("<option/>", { id: "it" + i, value: attribute[i],text: items[i]}))
    };

    
    dd.change(function() {
      //var selected = $(this).find('option:selected').text();
      //console.log(selected);
      //return selected;
      console.log(dd.val());
    });
  };

  function popTag(populateButton,installation,genus,sites,dateReceived,dateEmerged,tagLoc){
    var bt = $(populateButton);
    var tgset = $(tagLoc);

    bt.on("click",function() {
      var inst = $(installation);
      var stnum = $(sites);
      var gn = $(genus)
      var dr = $(dateReceived);
      var de = $(dateEmerged);



      for(var i = 1; i <= stnum.val(); i++){
        tgset.append($("<div/>",{ id: "tag_"+i, class: "test"}));
        var tg = $("#tag_"+i)

        tg.append($("<div/>",{ id: "gen", text: "Genus: "+gn.find("option:selected").val()}));
        tg.append($("<div/>",{ id: "rec", text: "Date Received: "+dr.val()}));
        tg.append($("<div/>",{ id: "emg", text: "Date Emerged: "+de.val()}));
        tg.append($("<div/>",{ id: "newtag", text: inst.find("option:selected").text()+", Site "+i}));
        tg.append($("<div/>",{ id: "citystate", text: inst.val()+", USA"}));
        tg.append($("<div/>",{ id: "inspc", text: "--INITIAL BELOW--"}));        
        tg.append($("<div/>",{ id: "inspc", text: "Pan Start: ____ Cage Start: ____"}));
        tg.append($("<br>"));

        //could add a "remove button" beside each, that will change CSS class
        //and make the ID "ignorePDF"
      };

    });

  };

//put all the pieces together
//show a tag preview
//show the "export" button

});
