
#!/bin/bash


kill -9 $(lsof -n -i :3000 | grep LISTEN | awk '{print $2}')
