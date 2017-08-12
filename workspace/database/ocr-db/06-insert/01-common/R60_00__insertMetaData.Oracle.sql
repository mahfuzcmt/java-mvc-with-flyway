/*
------------------------------------------------------------------------------
M E T A   D A T A
------------------------------------------------------------------------------
*/

--  MetaProperty
 
Insert into MetaProperty (OID, valueJSON, description) values ('SA','{"children":[{"id":"webMenu","url":"webMenu","text":"Web Menu","enable":true,"children":[{"id":"dashboard","url":"dashboard","text":"Dashboard","enable":true,"settings":[],"children":[]},{"id":"recognizer","url":"recognizer","text":"Recognizer","enable":true,"settings":[],"children":[]}]}]}','All the menu and features are by default false');

-- Role
insert into Role (roleID, roleDescription, featureJSON) values ('SA', 'Super Admin', '{"children":[{"id":"webMenu","url":"webMenu","text":"Web Menu","enable":true,"children":[{"id":"dashboard","url":"dashboard","text":"Dashboard","enable":true,"settings":[],"children":[]},{"id":"recognizer","url":"recognizer","text":"Recognizer","enable":true,"settings":[],"children":[]}]}]}');

-- Login
insert into Login (loginID, roleID,  featureJSON, password, status, name, imagePath, createdBy) values ('admin', 'SA', '{"children":[{"id":"webMenu","url":"webMenu","text":"Web Menu","enable":true,"children":[{"id":"dashboard","url":"dashboard","text":"Dashboard","enable":true,"settings":[],"children":[]},{"id":"recognizer","url":"recognizer","text":"Recognizer","enable":true,"settings":[],"children":[]}]}]}', 'ffkrBjqMAog=', 'A', 'Mahfuz Ahmed', 'images/user/mc.png', 'ocr');
commit;

