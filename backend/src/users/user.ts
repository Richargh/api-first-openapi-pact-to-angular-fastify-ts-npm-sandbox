import type {Flavor} from "../common/types/flavor";

export type UserId = Flavor<string, "UserId">

export type User = {
    _id: UserId;
}