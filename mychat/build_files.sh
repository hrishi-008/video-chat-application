echo "Build Started"
python3.12.1 -m pip install -r requirements.txt
python3.12.1 manage.py collectstatic  --noinput --clear 
echo "Build Completed"