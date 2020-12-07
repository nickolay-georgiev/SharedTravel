import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

import { IRouteStorageObject } from '../interfaces/route-storage-object';


Injectable({providedIn: 'root'})
export class CustomRouteReuseStrategy implements RouteReuseStrategy {

    private storedRoutes: { [key: string]: IRouteStorageObject } = {};

    // decides if the route should be stored
    public shouldDetach (route: ActivatedRouteSnapshot): boolean {
        return !!this.getRouteReuseHashIfReusable(route);
    }

    // store the info for the route being destructed in an object of type `IRouteStorageObject` to attach later
    public store (route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const routeHash = this.getRouteReuseHashIfReusable(route);
        if (!routeHash) {
            return;
        }

        let storedRoute: IRouteStorageObject = {
            snapshot: route,
            handle: handle
        };

        this.storedRoutes[routeHash] = storedRoute;
    }

    // decides if the route should be reattached
    public shouldAttach (route: ActivatedRouteSnapshot): boolean {
        const routeHash = this.getRouteReuseHashIfReusable(route);
        if (!routeHash) {
            return false;
        }

        const storedRoute = this.storedRoutes[routeHash];
        return !!(storedRoute && storedRoute.handle);
    }

    // if shouldAttach, return the actual route data for restoration
    public retrieve (route: ActivatedRouteSnapshot): DetachedRouteHandle {
        const routeHash = this.getRouteReuseHashIfReusable(route);

        const storedRoute = routeHash && this.storedRoutes[routeHash];
        return storedRoute ? storedRoute.handle : null;
    }

    public shouldReuseRoute (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // Default angular routeReuseStrategy behaviour
        return future.routeConfig === curr.routeConfig;
    }

    private getRouteReuseHashIfReusable (route: ActivatedRouteSnapshot): string | null {
        const data = this.getRouteAndChildrenData(route);
        return data ? JSON.stringify(data) : null;
    }

    private getRouteAndChildrenData (route: ActivatedRouteSnapshot): Data | null {
        let data = route.data;

        if (!data.shouldReuseRoute) {
            return null;
        }

        let currentRoute = route.firstChild;
        while (currentRoute) {
            data = {
                ...data,
                ...currentRoute.data,
                feature: {
                    ...data.feature,
                    ...currentRoute.data.feature
                }
            };

            currentRoute = currentRoute.firstChild;
        }

        return data.shouldReuseRoute ? data : null;
    }
}
