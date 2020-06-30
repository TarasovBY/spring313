$(document).ready(function () {
loadUserTable();
addUser();
deleteUser();
editUser();
currentUser();
});

//добовляет таблицу на страницу - работает
var loadUserTable = function() {
    $.ajax("/rest/user/all", {

        success: function (msg) { //msg - то, что придет с сервера, респонз
            msg.forEach(function (user) {
                let stringRoles = '';
                user.role.forEach(function (role, index) {
                    stringRoles += role.name + " ";
                });
                $('#allTable').append(`<tr>
                            <td class="table-secondary">${user.id}</td>
                            <td class="table-secondary">${user.name}</td>
                            <td class="table-secondary">${user.telephone}</td>
                            <td class="table-secondary">${user.password}</td>
                            <td class="table-secondary roleTable" id="rolesTables">
                                <p>${stringRoles}</p>
                            </td>
                            <td class="table-secondary">

                                <button type="button" onclick="
$.get( '/rest/user/${user.id}', function( user ) {
  $('#editFormiddis').val(user.id);
  $('#editFormid').val(user.id);
  $('#editFormname').val(user.name);
  $('#editFormtelephone').val(user.telephone);
  $('#editFormpassword').val(user.password);
  user.role.forEach(function(role, index) {

      if(role.name === 'Admin') {
        $('#editFormrolesAdmin').attr('selected', 'selected')
      }
      else if(role.name === 'User') {
        $('#editFormrolesUser').attr('selected', 'selected')
      }


                            });
});


" class="btn btn-info" data-toggle="modal" data-target="#exampleModalUpdate">
                                    Edit
                                </button>
                            </td>
                            <td class="table-secondary">
                                <!-- Модальное окно удалить юзера -->
                                <div class="modal fade" id="exampleModalDelete${user.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Delete user</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modalAdmin modal-body">
                                                <p>ID</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.id}">
                                                <p>Name</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.name}">
                                                <p>Telephone</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.telephone}">
                                                <p>Roles</p>
                                                <select class="form-control" disabled="disabled" multiple size="2" name="roles">
                                                    <option name="admin">Admin</option>
                                                    <option name="user">User</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <form>
                                                    <input class="idUser" type="hidden" id="delll${user.id}" name="id" value="${user.id}">
                                                    <input type="button" value="Delete" data-dismiss="modal" name="${user.id}" class="btn btn-danger buttonDeleteButton">
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" data-toggle="modal" data-target="#exampleModalDelete${user.id}">
                                    Delete
                                </button>
                            </td>

                        </tr>`);
            })

        }
    })
}

//добовляем нового юзера
var addUser = function() {
    $("#userAdd").click(
        function () {
            $.ajax({
                type: "POST",
                url: "/rest/user/add",
                data: {
                    name: $('#name').val(),
                    telephone: $("#telephone").val(),
                    password: $("#password").val(),
                    roles: $("#roles option:selected").text()
                },
                success: function (msg) {
                    $("#allTable").empty();
                    $.ajax("/rest/user/all", {

                        success: function (msg) { //msg - то, что придет с сервера, респонз
                            msg.forEach(function (user) {
                                let stringRoles = '';
                                user.role.forEach(function (role, index) {
                                    stringRoles += role.name + " ";
                                });
                                $('#allTable').append(`<tr>
                            <td class="table-secondary">${user.id}</td>
                            <td class="table-secondary">${user.name}</td>
                            <td class="table-secondary">${user.telephone}</td>
                            <td class="table-secondary">${user.password}</td>
                            <td class="table-secondary roleTable" id="rolesTables">
                                <p>${stringRoles}</p>
                            </td>
                            <td class="table-secondary">

                                <button type="button" onclick="
$.get( '/rest/user/${user.id}', function( user ) {
  $('#editFormiddis').val(user.id);
  $('#editFormid').val(user.id);
  $('#editFormname').val(user.name);
  $('#editFormtelephone').val(user.telephone);
  $('#editFormpassword').val(user.password);
  user.role.forEach(function(role, index) {

      if(role.name === 'Admin') {
        $('#editFormrolesAdmin').attr('selected', 'selected')
      }
      else if(role.name === 'User') {
        $('#editFormrolesUser').attr('selected', 'selected')
      }


                            });
});


" class="btn btn-info" data-toggle="modal" data-target="#exampleModalUpdate">
                                    Edit
                                </button>
                            </td>
                            <td class="table-secondary">
                                <!-- Модальное окно удалить юзера -->
                                <div class="modal fade" id="exampleModalDelete${user.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Delete user</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modalAdmin modal-body">
                                                <p>ID</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.id}">
                                                <p>Name</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.name}">
                                                <p>Telephone</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.telephone}">
                                                <p>Roles</p>
                                                <select class="form-control" disabled="disabled" multiple size="2" name="roles">
                                                    <option name="admin">Admin</option>
                                                    <option name="user">User</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <form>
                                                    <input class="idUser" type="hidden" id="delll${user.id}" name="id" value="${user.id}">
                                                    <input type="button" value="Delete" data-dismiss="modal" name="${user.id}" class="btn btn-danger buttonDeleteButton">
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" data-toggle="modal" data-target="#exampleModalDelete${user.id}">
                                    Delete
                                </button>
                            </td>

                        </tr>`);
                            })

                        }
                    })
                    $('[href="#nav-home"]').tab('show');
                },

                dataType: "text"
            });
        }
    )
}

