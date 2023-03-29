/*!

  @author       RoboToxiCo

*/

//console.log(entities);

import entities from './entities.json' assert {type: 'json'};

function getCharacterLength(str) {
  // The string iterator that is used here iterates over characters,
  // not mere code units
  return [...str].length;
}

function renderHobbyHtmlContent() {
  var mainBody = document.getElementById("mainBody");
  //mainBody.innerHTML = `bla bla..`;
  var keys = [];
  for (var x in entities) {
    var xx = x.replace(';', '');
    if (keys.includes(x) || keys.includes(xx)) continue;
    keys.push(x);
  }
  var records = "";
  keys.forEach(x => {
    records += "<tr><td>";
    records += x;
    records += "</td><td><code>";
    records += x.replace('&', '&amp;');
    if (!x.endsWith(';')) records += ";";
    records += "</code></td><td>";
    //console.log(x, entities[x]);
    //var chs = entities[x]["characters"];
    let chs = "";
    // for (const cp of entities[x]["characters"]) {
    //   chs += "\\u";
    //   chs += cp.codePointAt(0).toString(16).toUpperCase();
    // }
    // chs = "";
    for (var i = 0; i < entities[x]["characters"].length; i++) {
      chs += "\\u";
      chs += entities[x]["characters"][i].charCodeAt(0).toString(16).toUpperCase();
    }
    records += chs;
    records += "</td></tr>";
  });
  var tableBody = mainBody.querySelector("table>tbody");
  tableBody.innerHTML = records;
}

function initialise() {
  document.getElementById("hobbyHtml").onclick = () => {
    renderHobbyHtmlContent();
  };
}

//initialise();
renderHobbyHtmlContent();
