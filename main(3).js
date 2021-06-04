$(window).on('load',function(){
    roomname=localStorage.getItem("enter");
    console.log(roomname);
    document.getElementById("roomname").innerHTML='Name of this room is - '+roomname;
    var firebaseConfig = {
        apiKey: "AIzaSyAB9N-LB8tHB070Av61F2TmWtozu2vXjnM",
        authDomain: "faq-of-school-osfd.firebaseapp.com",
        databaseURL: "https://faq-of-school-osfd-default-rtdb.firebaseio.com",
        projectId: "faq-of-school-osfd",
        storageBucket: "faq-of-school-osfd.appspot.com",
        messagingSenderId: "105039666214",
        appId: "1:105039666214:web:c0b9567d1332dbe6291ae7"
      };
      firebase.initializeApp(firebaseConfig);
      getValue();
});

user=localStorage.getItem("username");
room=localStorage.getItem("enter");

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("enter");
  window.location="index.html";
}

function send() {
  img=document.getElementById("URL").value;
  if (img==null) {
    img="img";  
  }
  m=document.getElementById("message").value
  firebase.database().ref(room).push({
        users:user,
       message:m,
       like:0,
       imageURL:img
      });
document.getElementById("message").value="";
 
  firebase.database().ref("/"+room).on('value',function(snapshot){
    document.getElementById("chat").innerHTML="";
    snapshot.forEach(function(childSnapshot){
       childKey=childSnapshot.key;
       childData=childSnapshot.val();
      if (childKey != "purpose") {
          messageID=childKey;
          messageData=childData;
          users=messageData['users'];
          message=messageData['message'];
          like=messageData['like'];
          imageURL=messageData['imageURL'];
          if (imageURL=="") {
            console.log("imageURL=empty");
            document.getElementById("chat").innerHTML=document.getElementById("chat").innerHTML+'<h3 id="inf"> Username- '+users+'</h3><h3 id="inf">Message- '+message+'</h3><button class="btn btn-success" id="'+messageID+'" onclick="likes(this.id)" value="'+like+'">Like: '+like+'</button><hr>';
          }
          else {
            console.log("imageURL=empty");
            document.getElementById("chat").innerHTML=document.getElementById("chat").innerHTML+'<h3 id="inf"> Username- '+users+'</h3><img style="width:30%;height:30%" src="'+imageURL+'"><h3 id="inf">Message- '+message+'</h3><button class="btn btn-success" id="'+messageID+'" onclick="likes(this.id)" value="'+like+'">Like: '+like+'</button><hr>';
          }       
        }
  });
});
}

function getValue() {
  
  firebase.database().ref("/"+room).on('value',function(snapshot){
    document.getElementById("chat").innerHTML="";
    snapshot.forEach(function(childSnapshot){
       childKey=childSnapshot.key;
       childData=childSnapshot.val();
      if (childKey != "purpose") {
          messageID=childKey;
          messageData=childData;
          users=messageData['users'];
          message=messageData['message'];
          like=messageData['like'];
          imageURL=messageData['imageURL'];
          if (imageURL==null) {
            console.log("imageURL=empty");
            document.getElementById("chat").innerHTML=document.getElementById("chat").innerHTML+'<h3 id="inf"> Username- '+users+'</h3><h3 id="inf">Message- '+message+'</h3><button class="btn btn-success" id="'+messageID+'" onclick="likes(this.id)" value="'+like+'">Like: '+like+'</button><hr>';
          }
          else {
            console.log("imageURL");
            document.getElementById("chat").innerHTML=document.getElementById("chat").innerHTML+'<h3 id="inf"> Username- '+users+'</h3><img style="width:30%;height:30%" src="'+imageURL+'"><h3 id="inf">Message- '+message+'</h3><button class="btn btn-success" id="'+messageID+'" onclick="likes(this.id)" value="'+like+'">Like: '+like+'</button><hr>';
          }
       }
  });
});
}

function likes(message_id) {
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	like = document.getElementById(button_id).value;
	updated_likes = Number(like) + 1;
	console.log(updated_likes);

	firebase.database().ref(room).child(message_id).update({
		like : updated_likes  
	 });
}
