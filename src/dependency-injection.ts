import { container } from "tsyringe";
import { Context, context } from "./contexts/context";
import EventEmitter from "events";

container.register<Context>("Context", { useValue: context });
container.register<EventEmitter>("EventEmitter", {
  useValue: new EventEmitter(),
});
