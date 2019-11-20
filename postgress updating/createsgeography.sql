-- ALTER TABLE stops_table
-- ADD COLUMN GeoLocation geography(POINT);

UPDATE stops_table
SET GeoLocation =  ST_SetSRID(ST_MakePoint(lon::double precision, lat::double precision), 4326);