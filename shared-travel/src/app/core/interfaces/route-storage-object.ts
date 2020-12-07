import { ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

export interface IRouteStorageObject {
    snapshot: ActivatedRouteSnapshot;
    handle: DetachedRouteHandle;
}