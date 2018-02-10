import Route from '@ember/routing/route';

export default Route.extend({
});


var vol = new XMLHttpRequest();
vol.open("GET", "http://localhost:5000/get_untagged_volumes", true);
vol.onreadystatechange = function() {
  if (vol.readyState == 4) {
   
  document.getElementById("uvol").innerHTML = vol.responseText;
    
  }
}

vol.send();




var ec2 = new XMLHttpRequest();
ec2.open("GET", "http://localhost:5000/get_untagged_instances", true);
ec2.onreadystatechange = function() {
  if (ec2.readyState == 4) {
   
  document.getElementById("uec2").innerHTML = ec2.responseText;
    
  }
}

ec2.send();


