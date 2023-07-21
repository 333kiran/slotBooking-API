import { checkSlotOverlap, createSlot } from '../Models/slot-model.js'

export const createNewSlot = async(req,res) => {
try{
  const { date, startTime, endTime } = req.body;

  // checking firstly required field is there or not
  if (!date || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if the slot already exists for the given date and time range
  const existingSlot = await slotModel.checkSlotOverlap(date, startTime, endTime);

  if (existingSlot.length > 0) {
    return res.status(409).json({ error: 'Slot overlap detected' });
  }

  // If no overlap, save the slot in the database
  const newSlotId = await slotModel.createSlot(date, startTime, endTime);

  res.status(201).json({ success:true,message: 'Slot created successfully', slotId: newSlotId });

}catch(error){
    console.log("error while creating a slote",error.message);
    res.status(500).json({
        success: false,
        message:error.message
    })
}
}

export const getAvailableSlots = async(req,res) => {
  try{
    const { date } = req.query;

    // checking firstly required field is there or not
    if (!date) {
      return res.status(400).json({ error: 'Missing required date field in query parameters' });
    }

    // Fetch available slots for the given date
    const query = 'SELECT * FROM slots WHERE date = ? AND is_available = true';
    const [availableSlots] = await db.query(query, [date]);
    
    res.status(200).json({
      success:true,
      message:"list fetched successfully",
      data:availableSlots
    })
    
  }catch(error){
    console.log("error while fetching list of available slots ",error.message);
    res.status(500).json({
        success: false,
        message:error.message
    })
  }
}