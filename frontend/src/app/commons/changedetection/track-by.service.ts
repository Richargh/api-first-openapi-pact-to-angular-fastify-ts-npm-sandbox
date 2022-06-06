import {Injectable} from "@angular/core";
import {Entity} from "../types/entity";

@Injectable({
  providedIn: "root"
})
export class TrackByService {
  id<T extends Entity>(index: number, element: T): string {
    return element.id;
  }
}
