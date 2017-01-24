echo "Cloning $1"
git clone $1 temp
cd /home/ec2-user/temp/
echo "Changed to cloned directory"
for d in */;
 do
  echo "Change to subfolder $d"
  cd $d
  echo "npm installing"
  npm install
  echo "Zipping lambda function"
  zip -r /home/ec2-user/${PWD##*/}.zip **
  echo "Change to parentfolder"
  cd ..
 done
cd
echo "Changed to home"
for d in *.zip;
 do
  s=${d##*/}
  aws lambda update-function-code --function-name ${s%.zip} --zip-file fileb://$s
  echo "Updated $d lambda code"
  v=$(aws lambda publish-version --function-name ${s%.zip} --query='Version')
  echo "Published new version"
  aws lambda update-alias --function-name ${s%.zip} --name $2 --function-version $v
  echo "Updated alias for lambda $2"
 done
rm -r /home/ec2-user/temp
echo "Removed folder temp"
rm /home/ec2-user/*.zip
echo "Removed lambda zip files"
