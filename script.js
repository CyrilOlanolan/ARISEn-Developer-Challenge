"use strict";

var table;
var freeID = [];
var users = [];

// USER BLUEPRINT
function User(id, name, gender, age) {
  this.id = id;
  this.name = name;
  this.gender = gender;
  this.age = age;
}

function GetFreeID() {
  if (freeID[0] < users.length) {
    freeID.sort();
    return freeID.shift();
  } else return users.length;
}

function AddUser(name, gender, age) {
  // ADD TO ARRAY
  const user = new User(GetFreeID(), name, gender, age);
  users[user.id] = user;

  // ADD TO TABLE
  table.row.add([user.id, name, gender, age]).node().id = user.id;
  table.draw();
}

function DeleteUser(id) {
  if (users[id] === undefined) return;

  delete users[id];
  freeID.push(parseInt(id));

  //REMOVE USER FROM TABLE!
  table.row($("#" + id)).remove();
  table.draw();
}

$(document).ready(function () {
  table = $("#table").DataTable();

  $("#add").click(function (e) {
    e.preventDefault();
    AddUser(
      $("#input_name").val(),
      $("#input_gender").val(),
      $("#input_age").val()
    );
    $("#modal_add_user").modal("hide");
  });

  $("#delete").click(function (e) {
    e.preventDefault();
    DeleteUser($("#input_id_delete").val());
    $("#modal_delete_user").modal("hide");
  });
});
