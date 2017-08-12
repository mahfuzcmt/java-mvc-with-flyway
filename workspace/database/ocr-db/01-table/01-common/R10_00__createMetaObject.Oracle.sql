

/*
MetaProperty
valueJSON							: []
description							: Description of Value JSON
*/
create table 						MetaProperty
(
OID 								varchar(64)				not null,
valueJSON							text					not null,
description							varchar(64),	
-- For Audit
createdBy							varchar(64)				default 		user,
createdOn							date					default 		current_timestamp,
updatedBy							varchar(64),
updatedOn							date,
constraint 							p_MetaProperty			primary key 	(OID)
);
