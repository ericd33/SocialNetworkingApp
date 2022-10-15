import { Request, Response } from "express";
const eventSchema = require("../models/event");
const userSchema = require("../models/user");

export const addEvent = async (req: Request, res: Response) => {
  const { name, date, hour, content, image, location, idUser } = req.body;

  try {
  const user = await userSchema.findOne({_id:idUser})
    let event = await new eventSchema();
    console.log(user)
    if (name.length && date.length && content.length && location.length) {
      event.author= user._id
      event.avatar = user.image
      event.name = user.name
      event.name = name;
      event.date = date;
      event.hour = hour;
      event.content = content;
      event.image = image;
      event.location = location;
      event.enabled = true;
      const newEvent = await event.save();
      user.events = user.events.concat(newEvent)
      console.log(user)

      await user.save()

      console.log(event);
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
      res.status(201).send("el evento no existe");
      return;
    } else {
      const events = await eventSchema.find({});
      events.length
        ? res.status(200).send(events)
        : res.status(400).send("sin eventos");
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
    console.log(event)
    res.status(200).send(event)
  }catch(e){
    res.status(400).send(e)
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { date, hour, enabled, content, image, location } = req.body;
  try {
    if (date.length) {
      await eventSchema.findOneAndUpdate(
        { _id: id },
        { date: date },
        { new: true }
      );
    }
    if (isNaN(hour) || (hour >= 0 && hour <= 24)) {
      await eventSchema.findOneAndUpdate({ _id: id }, { hour: hour });
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
  const { id,action } = req.query;
  const event = await eventSchema.find({_id: id })
  console.log(event)
  try{switch (action) {
    case "disable":
      if (event.enabled) {
        await userSchema.updateOne({ _id: id },{ enabled: false }
        );
        res.status(200).send("event deleted successfully.");
      } else {
        res.status(400).send("event is already deleted.");
      }
      break;
      case "enable":
        if (!event.enabled) {
          await userSchema.updateOne({ _id: id },{ enabled: true }
          );
          res.status(200).send("event re-enabled successfully.");
        } else {
          res.status(400).send("event is already deleted.");
        }
      break;
    default:
      res.status(400).send('Invalid action request.')
      break;
  }
  }catch (e) {
    res.status(400).send(e);
  }
};
