#!/bin/bash
wget -c https://bootstrap.pypa.io/get-pip.py
python get-pip.py
pip install awscli
pip install flask
pip install -U flask-cors

