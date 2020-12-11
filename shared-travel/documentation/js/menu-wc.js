'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">shared-travel documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-0991bea2a62339c3dfd396097b09f8a2"' : 'data-target="#xs-components-links-module-AppModule-0991bea2a62339c3dfd396097b09f8a2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0991bea2a62339c3dfd396097b09f8a2"' :
                                            'id="xs-components-links-module-AppModule-0991bea2a62339c3dfd396097b09f8a2"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-e54436454983ce638282a70be8c42d75"' : 'data-target="#xs-components-links-module-AuthModule-e54436454983ce638282a70be8c42d75"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-e54436454983ce638282a70be8c42d75"' :
                                            'id="xs-components-links-module-AuthModule-e54436454983ce638282a70be8c42d75"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' : 'data-target="#xs-directives-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' :
                                        'id="xs-directives-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' }>
                                        <li class="link">
                                            <a href="directives/HideElementDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">HideElementDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ReadOnlyDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReadOnlyDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' : 'data-target="#xs-pipes-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' :
                                            'id="xs-pipes-links-module-CoreModule-2a18f73f951f7f9c7a0d3d99896bb422"' }>
                                            <li class="link">
                                                <a href="pipes/TransformUsernamePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TransformUsernamePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-3e6c3df234afad2191ee299808703359"' : 'data-target="#xs-components-links-module-HomeModule-3e6c3df234afad2191ee299808703359"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-3e6c3df234afad2191ee299808703359"' :
                                            'id="xs-components-links-module-HomeModule-3e6c3df234afad2191ee299808703359"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageTripComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageTripComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-d45721662f585a6a2b3414055ee432de"' : 'data-target="#xs-components-links-module-SharedModule-d45721662f585a6a2b3414055ee432de"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-d45721662f585a6a2b3414055ee432de"' :
                                            'id="xs-components-links-module-SharedModule-d45721662f585a6a2b3414055ee432de"' }>
                                            <li class="link">
                                                <a href="components/NavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TripModule.html" data-type="entity-link">TripModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TripModule-10c2961deda8c72aff54c8d77cd69151"' : 'data-target="#xs-components-links-module-TripModule-10c2961deda8c72aff54c8d77cd69151"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TripModule-10c2961deda8c72aff54c8d77cd69151"' :
                                            'id="xs-components-links-module-TripModule-10c2961deda8c72aff54c8d77cd69151"' }>
                                            <li class="link">
                                                <a href="components/TripComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TripComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TripCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TripDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TripEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TripListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripMembersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TripMembersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripSearchFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TripSearchFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TripRoutingModule.html" data-type="entity-link">TripRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-49a622fa6251dced44371c45b1f42211"' : 'data-target="#xs-components-links-module-UserModule-49a622fa6251dced44371c45b1f42211"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-49a622fa6251dced44371c45b1f42211"' :
                                            'id="xs-components-links-module-UserModule-49a622fa6251dced44371c45b1f42211"' }>
                                            <li class="link">
                                                <a href="components/UserMessageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserMessagesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserMessagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserNotificationFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserNotificationFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserTripComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserTripComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserUploadPhotoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserUploadPhotoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link">UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomRouteReuseStrategy.html" data-type="entity-link">CustomRouteReuseStrategy</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TripService.html" data-type="entity-link">TripService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserResolver.html" data-type="entity-link">UserResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IMessage.html" data-type="entity-link">IMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRouteStorageObject.html" data-type="entity-link">IRouteStorageObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITrip.html" data-type="entity-link">ITrip</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});