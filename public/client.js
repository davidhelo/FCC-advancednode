$(document).ready(function () {
  /*global io*/
  let socket = io();
  
  socket.on('user', function(data) {
    console.log(data);
    $('#num-users').text(`${data.currentUsers} users online`);
    let message = 
      data.username + 
      (data.connected ? ' has joint the chat.' : ' has left the chat.');
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
  });

  socket.on('chat message', function(dataMessage) {
    let message = '<b>' + dataMessage.username +  ': ' + '</b>' + dataMessage.message;
    $('#messages').append($('<li>').html(message));
  });
  
  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