//удалить юзера
var deleteUser = function () {
    $(document).on('click', '.buttonDeleteButton', function () {
        let id = "/rest/user/delete/" + $(this).attr("name");
        $.ajax(id, {
            method: "DELETE",


            success: function (msg) {
                $("#allTable").empty();
                $.ajax("/rest/user/all", {

                    success: function (msg) { //msg - то, что придет с сервера, респонз
                        msg.forEach(function (user) {
                            let stringRoles = '';
                            user.role.forEach(function (role, index) {
                                stringRoles += role.name + " ";
                            });
                            $('#allTable').append(`<tr>
                            <td class="table-secondary">${user.id}</td>
                            <td class="table-secondary">${user.name}</td>
                            <td class="table-secondary">${user.telephone}</td>
                            <td class="table-secondary">${user.password}</td>
                            <td class="table-secondary roleTable" id="rolesTables">
                                <p>${stringRoles}</p>
                            </td>
                            <td class="table-secondary">

                                <button type="button" onclick="
$.get( '/rest/user/${user.id}', function( user ) {
  $('#editFormiddis').val(user.id);
  $('#editFormid').val(user.id);
  $('#editFormname').val(user.name);
  $('#editFormtelephone').val(user.telephone);
  $('#editFormpassword').val(user.password);
  user.role.forEach(function(role, index) {

      if(role.name === 'Admin') {
        $('#editFormrolesAdmin').attr('selected', 'selected')
      }
      else if(role.name === 'User') {
        $('#editFormrolesUser').attr('selected', 'selected')
      }


                            });
});


" class="btn btn-info" data-toggle="modal" data-target="#exampleModalUpdate">
                                    Edit
                                </button>
                            </td>
                            <td class="table-secondary">
                                <!-- Модальное окно удалить юзера -->
                                <div class="modal fade" id="exampleModalDelete${user.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Delete user</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modalAdmin modal-body">
                                                <p>ID</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.id}">
                                                <p>Name</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.name}">
                                                <p>Telephone</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.telephone}">
                                                <p>Roles</p>
                                                <select class="form-control" disabled="disabled" multiple size="2" name="roles">
                                                    <option name="admin">Admin</option>
                                                    <option name="user">User</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <form>
                                                    <input class="idUser" type="hidden" id="delll${user.id}" name="id" value="${user.id}">
                                                    <input type="button" value="Delete" data-dismiss="modal" name="${user.id}" class="btn btn-danger buttonDeleteButton">
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" data-toggle="modal" data-target="#exampleModalDelete${user.id}">
                                    Delete
                                </button>
                            </td>

                        </tr>`);
                        })

                    }
                })
                document.getElementsByClassName('modal-backdrop')[0].remove();

            }
        })
    })
}

