import db from '../database/db.js';

export const createSlot = async(date, startTime, endTime) => {
  try{
    //step:1 => creating a query to insert data into database
    const query = 'INSERT INTO slots (date, start_time, end_time, is_available) VALUES (?, ?, ?, true)';
    const [result] = await db.promise().query(query, [date, startTime, endTime]);
    //step:2 => checking the result in the terminal
    console.log(result);
    //step:3 => finally return it
    return result.insertId;

  }catch(error){
    //if there is any error log here
    console.log('Error while creating slot', error);
  }
}

export const checkSlotOverlap = async(date, startTime, endTime) => {
  try{
     //step:1 => creating a query to make sure to handle slot overlap 
    const query =
    'SELECT * FROM slots WHERE date = ? AND ((start_time >= ? AND start_time < ?) OR (end_time > ? AND end_time <= ?))';
  const [result] = await db.promise().query(query, [date, startTime, endTime, startTime, endTime]);
   //step:2 => checking the result in the terminal
  console.log(result);
  return result;
  }catch(error){
    //if there is any error log here
    console.log("Error while checking overlap", error);
  }
}