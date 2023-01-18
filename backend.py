import psycopg2

hostname = 'localhost'
database = 'equipment'
username = 'postgres'
pwd = 'password'
port_id = 5432
conn = None
cur = None

try:
   conn = psycopg2.connect(
             host = hostname,
             dbname = database,
             user = username,
             password = pwd,
             port = port_id)

   cur = conn.cursor()

   insert_script = ''' INSERT INTO equipment (category, make, model, serial_number, status, staff)
                        VALUES ( 'Testing', 'From', 'Python', 'Desktop', 'Console', 'Dave' ); '''
   cur.execute(insert_script)

   update_script = "UPDATE equipment SET status = 'Python' WHERE model = 'Test'"
   cur.execute(update_script)

   delete_script = ' DELETE FROM equipment WHERE make = %s'
   delete_record = ('From',)
   cur.execute(delete_script, delete_record)

   conn.commit()
   

except Exception as error:
        print(error)
finally:
    if cur is not None:
        cur.close
    if conn is not None:
        conn.close