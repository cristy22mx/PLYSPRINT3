function loadPage() {
  paintContact(data);
}

function paintContact(contacts) {

  contacts.forEach(function(persons) {
    // crear elementos con DOM
    var $div = $("<div />", {
      "id": "addContact"
    });
    var $div1 = $("<div />");
    var $name = $("<h5 />");
    var $imagen = $("<img />");
    var $div2 = $("<div />");
    var $button = $("<button />");


    //  atributos y eventos a los elementos creados en el DOM
    // $button.attr('data-toggle','modal')
    // $button.attr('data-target','#myModalMap')
    // $button.attr('data-addres',place.address)
    // $button.attr('data-hour',place.hour)
    // $button.attr('data-cost',place.cost)
    $imagen.attr('src', persons.image);
    $button.addClass("btn btn-primary");


    // Asignando valores

    //$divImagen.val($imagen);
    $name.text(persons.name);
    $imagen.html($imagen);
    $button.text("Hacerlo mi amigo");



    $div.append($div1);
    $div1.append($imagen);
    $div1.append($div2);
    $div2.append($name);
    $div2.append($button);

    console.log("paintContact");
    // agregamos lo que creamos con el Dom a un elemento existente del html

    $("#addContact").prepend($div);
  });
};

$(document).ready(loadPage);
