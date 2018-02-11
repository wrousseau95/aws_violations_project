define("aws-violations-project/routes/untaggedresources", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});

  // I wrote this non-asynchronus to get untagged volumes and it caused problems
  //var vol = new XMLHttpRequest();
  //vol.open("GET", "http://localhost:5000/get_untagged_volumes", true);
  //vol.onreadystatechange = function () {
  //  if (vol.readyState == 4) {   
  //var vol_parse =(vol.responseText.replace( /\n/g, " " ).split( " " ));
  //  var arrayvol = vol_parse.filter(function(e){ return e === 0 || e });
  //
  //		var ul = document.createElement('ul');
  //	document.getElementById('uvol').appendChild(ul);
  //
  //		arrayvol.forEach(function(name){
  //			var li = document.createElement('li');
  //			ul.appendChild(li);
  //			li.innerHTML += name;
  //		});
  //}
  //}
  //vol.send()
  // Here is the asynchronus version for getting untagged volumes :-) 
  function get_untag_vol(url, callback) {
    var volRequest = new XMLHttpRequest();
    volRequest.onreadystatechange = function () {
      if (volRequest.readyState === 4 && volRequest.status === 200) {
        callback.call(volRequest.responseXML);
        setTimeout(function () {
          // calling callback function
          var vol_parse = volRequest.responseText.replace(/\n/g, " ").split(" ");
          var arrayvol = vol_parse.filter(function (e) {
            return e === 0 || e;
          });

          function isEmpty(obj) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) return false;
            }
            return true;
          }
          if (isEmpty(arrayvol)) {
            document.getElementById("uvt").innerHTML = "<h3>Awesome! None Untagged</h3>";
            document.getElementById("uvol").innerHTML = "<h3>Awesome! None Untagged</h3>";
          } else {
            // Object is NOT empty
            var ul = document.createElement('ul');
            document.getElementById("uvt").innerHTML = "<h4>Warning: Untagged volumes found</h4>";
            document.getElementById('uvol').appendChild(ul);
            arrayvol.forEach(function (name) {
              var li = document.createElement('li');
              ul.appendChild(li);
              li.innerHTML += name;
            });
          };
        }, 800);
      }
    };
    volRequest.open('GET', url, true);
    volRequest.send();
  }

  // Here is the asynchronus version for getting untagged instances :-) 
  function get_untag_ec2(url, callback) {
    var ec2Request = new XMLHttpRequest();
    ec2Request.onreadystatechange = function () {
      if (ec2Request.readyState === 4 && ec2Request.status === 200) {
        callback.call(ec2Request.responseXML);

        // calling callback function
        var ec2_parse = ec2Request.responseText.replace(/\n/g, " ").split(" ");
        var arrayec2 = ec2_parse.filter(function (e) {
          return e === 0 || e;
        });

        var ul = document.createElement('ul');
        document.getElementById('uec2').appendChild(ul);

        arrayec2.forEach(function (name) {
          var li = document.createElement('li');
          ul.appendChild(li);
          li.innerHTML += name;
        });
      }
    };
    ec2Request.open('GET', url, true);
    ec2Request.send();
  }

  // calling Async functions
  get_untag_vol("http://localhost:5000/get_untagged_volumes", function () {});
  get_untag_ec2("http://localhost:5000/get_untagged_instances", function () {});
});