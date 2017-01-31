namespace Book.Components {
    //component config
    //movieCard translates to <movie-card movie="vm.movie"></movie-card>
    const name = 'bookUpdate';
    const template = '/client/app/components/bookUpdate/bookupdate.html';

    export class UpdateMovie {
        public book;
        constructor(
            private $stateParams,
            private BookService: Book.Services.BookService,
            private $state: ng.ui.IStateService,
            private Session: Book.Services.Session
        ) {
          console.log($stateParams['id']);
          BookService.getBook($stateParams['id']).then((result)=>{
            this.book = result;
          }).catch((e)=>{
            throw new Error(e);
          });
        }

        update() {
            this.BookService.updateBook(this.book).then((result) => {
                console.log(result);
                this.$state.go('home');
            }).catch((e) => {
                throw new Error(e);
            })
        }
        isAuthorized(role){
          return this.Session.isAuthorized(role);
        }

    }
    angular.module('book').component(name, {
        templateUrl: template,
        controller: Book.Components.UpdateMovie,
        controllerAs: 'vm'
    });
}
