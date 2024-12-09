$("#telefone").mask("(99) 99999-9999");

var produtos = [
  { id: 1, name: "Bife com Batata", price: 30.0 },
  { id: 2, name: "Coxa de Frango Crocante", price: 25.0 },
  { id: 3, name: "Carne de Panela", price: 22.0 },
  { id: 4, name: "Farofa", price: 10.0 },
  { id: 5, name: "Salada", price: 8.0 },
  { id: 6, name: "Torresmo", price: 12.0 },
];

function calc() {
  var nome = null;
  nome = document.getElementById("nome");
  var saida = null;

  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  var arrayCardsSum = document.getElementsByName("quantity");
  saida = document.getElementById("resultado");
  var totalCompra = 0;
  var stringSaida = "";
  saida.innerHTML = "";
  stringSaida += `Caro ${nome.value} <br><br> Seguem os dados do seu pedido  <br><br>`;
  stringSaida += `O seu pedido é: <br><br>`;
  stringSaida += "<ul>";
  for (var i = 0; i < arrayCardsSum.length; i++) {
    if (arrayCardsSum[i].value > 0) {
      var id = arrayCardsSum[i].id;
      var produto = produtos[id - 1].name;
      var precoUn = produtos[id - 1].price;
      var total = precoUn * arrayCardsSum[i].value;
      stringSaida += `<li>Prato: ${produto} - `;
      stringSaida += `Preço unitário=${formatter.format(precoUn)} - `;
      stringSaida += `Quantidade ${arrayCardsSum[i].value} - `;
      stringSaida += `Total: ${formatter.format(total)}</li>`;
      totalCompra += total;
    }
  }
  stringSaida += `<br><br><strong>Preço total ${formatter.format(
    totalCompra
  )}</strong>`;
  saida.innerHTML = stringSaida;
}

//função do card de aumentar quantidade
function wcqib_refresh_quantity_increments() {
  jQuery(
    "div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)"
  ).each(function (a, b) {
    var c = jQuery(b);
    c.addClass("buttons_added"),
      c
        .children()
        .first()
        .before('<input type="button" value="-" class="minus" />'),
      c
        .children()
        .last()
        .after('<input type="button" value="+" class="plus" />');
  });
}
String.prototype.getDecimals ||
  (String.prototype.getDecimals = function () {
    var a = this,
      b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0;
  }),
  jQuery(document).ready(function () {
    wcqib_refresh_quantity_increments();
  }),
  jQuery(document).on("updated_wc_div", function () {
    wcqib_refresh_quantity_increments();
  }),
  jQuery(document).on("click", ".plus, .minus", function () {
    var a = jQuery(this).closest(".quantity").find(".qty"),
      b = parseFloat(a.val()),
      c = parseFloat(a.attr("max")),
      d = parseFloat(a.attr("min")),
      e = a.attr("step");
    (b && "" !== b && "NaN" !== b) || (b = 0),
      ("" !== c && "NaN" !== c) || (c = ""),
      ("" !== d && "NaN" !== d) || (d = 0),
      ("any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e)) ||
        (e = 1),
      jQuery(this).is(".plus")
        ? c && b >= c
          ? a.val(c)
          : a.val((b + parseFloat(e)).toFixed(e.getDecimals()))
        : d && b <= d
        ? a.val(d)
        : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())),
      a.trigger("change");
  });
