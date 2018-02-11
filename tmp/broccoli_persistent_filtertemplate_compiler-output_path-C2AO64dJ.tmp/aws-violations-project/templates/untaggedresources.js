export default Ember.HTMLBars.template({"id":"QdYqWlAo","block":"{\"symbols\":[],\"statements\":[[6,\"h2\"],[9,\"align\",\"center\"],[9,\"style\",\"font-family: 'Nanum Gothic', sans-serif;\"],[7],[0,\"Results for resource violations\"],[8],[0,\"\\n\"],[6,\"hr\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"wrapper\"],[7],[0,\"\\n\\n\\n\"],[6,\"section\"],[9,\"class\",\"columns\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column\"],[9,\"style\",\"background-color:#1a254c;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"align\",\"center\"],[9,\"id\",\"loadingDivvol\"],[7],[6,\"i\"],[9,\"class\",\"fa fa-cog fa-spin fa-3x fa-fw\"],[9,\"style\",\"font-size:80px;color:white;\"],[7],[8],[8],[0,\"\\n    \"],[6,\"h4\"],[9,\"id\",\"uvt\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n   \"],[6,\"p\"],[9,\"id\",\"uvol\"],[9,\"style\",\"color:white; font-family: 'Roboto', sans-serif;\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"column sk-rect sk-rect2\"],[9,\"style\",\"background-color:#434e77;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"align\",\"center\"],[9,\"id\",\"loadingDivec2\"],[7],[6,\"i\"],[9,\"class\",\"fa fa-cog fa-spin fa-3x fa-fw\"],[9,\"style\",\"font-size:80px;color:white;\"],[7],[8],[8],[0,\"\\n    \"],[6,\"h4\"],[9,\"id\",\"uet\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uec2\"],[9,\"class\",\"ldBar\"],[9,\"data-value\",\"50\"],[9,\"style\",\"color:white; font-family: 'Roboto', sans-serif;\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"column sk-rect sk-rect3\"],[9,\"style\",\"background-color:#1a254c;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"align\",\"center\"],[9,\"id\",\"loadingDivuaa\"],[7],[6,\"i\"],[9,\"class\",\"fa fa-cog fa-spin fa-3x fa-fw\"],[9,\"style\",\"font-size:80px;color:white;\"],[7],[8],[8],[0,\"\\n    \"],[6,\"h4\"],[9,\"id\",\"uut\"],[9,\"style\",\"color:white\"],[7],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"id\",\"uaa\"],[9,\"style\",\"color:white; font-family: 'Roboto', sans-serif;\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"footer\"],[7],[0,\"\\n    \"],[6,\"h3\"],[9,\"style\",\"font-family: 'Nanum Gothic', sans-serif;\"],[7],[0,\"Developed By: Matthew L. Trotter\"],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"style\",\"font-family: 'Nanum Gothic', sans-serif;\"],[7],[0,\"This application was written from scratch, no templates or snippet coding was used so this is a beta (dirty) ver. 0.1 release. This beta release; however, is fully functional, bug free and will cleanly locate resource violations within any AWS environment, simply provide an IAM key with the necessary permissions to describe services (read-only) and you are good to go! Further build/installation information can be found at \"],[6,\"a\"],[9,\"href\",\"https://github.com/sudir/aws_violations_project\"],[7],[0,\"my private github site\"],[8],[8],[0,\"\\n  \"],[8],[0,\"\\n  \\n\"],[8],[0,\"\\n\\n\\n\\n\\n\\n\\n\"],[6,\"style\"],[9,\"type\",\"text/css\"],[7],[0,\"\\n@import url(https://fonts.googleapis.com/css?family=Open+Sans);\\n\\nli{list-style-position:inside;}\\n\\n\\n* { box-sizing: border-box; \\noverflow:auto;\\n}\\n\\n\\nbody { \\n  font-family: 'Open Sans', sans-serif;\\n}\\n\\n/* STRUCTURE */\\n\\n.wrapper {\\n  padding: 5px;\\n  max-width: 100%;\\n  width: 95%;\\n  margin: 20px auto;\\n}\\nheader {\\n  padding: 0 15px;\\n}\\n\\n.columns {\\n  display: flex;\\n  flex-flow: row wrap;\\n  justify-content: center;\\n  margin: 5px 0;\\nheight:100%;\\n}\\n\\n.column {\\n  flex: 1;\\n  border: 1px solid gray;\\n  margin: 2px;\\n  padding: 10px;\\n  &:first-child { margin-left: 0; }\\n  &:last-child { margin-right: 0; }\\nheight:100%;\\n  \\n}\\n\\nfooter {\\n  padding: 0 15px;\\n}\\n\\n\\n@media screen and (max-width: 980px) {\\n  .columns .column {\\n    margin-bottom: 5px;\\n    flex-basis: 40%;\\n    &:nth-last-child(2) {\\n      margin-right: 0;\\n    }\\n    &:last-child {\\n      flex-basis: 100%;\\n      margin: 0;\\n    }\\n  }\\n}\\n\\n@media screen and (max-width: 680px) {\\n  .columns .column {\\n    flex-basis: 100%;\\n    margin: 0 0 5px 0;\\n  }\\n}  \\n\\n\\n\\n.sk-wave {\\n  margin: 40px auto;\\n  width: 50px;\\n  height: 40px;\\n  text-align: center;\\n  font-size: 10px; }\\n  .sk-wave .sk-rect {\\n    background-color: #333;\\n    height: 100%;\\n    width: 6px;\\n    display: inline-block;\\n    -webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;\\n            animation: sk-waveStretchDelay 1.2s infinite ease-in-out; }\\n  .sk-wave .sk-rect1 {\\n    -webkit-animation-delay: -1.2s;\\n            animation-delay: -1.2s; }\\n  .sk-wave .sk-rect2 {\\n    -webkit-animation-delay: -1.1s;\\n            animation-delay: -1.1s; }\\n  .sk-wave .sk-rect3 {\\n    -webkit-animation-delay: -1s;\\n            animation-delay: -1s; }\\n  .sk-wave .sk-rect4 {\\n    -webkit-animation-delay: -0.9s;\\n            animation-delay: -0.9s; }\\n  .sk-wave .sk-rect5 {\\n    -webkit-animation-delay: -0.8s;\\n            animation-delay: -0.8s; }\\n@-webkit-keyframes sk-waveStretchDelay {\\n  0%, 40%, 100% {\\n    -webkit-transform: scaleY(0.4);\\n            transform: scaleY(0.4); }\\n  20% {\\n    -webkit-transform: scaleY(1);\\n            transform: scaleY(1); } }\\n@keyframes sk-waveStretchDelay {\\n  0%, 40%, 100% {\\n    -webkit-transform: scaleY(0.4);\\n            transform: scaleY(0.4); }\\n  20% {\\n    -webkit-transform: scaleY(1);\\n            transform: scaleY(1); } }\\n\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}","meta":{"moduleName":"aws-violations-project/templates/untaggedresources.hbs"}});