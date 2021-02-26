const URL = 'http://localhost:8080/api/persona';

function createPerson() {
    
    var nombre = document.getElementById('fornombre').value;
    var apellido = document.getElementById('forapellido').value;
    var estado=false;
    let _data ={
        nombre: nombre,
        apellido: apellido,
        estado: estado
    };
    
    console.log(_data);
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
     }).then(response => response.json()) 
     .then(json => console.log(json))
     .catch(err => console.log(err));
}
function updateStateMasiv() {
    var target = document.getElementById('tabladata').getElementsByTagName('tbody')[0];
    var trs= target.getElementsByTagName('tr');
    var check;
    for (let i = 1; i < trs.length; i++) {
        check= trs[i].getElementsByTagName('input')[0];
        console.log(check);
        if(check!= null && check.checked){
            updateState(trs[i], check);
        }
        
    }
}
function updateState(row, check){
    console.log('actualiza estado');
    var idd= check.id;
    var id = idd.substring(1, idd.length);

    let _data ={
        nombre: 'same',
        apellido: 'apellido',
        estado: true
    };
    console.log(row);
    fetch(URL+"/estado/"+id, {
        method: 'PUT',
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
     }).then(response => response.json()) 
     .then(json => {
         console.log(json);
         location.reload();
     })
     .catch(err => console.log(err));


}
function getAllPerson(idtarget) {
    fetch(URL).then(function (response) {
        return response.json();
    }).then(function (data) {
        printPersons(data, idtarget);
    });
}


function printPersons(data, idtarget) {
    var target = document.getElementById(idtarget).getElementsByTagName('tbody')[0];
    
    data.forEach(element => {
        console.log(element);
        
        var trtag = document.createElement("tr");
        trtag.appendChild(createTd(element.nombre));
        trtag.appendChild(createTd(element.apellido));
        trtag.appendChild(createTd(element.estado == true ? "procesado" : "no procesado"));
        var check;
        
        if (element.estado == true) {
            check='';
            trtag.appendChild(createTd(check));
        } else {
            check= document.createElement('input');
            check.type = "checkbox";
            check.id = "r" + element.idPersona;
            var tdt = document.createElement("td");
            tdt.appendChild(check)
            trtag.appendChild(tdt);
        }
        target.appendChild(trtag);
    });
}
function createTd(attr) {
    var td = document.createElement("td");
    td.innerText= attr;
    return td;
}