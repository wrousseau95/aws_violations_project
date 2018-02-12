# aws-violations-project 
#### version 1.0.0 release
<br />

[![Matt Trotter Code Gaurantee](https://img.shields.io/badge/Fully%20Tested-v1.0.0-red.svg)]()

Another awesome application developed by: Matt Trotter
<br />This app has an customizable Ember front-end with an AWS look and feel that commnunicates with a simple python API backend.
Easily communicate with AWS services from a simple UI for reporting unmanaged resources.
Add a restricted IAM key to your `aws configure` cli tool {server side} and let it work its magic
autodiscovering untagged and unassigned resources by this app.

#### Example:
http://52.23.253.231:4200/untaggedresources

## Prerequisites

You will need the following things properly installed on your server.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) 
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [AWS CLI](https://ember-cli.com/)
* [PIP](https://pip.pypa.io/en/stable/installing/)
* [Python Flask](https://pypi.python.org/pypi/Flask)

## Installation

* `git clone https://github.com/sudir/aws_violations_project.git`
* `cd aws-violations-project`
* `npm install` 
* `sudo ./install_dep.sh`

### Be sure to setup your target aws Region/AZ, Only use IAM key with describe permissions
* `aws configure` 
 
## Running Ember Server / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200)

## Running Python Flask API Backend / Development

* `cd inspect_backend_api`
* `python app.py`
* Visit your app at [http://localhost:5000](http://localhost:5000)

### Code Generators
Make use of the many generators for code, try `ember help generate` for more details

## Running Live AWS Audit App
<img src="https://github.com/sudir/aws_violations_project/blob/master/screenshot1.png">
<img src="https://github.com/sudir/aws_violations_project/blob/master/screenshot2.png">

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying
* `ember server --live-reload=false`

## Start the Python Inspect API
* `python aws_violations_project/inspect_backend_api/app.py`

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
