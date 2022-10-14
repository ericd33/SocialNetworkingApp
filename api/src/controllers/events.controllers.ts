import { Request, Response } from "express";
const eventSchema = require("../models/event");

export const addEvent = async (req: Request, res: Response) => {
  const { name, date, hour, enabled, content, image, location } = req.body;
  try {
    let event = await new eventSchema();
    if (name.length && date.length && content.length && location.length) {
      event.name = name;
      event.date = date;
      event.hour = hour;
      event.enabled = enabled;
      event.content = content;
      event.image = image;
      event.location = location;
      event.enabled = false;
      await event.save(function (err: any, event: any) {
        if (err) {
          res.send(err);
        }
        console.log(event);
      });
      res.status(200).send("new comment");
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
