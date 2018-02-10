import subprocess
from flask import Flask
from flask_cors import CORS

from subprocess import Popen, PIPE, STDOUT

app = Flask(__name__)
CORS(app)

cors = CORS(app, resources={r"/get_untagged_instances*": {"origins": "*"}})


# ---------------- TAGS -----------------
# Volumes
@app.route("/get_all_volumes")
def get_all_volumes():
 cmd = 'aws ec2 describe-volumes --query "Volumes[].[VolumeId]" --output text'
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output

@app.route("/get_untagged_volumes")
def get_untagged_volumes():
 cmd = "aws ec2 describe-volumes --query 'Volumes[].[VolumeId, Tags]' --output text | grep None | awk '{print $1}'"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output



# Instances
@app.route("/get_all_instances")
def get_all_instances():
 cmd = "aws ec2 describe-instances --query 'Reservations[].Instances[].{ID: InstanceId}' --output text"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output

@app.route("/get_untagged_instances")
def get_untagged_instances():
 cmd = "aws ec2 describe-instances --query 'Reservations[].Instances[].{ID: InstanceId, Tag: Tags[].Key}' --output text | grep -v ROLE | awk '{print $1}'"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output




#--------------------- Unassigned Resources -----------
# Volumes
@app.route("/get_detached_volumes")
def get_detached_volumes():
 cmd = "aws ec2 describe-volumes --query 'Volumes[].[VolumeId, Attachments]' --output text | grep -v attached"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output




if __name__ == '__main__':
    app.run(debug=True)




