import { Request, Response } from "express";
const eventSchema = require("../models/event");
const userSchema = require("../models/user");

export const addEvent = async (req: Request, res: Response) => {
  const { name, username, date, content, image, location, email,lat_log,avatar, type} = req.body;
  try {
  const user = await userSchema.findOne({email:email})
  console.log('creating event')
    let event = await new eventSchema();
    if (name.length && date.length && content.length && location.length && lat_log.length && type.length) {
      event.type= type
      event.author= email
      event.avatar = avatar
      event.nameAuthor = username
      event.name = name;
      event.date = date;
      event.content = content;
      event.image = image;
      event.location = location;
      event.enabled = true;
      event.lat_log=lat_log
      const newEvent = await event.save();
      user.events = user.events.concat(newEvent)
      await user.save()
      res.status(200).send("new event");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const findEvent = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    if (name) {
      const event = await eventSchema.find({
        name: { $regex: name, $options: "ig" },
      });
      if (event.length) {
        res.status(200).send(event);
        return;
      }
      res.status(201).send(undefined);
      return;
    } else {
      const events = await eventSchema.find({});
      events.length
        ? res.status(200).send(events)
        : res.status(400).send(undefined);
    }
  } catch (e) {
    res.status(400).send(e);
    return;
  }
};

export const findEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
    const event = await eventSchema.findOne({_id:id})
    res.status(200).send(event)
  }catch(e){
    res.status(400).send(e)
  }
}

export const findEventByAuthor = async (req: Request, res: Response) => {
  const { author } = req.params;
  try{
    const events = await eventSchema.find({author:author})
    res.status(200).send(events)
  }catch(e){
    res.status(400).send(e)
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { date, enabled, content, image, location } = req.body;
  try {
    if (date.length) {
      await eventSchema.findOneAndUpdate(
        { _id: id },
        { date: date },
        { new: true }
      );
    }
    if (enabled) {
      await eventSchema.findOneAndUpdate(
        { _id: id },
        { enabled: true },
        { new: true }
      );
    }
    if (content?.length) {
      await eventSchema.findOneAndUpdate(
        { _id: id },
        { content: content },
        { new: true }
      );
    }
    if (image?.length) {
      await eventSchema.findOneAndUpdate(
        { _id: id },
        { image: image },
        { new: true }
      );
    }
    if (location?.length) {
      await eventSchema.findOneAndUpdate(
        { _id: id },
        { location: location },
        { new: true }
      );
    }
    res.status(200).send("datos actualizados");
  } catch (e) {
    res.status(400).send(e);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { action,id } = req.body;
  const event = await eventSchema.findOne({_id: id })
 try{switch (action) {
      case "disable":
        if (event.enabled) {
          await eventSchema.updateOne({ _id: id }, { enabled: false });
          res.status(200).send("Post deleted successfully.");
        } else {
          res.status(400).send("Post is already deleted.");
        }
        break;
      case "enable":
        if (!event.enabled) {
          await eventSchema.updateOne({ _id: id }, { enabled: true });
          res.status(200).send("Post re-enabled successfully.");
        } else {
          res.status(400).send("Post is already deleted.");
        }
        break;
      default:
        res.status(400).send("Invalid action request.");
        break;
  }
  }catch (e) {
    res.status(400).send(e);
  }
};


export const addEventParticipant = async (req: Request, res: Response) => {
  try {
    const { idEvent } = req.params;
    const { idUser } = req.body;

    const user = await userSchema.findOne({ _id: idUser });
    const currentEvent = await eventSchema.findOne({ _id: idEvent });

    if (user) {
      currentEvent.participants.push(user._id);

      const eventUpdated = await eventSchema.findByIdAndUpdate({_id: idEvent}, currentEvent, {new: true});

      return res.status(200).json({
        data: eventUpdated,
      });
    }

    return res.status(404).json({
      data: currentEvent,
      msg: `User don't exist`
    });
  } catch (error) {
    return res.status(500).json({
      msg: `An error ocurred (┬┬﹏┬┬)`,
      error
    });
  }

}
