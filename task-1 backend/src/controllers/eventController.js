import { ObjectId } from "mongodb";
export const createEvent = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await db.collection("events").insertOne(req.body);

    return res.status(201).json({
      success: true,
      message: "event inserted",
      event_id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: `${error.message}`,
    });
  }
};

export const getEventById = async (req, res) => {
  // const {id} = req.params.id
  // console.log(id)
  try {
    const db = req.app.locals.db;
    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "event not found",
      });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: `${error.message}`,
    });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const db = req.app.locals.db;
     const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;
    // const { page = 1, limit = 5 } = req.query;
    const allEvent = await db
      .collection("events")
      .find()
      .skip(skip)
      .limit(Number(limit))
      .toArray();
    if (allEvent.length==0) {
      return res.status(400).json({
        success: false,
        message: "event not found",
      });
    }
    return res.json(allEvent);
  } catch (error) {
    res.status(500).json({
      message: `${error.message}`,
    });
  }
};

export const updateEvent = async (req, res) => {
    try {
    const db = req.app.locals.db;
        await db.collection("events").updateOne({_id:new ObjectId(req.params.id)},
    {$set:req.body})
    return res.status(201).json({
      success: true,
      message: "event updated",
    });
  } catch (error) {
    res.status(500).json({
      message: `${error.message}`,
    });
  }
};

export const deleteEvent = async (req, res) => {
    try {
    const db = req.app.locals.db;
        await db.collection("events").deleteOne({
            _id:new ObjectId(req.params.id)
        })
        res.status(200).json({
            success:true,
            message:"event deleted"
        })
    } catch (error) {
        res.status(500).json({
      message: `${error.message}`,
    });
    }
};