//редактирование
var editUser = function () {
    $("#buttonEditUser").click(
        function () {

            $.ajax({
                url: '/rest/user/edit/',
                type: 'PUT',
                data: {
                    id: $('#editFormid').val(),
                    name: $('#editFormname').val(),
                    telephone: $("#editFormtelephone").val(),
                    password: $("#editFormpassword").val(),
                    roles: $("#editFormroles option:selected").text()
                },
                success: function (data) {

                    $("#allTable").empty();
                    $.ajax("/rest/user/all", {

                        success: function (msg) { //msg - то, что придет с сервера, респонз
                            msg.forEach(function (user) {
                                let stringRoles = '';
                                user.role.forEach(function (role, index) {
                                    stringRoles += role.name + " ";
                                });
                                $('#allTable').append(`<tr>
                            <td class="table-secondary">${user.id}</td>
                            <td class="table-secondary">${user.name}</td>
                            <td class="table-secondary">${user.telephone}</td>
                            <td class="table-secondary">${user.password}</td>
                            <td class="table-secondary roleTable" id="rolesTables">
                                <p>${stringRoles}</p>
                            </td>
                            <td class="table-secondary">

                                <button type="button" onclick="
$.get( '/rest/user/${user.id}', function( user ) {
  $('#editFormiddis').val(user.id);
  $('#editFormid').val(user.id);
  $('#editFormname').val(user.name);
  $('#editFormtelephone').val(user.telephone);
  $('#editFormpassword').val(user.password);
  user.role.forEach(function(role, index) {

      if(role.name === 'Admin') {
        $('#editFormrolesAdmin').attr('selected', 'selected')
      }
      else if(role.name === 'User') {
        $('#editFormrolesUser').attr('selected', 'selected')
      }


                            });
});


" class="btn btn-info" data-toggle="modal" data-target="#exampleModalUpdate">
                                    Edit
                                </button>
                            </td>
                            <td class="table-secondary">
                                <!-- Модальное окно удалить юзера -->
                                <div class="modal fade" id="exampleModalDelete${user.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Delete user</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modalAdmin modal-body">
                                                <p>ID</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.id}">
                                                <p>Name</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.name}">
                                                <p>Telephone</p>
                                                <input class="form-control" disabled="disabled" type="text" value="${user.telephone}">
                                                <p>Roles</p>
                                                <select class="form-control" disabled="disabled" multiple size="2" name="roles">
                                                    <option name="admin">Admin</option>
                                                    <option name="user">User</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <form>
                                                    <input class="idUser" type="hidden" id="delll${user.id}" name="id" value="${user.id}">
                                                    <input type="button" value="Delete" data-dismiss="modal" name="${user.id}" class="btn btn-danger buttonDeleteButton">
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" data-toggle="modal" data-target="#exampleModalDelete${user.id}">
                                    Delete
                                </button>
                            </td>

                        </tr>`);
                            })

                        }
                    })

                }
            });
        }
    )
}

var currentUser = function () {
    $.ajax("/rest/user/current", {

        success: function (user) { //msg - то, что придет с сервера, респонз

                let stringRoles = '';
                user.role.forEach(function (role, index) {
                    stringRoles += role.name + " ";

                });
                $('#currentUserName').text(user.name + '\u00a0');
                $('#currentUserRoles').text(stringRoles);
                $('#idUser').text(user.id);
                findUserId();
                soloMenu(user);
        }

    })
}

var findUserId = function () {

    let idUser = $('#idUser').text();
    $.ajax("/rest/user/" + idUser, {

        success: function (msg) { //msg - то, что придет с сервера, респонз
            let stringRoles = '';
            msg.role.forEach(function(role, index) {
                stringRoles += role.name + " ";
            });
            $('#tableUser').append(`<tr>
                    <td class="table-secondary">${msg.id}</td>
                    <td class="table-secondary">${msg.name}</td>
                    <td class="table-secondary">${msg.telephone}</td>
                    <td class="table-secondary">${msg.password}</td>
                    <td class="table-secondary roleTable" id="roleUser">
                        <p>${stringRoles}</p>
                    </td>
                </tr>`);
        }
    })
}

var soloMenu = function (user) {
    let path = window.location.pathname;
    user.role.forEach(function(role, index) {
        if(role.name === 'Admin') {
            $('#entytyDasten').append('<div id="scarletCrazy" class="links btn btn-large btn-primary col-12">\n' +
                '                <a href="admin">Admin</a>\n' +
                '            </div>');
        }
        else if(role.name === 'User') {
            $('#entytyDasten').append('<div id="melonyPotters" class="links btn btn-large btn-primary col-12">\n' +
                '                <a href="user">User</a>\n' +
                '            </div>');
        }
    });
    if(path.includes('admin')){
        $('#melonyPotters').addClass('nonActive');
    }
    else if(path.includes('user')) {
        $('#scarletCrazy').addClass('nonActive');
    }
}
