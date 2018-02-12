// Written by: Matthew Trotter (The King of Coding)
import Route from '@ember/routing/route';


 export default Route.extend({
});




// Async function for General Info
function get_geninfo(url, callback) {
   var geninfoRequest = new XMLHttpRequest();
  geninfoRequest.onreadystatechange = function() {
    if (geninfoRequest.readyState === 4 &&
      geninfoRequest.status === 200) {
      callback.call(geninfoRequest.responseXML);
      // calling callback function
document.getElementById("geninfo").innerHTML ='<h2>Results for resource violations</h2>'+'<i class="fab fa-aws" style="font-size:3em; color:orange;"></i>'+'<br />'+'Audit Executed:'+' '+'<b>'+Date()+'</b>'+'<br />'+'Default VPC Detected:'+' '+'<b>'+geninfoRequest.responseText+'</b>';
   
}
};

  geninfoRequest.open('GET', url, true);
  geninfoRequest.send();
}


// Async function for finding untagged Volumes
// Async function for default VPC and general information -- I love info
function get_untag_vol(url, callback) {
   var volRequest = new XMLHttpRequest();
  volRequest.onreadystatechange = function() {
    if (volRequest.readyState === 4 &&
      volRequest.status === 200) {
      callback.call(volRequest.responseXML);
   setTimeout(function(){  
      // calling callback function
  var vol_parse =(volRequest.responseText.replace( /\n/g, " " ).split( " " ));
  var arrayvol = vol_parse.filter(function(e){ return e === 0 || e });

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

if(isEmpty(arrayvol)) { 
$('#loadingDivvol').remove();
document.getElementById("uvt").innerHTML ='<i class="fa fa-check"></i>'+' '+"All volumes successfully tagged";  
document.getElementById("uvol").innerHTML = "This means that you have no violations<br />"+" "+"To load again, refresh this page.";

} else {
    // Object is NOT empty
	var ul = document.createElement('ul');
$('#loadingDivvol').remove();
document.getElementById("uvt").innerHTML ='<i class="fa fa-exclamation-triangle"></i>'+' '+"Warning: Untagged volumes"+'<br />'+'Total Objects:'+' '+arrayvol.length;
	document.getElementById('uvol').appendChild(ul);
		arrayvol.forEach(function(name){
			var li = document.createElement('li');
			ul.appendChild(li);
			li.innerHTML += name;
		})
   }; 
	}, 800);	
    }
  };
  volRequest.open('GET', url, true);
  volRequest.send();
}


// Async callback for finding untagged Ec2 Instances
function get_untag_ec2(url, callback) {
   var ec2Request = new XMLHttpRequest();
  ec2Request.onreadystatechange = function() {
    if (ec2Request.readyState === 4 &&
      ec2Request.status === 200) {
      callback.call(ec2Request.responseXML);
   setTimeout(function(){  
      // calling callback function
  var ec2_parse =(ec2Request.responseText.replace( /\n/g, " " ).split( " " ));
  var arrayec2 = ec2_parse.filter(function(e){ return e === 0 || e });

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
if(isEmpty(arrayec2)) { 
$('#loadingDivec2').remove();
document.getElementById("uet").innerHTML ='<i class="fa fa-check"></i>'+' '+"All instances successfully tagged";  
document.getElementById("uec2").innerHTML ="This means that you have no violations<br />"+" "+"To load again, refresh this page.";

} else {
    // Object is NOT empty
  var ul = document.createElement('ul');
$('#loadingDivec2').remove();
document.getElementById("uet").innerHTML='<i class="fa fa-exclamation-triangle"></i>'+' '+"Warning: Untagged instances"+'<br />'+'Total Objects:'+' '+arrayec2.length;
  document.getElementById('uec2').appendChild(ul);
    arrayec2.forEach(function(name){
      var li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += name;
    })
   }; 
  }, 10);  
    }
  };
  ec2Request.open('GET', url, true);
  ec2Request.send();
}


// Async callback for finding unattached volumes
function get_unat_vol(url, callback) {
   var unvolRequest = new XMLHttpRequest();
  unvolRequest.onreadystatechange = function() {
    if (unvolRequest.readyState === 4 &&
      unvolRequest.status === 200) {
      callback.call(unvolRequest.responseXML);
   setTimeout(function(){  
      // calling callback function
  var unvol_parse =(unvolRequest.responseText.replace( /\n/g, " " ).split( " " ));
  var arrayunvol = unvol_parse.filter(function(e){ return e === 0 || e });

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
if(isEmpty(arrayunvol)) { 
$('#loadingDivuaa').remove();
document.getElementById("uut").innerHTML ='<i class="fa fa-check"></i>'+' '+"All volumes successfully attached"; 
document.getElementById("uaa").innerHTML ="This means that you have no violations<br />"+" "+"To load again, refresh this page.";

} else {
    // Object is NOT empty
  var ul = document.createElement('ul');
$('#loadingDivuaa').remove();
document.getElementById("uut").innerHTML ='<i class="fa fa-exclamation-triangle"></i>'+' '+"Warning: Unattached volumes"+'<br />'+'Total Objects:'+' '+arrayunvol.length;
  document.getElementById('uaa').appendChild(ul);
    arrayunvol.forEach(function(name){
      var li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += name;
    })
   }; 
  }, 10);  
    }
  };
  unvolRequest.open('GET', url, true);
  unvolRequest.send();
}


// Callback functions are perfect for the non io blocking API calls I need to make
// calling Async functions
//
get_geninfo("http://52.23.253.231/get_default_vpc", function(){
});
get_untag_vol("http://52.23.253.231/get_untagged_volumes", function() {
});
get_untag_ec2("http://52.23.253.231/get_untagged_instances", function() { 
});
get_unat_vol("http://52.23.253.231/get_detached_volumes", function() { 
});

