import "reflect-metadata";
import { Container } from "inversify";
import { UserService } from "./Components/Redux/User/UserService";
import { RideService } from "./Components/Redux/Ride/RideService";
//import {Types} from "./Components/Interfaces";
import { TYPES } from "./Components/Types";
import UserActions from "./Components/Redux/User/UserActions";
import RideActions from "./Components/Redux/Ride/RideActions";

let container = new Container();
container.bind<RideService>(TYPES.RideService).to(RideService);
//.inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService);
// .inSingletonScope();
container.bind<UserActions>(TYPES.UserActions).to(UserActions);
container.bind<RideActions>(TYPES.RideActions).to(RideActions);

export { container };
