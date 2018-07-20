clear
echo "EC2 CPU USAGE REPORT:"
# idle Instances
#!/bin/bash
instances=`aws ec2 describe-instances  --output text --query 'Reservations[*].Instances[*].InstanceId'`
for i in ${instances[*]}
do
STARTDATE=`date +%Y-%m-01`
ENDDATE=`date +%Y-%m-%d`
Average_Sum=`aws cloudwatch get-metric-statistics --metric-name CPUUtilization --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 14400 --namespace AWS/EC2 --statistics Average --dimensions Name=InstanceId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1 | awk -F: '{if($1<2)print$1}'`
if [ -z "$Average_Sum" ]
then
echo "$i - Average cpu usage: `aws cloudwatch get-metric-statistics --metric-name CPUUtilization --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 14400 --namespace AWS/EC2 --statistics Average --dimensions Name=InstanceId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1` Result: normal use"
else
echo "$i - Average cpu usage: `aws cloudwatch get-metric-statistics  --metric-name CPUUtilization --start-time "$STARTDATE"T13:00:00 --end-time "$ENDDATE"T13:00:00 --period 14400 --namespace AWS/EC2 --statistics Average --dimensions Name=InstanceId,Value="$i" | grep Average | awk -v OFS='\t' '{print $2}' | sed 's/,//g' | sort -rn | head -n 1` Alert: idle usage detected for `date +%m-%Y`"
fi
done

# Add space for results
echo "

EBS VOLUME WRITE THROUGHPUT REPORT:"
# idle attached Ebs volumes
#!/bin/bash
volumes=`aws ec2 describe-volumes --query 'Volumes[].[VolumeId, AvailabilityZone, Attachments]' --output text | grep attached | awk -v OFS='\t' '{print $6}'`
for i in ${volumes[*]}
do
STARTDATE=`date +%Y-%m-01`
ENDDATE=`date +%Y-%m-%d`

# If volume returns null for any Sum total, fail-safe check will set Average sum to "0"
Fail_safe=`aws cloudwatch get-metric-statistics --region us-east-1 --metric-name VolumeReadOps --start-time 2018-07-01T12:15:00 --end-time 2018-07-20T12:15:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1`
if [ -z "$Fail_safe" ]
then
Average_Sum="0"
else
Average_Sum=`aws cloudwatch get-metric-statistics --region us-east-1 --metric-name VolumeReadOps --start-time 2018-07-01T12:15:00 --end-time 2018-07-20T12:15:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1 | awk -F: '{if($1<1)print$1}'`
fi

# Average sum is set, lets evaluate
if [ -z "$Average_Sum" ]
then
echo "$i - Average volume usage: `aws cloudwatch get-metric-statistics --region us-east-1 --metric-name VolumeReadOps --start-time 2018-07-01T12:15:00 --end-time 2018-07-20T12:15:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1` Result: normal use"
else
echo "$i - Average volume usage: `aws cloudwatch get-metric-statistics --region us-east-1 --metric-name VolumeReadOps --start-time 2018-07-01T12:15:00 --end-time 2018-07-20T12:15:00 --period 360000 --namespace AWS/EBS --statistics Sum --dimensions Name=VolumeId,Value="$i" | grep Sum | awk -v OFS='\t' '{print $2}'| sed 's/,//g' | sort -rn | head -n 1` Alert: idle usage detected for `date +%m-%Y`"
fi
done
# Add space for results
echo "

SECURITY GROUP USAGE REPORT:"
# Security groups not in-use by ec2
idle_sg=`comm -23  <(aws ec2 describe-security-groups --query 'SecurityGroups[*].GroupId'  --output text | tr '\t' '\n'| sort) <(aws ec2 describe-instances --query 'Reservations[*].Instances[*].SecurityGroups[*].GroupId' --output text | tr '\t' '\n' | sort | uniq)`
if [ -z "$idle_sg" ]
then
echo "No idle Security Groups detected"
else
for i in ${idle_sg[*]}
do
echo "$i - SG average usage: Alert SG possibly idle, not in use by ec2"
done
fi






