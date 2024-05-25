import { UserModel } from "../../src/models/user.model";
import { UserService } from "../../src/services/user.service";

describe("UserService", () => {
  let service: UserService;
  beforeEach(() => (service = new UserService()));

  test("should say", () => {
    const user: UserModel = {
      id: 1,
      email: "you@are.dude",
      name: "Dude",
    };
    expect(service.great(user)).toBe("Hi, Dude!");
  });
});
