namespace Book {
    angular.module('book', ['ngResource', 'ui.router', 'ngStorage'])
        .config((
            $resourceProvider: ng.resource.IResourceServiceProvider,
            $stateProvider: ng.ui.IStateProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider,
            $locationProvider: ng.ILocationProvider
        ) => {
            $stateProvider

                .state('app', {
                    url: '',
                    template: '<app></app>',
                    abstract: true,
                    resolve: {
                        currentUser: ['Session', (Session) => {
                            return Session.getUser();
                        }],
                        isAuthenticated: ['Session', (Session) => {
                            return Session.isAuthenticated();
                        }],
                        currentNavItem: ['$state', ($state) => {
                            return $state.current.name;
                        }]
                    }
                })
                .state('login', {
                    parent: 'app',
                    url: '/login',
                    template: '<login></login>'
                })
                .state('registration',{
                  parent:'app',
                  url:'/registration',
                  template:'<registration></registration>'
                })
                .state('home', {
                    parent: 'app',
                    url: '/',
                    template: '<book-list></book-list>'
                })
                .state('books', {
                    parent: 'app',
                    url: '/books/:id',
                    template: '<book-detail></book-detail>'
                })
                .state('createBooks', {
                    parent: 'app',
                    url: '/addbook',
                    template: '<create-book></create-book>'
                })
                .state('updateBook', {
                    parent: 'app',
                    url: '/books/update/:id',
                    template: '<book-update></book-update>'
                });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true,
                rewriteLinks: false
            });

            $urlRouterProvider.otherwise('/badrequest');
        })
        .factory('_', ['$window',
            function($window) {
                // place lodash include before angular
                return $window._;
            }
        ])
        .run([
            '$rootScope',
            'UserService',
            '$sessionStorage',
            'Session',
            '$state',
            '_',
            'AUTH_EVENTS',
            (
                $rootScope,
                UserService,
                $sessionStorage,
                Session,
                $state: ng.ui.IStateService,
                _,
                AUTH_EVENTS
            ) => {
                $rootScope.$on('$stateChangeStart', (event, next) => {
                    UserService.getCurrentUser().then((user) => {
                        $sessionStorage.user = user;
                        Session.user = Session.getUser();
                    }).catch((user) => {
                        $sessionStorage.user = user;
                        Session.user = Session.getUser();
                    });
                    let authorizedRoles = !_.isUndefined(next.data, 'authorizedRoles')
                        ? next.data.authorizedRoles : false;
                    if (authorizedRoles && !Session.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        if (Session.isAuthenticated()) {
                            //TODO dialog
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                            $state.go('home');
                        } else {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                            $state.go('home');
                        }
                    }
                });
            }
        ]
        );
}
