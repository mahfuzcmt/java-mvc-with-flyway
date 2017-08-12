


/*
------------------------------------------------------------------------------
S E C U R I T Y   D A T A
------------------------------------------------------------------------------
*/

/*
Login roles
roleID								: Primary Key
roleDescription						: Description of the role
featureJSON							: Privileges for this role as JSON Data
*/
create table						Role
(
roleID								varchar(64)				not null,
roleType							varchar(16),
roleDescription						varchar(128),
featureJSON							text					not null,
-- For Audit
createdBy							varchar(64)				default 		user,
createdOn							date					default 		current_timestamp,
updatedBy							varchar(64),
updatedOn							date,
constraint							p_Role					primary key		(roleID)
); 


/*
Logins
loginID								: Primary Key
roleID								: User role from Role table roleID
featureJSON							: Privileges for this user as JSON Data.
status								: (A)Active, (I)Inactive
*/
create table						Login
(
loginID								varchar(64)				not null,
roleID								varchar(64)				not null,
featureJSON							text					not null,
password							varchar(100)			not null,
status								varchar(2)				not null,
name								varchar(100),
phoneNo								varchar(64),
email								varchar(64),
imagePath							varchar(128),
dataJSON							text,
-- For Audit
createdBy							varchar(64)				default 		user,
createdOn							date					default 		current_timestamp,
updatedBy							varchar(64),
updatedOn							date,
constraint							f_roleID_Login			foreign key		(roleID)
															references	Role(roleID),
constraint							c_status_Login			check			(status = 'A' or status = 'I'),
constraint							p_Login					primary key		(loginID)
); 

