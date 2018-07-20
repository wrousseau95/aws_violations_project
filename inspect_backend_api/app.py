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
 cmd = 'aws ec2 describe-volumes --query "Volumes[].[VolumeId, AvailabilityZone]" --output text'
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output

@app.route("/get_untagged_volumes")
def get_untagged_volumes():
 cmd = "aws ec2 describe-volumes --query 'Volumes[].[VolumeId, AvailabilityZone, Tags]' --output text | grep None | awk -v OFS='\t' '{print $1,  $2}'"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output



# Instances
@app.route("/get_all_instances")
def get_all_instances():
 cmd = "aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId, State.Name, Placement.AvailabilityZone]' --output text"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output

@app.route("/get_untagged_instances")
def get_untagged_instances():
 cmd = "aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId, Placement.AvailabilityZone, Tags[].Key]' --output text | grep None | awk -v OFS='\t' '{print $1,  $2}'"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output




#--------------------- Unassigned Resources -----------
# Volumes
@app.route("/get_detached_volumes")
def get_detached_volumes():
 cmd = "aws ec2 describe-volumes --query 'Volumes[].[VolumeId, AvailabilityZone, Attachments]' --output text | sed -s 'N;/attached/!P;D' | grep -v 'attached'"
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output


#------------------ General Account Information 
@app.route("/get_default_vpc")
def get_default_vpc():
 cmd = "aws ec2 describe-account-attributes --attribute-names default-vpc --output text | grep 'vpc-' | awk -v OFS='\t' '{print $2}'"
 p = Popen(cmd,  shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output


#--------------------- Detect Unused/Idle Resources -----------
# idle Instances
@app.route("/get_idle_instances")
def get_idle_instances():
 cmd = """instances=`aws ec2 describe-instances  --output text --query 'Reservations[*].Instances[*].InstanceId'` && for i in ${instances[*]}; do STARTDATE=`date +%Y-%m-01`; ENDDATE=`date +%Y-%m-%d`; Average_Sum=`aws cloudwatch get-metric-statistics --metric-name CPUUtilization --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 14400 --namespace AWS/EC2 --statistics Average --dimensions Name=InstanceId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1 | awk -F: '{if($1<2)print$1}'`; if [ -z "$Average_Sum" ]; then echo "$i - Average cpu usage: `aws cloudwatch get-metric-statistics --metric-name CPUUtilization --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 14400 --namespace AWS/EC2 --statistics Average --dimensions Name=InstanceId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1` Result: normal use"; else echo "$i - Average cpu usage: `aws cloudwatch get-metric-statistics  --metric-name CPUUtilization --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 14400 --namespace AWS/EC2 --statistics Average --dimensions Name=InstanceId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1` Alert: idle usage detected for `date +%m-%Y`"; fi; done"""
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output

# idle Volumes
@app.route("/get_idle_volumes")
def get_idle_volumes():
 cmd = """volumes=`aws ec2 describe-volumes --query 'Volumes[].[VolumeId, AvailabilityZone, Attachments]' --output text | grep attached | awk -v OFS='\t' '{print $6}'` && for i in ${volumes[*]}
do
STARTDATE=`date +%Y-%m-01`
ENDDATE=`date +%Y-%m-%d`

# If volume returns null for any Sum total, fail-safe check will set Average sum to "0"
Fail_safe=`aws cloudwatch get-metric-statistics  --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00  --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1`
if [ -z "$Fail_safe" ]
then
Average_Sum="0"
else
Average_Sum=`aws cloudwatch get-metric-statistics  --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1 | awk -F: '{if($1<1)print$1}'`
fi
# Average sum is set, lets evaluate
if [ -z "$Average_Sum" ]
then
echo "$i - Average volume usage: `aws cloudwatch get-metric-statistics  --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1` Result: normal use"
else
echo "$i - Average volume usage: `aws cloudwatch get-metric-statistics  --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1` Alert: idle usage detected for `date +%m-%Y`"
fi
done"""
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output

# idle DB Connections
@app.route("/get_idle_dbs")
def get_idle_dbs():
 cmd = """detected_dbs=`aws rds describe-db-instances --output text --query 'DBInstances[*].DBInstanceIdentifier'` &&
if [ -z "$detected_dbs" ]
then
echo "No DB detected" > /dev/null
else
for i in ${detected_dbs[*]}
do
STARTDATE=`date +%Y-%m-01`
ENDDATE=`date +%Y-%m-%d`
# If RDS queries returns null for sum total, fail-safe check will set Average sum to "0"
Fail_safe=`aws cloudwatch get-metric-statistics --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1`
if [ -z "$Fail_safe" ]
then
Average_Sum="0"
else
Average_Sum=`aws cloudwatch get-metric-statistics --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1 | awk -F: '{if($1<2)print$1}'`
fi
# Average sum is set, lets evaluate
if [ -z "$Average_Sum" ]
then
echo "$i - Average dbconnections usage: `aws cloudwatch get-metric-statistics --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1` Result: normal use"
else
echo "$i - Average dbconnections usage: `aws cloudwatch get-metric-statistics --metric-name VolumeReadOps --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1` Alert: idle db connectivity detected for `date +%m-%Y`"
fi
done
fi"""
 p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True)
 output = p.stdout.read()
 return output








if __name__ == '__main__':
    app.run(debug=True)



