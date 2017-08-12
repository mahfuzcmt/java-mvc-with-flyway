-- For Windows
-- set environment
set HOST="127.0.0.1"
set PORT="5432"

set PG_HOME=C:\Program Files\PostgreSQL\9.3\bin
set PATH=%PATH%;%PG_HOME%

set SCRIPT_PATH="D:/user/sharafat/Personal/tjcrepo/badc-erp/Workspace/Database/PostgreSQL"

cd %PG_HOME%

-- login as postgres user
psql.exe -h %HOST% -p %PORT% -d postgres -U postgres

-- run this within psql to create metrica user, metrica database and associate metrica user with metrica database
create user ocr password 'ocr';
create database ocr WITH owner=ocr encoding='UTF8';
ALTER USER ocr WITH SUPERUSER;
\q

-- now login with user metrica
psql.exe --set=scriptPath="%SCRIPT_PATH%" -h %HOST% -p %PORT% -d metrica -U metrica

-- run the scripts
\o :scriptPath/output.log
\i :scriptPath/10-createBaseObjects.PostgreSQL.sql
\i :scriptPath/11-createProcessObjects.PostgreSQL.sql
\i :scriptPath/50-insertBaseData.PostgreSQL.sql
\i :scriptPath/51-insertProcessData.PostgreSQL.sql
\q

---For Linux
-- Set environment
export PG_HOME="/opt/PostgreSQL/9.3"
export PATH=$PATH:$PG_HOME/bin

--References
https://www.digitalocean.com/community/tutorials/how-to-use-roles-and-manage-grant-permissions-in-postgresql-on-a-vps--2
