-- FUNCTION: public.stops_geojson()

-- DROP FUNCTION public.stops_geojson();

CREATE OR REPLACE FUNCTION public.stops_geojson(
	)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
    
AS $BODY$
		SELECT 	row_to_json(fc)as myoutput 
			FROM (
				SELECT 'FeatureCollection' As type, 
						array_to_json(array_agg(f)) As features
				FROM 
					(
					SELECT
						'Feature' As type, 
						ST_AsGeoJSON(lg.geolocation)::json As geometry, 
						row_to_json(lp) As properties
					FROM 
						stops_table As lg 
					INNER JOIN 
						(
						SELECT 
							stop_id, 
							stop_name,
							station_name,
							station_descriptive_name,
							map_id
							
						FROM 
							stops_table
					) As lp 
				ON lg.stop_id = lp.stop_id 
			) As f 
	)  As fc
	$BODY$;

ALTER FUNCTION public.stops_geojson()
    OWNER TO postgres;
