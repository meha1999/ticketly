
#!/bin/bash


kill -9 $(lsof -n -i :3004 | grep LISTEN | awk '{print $2}')
