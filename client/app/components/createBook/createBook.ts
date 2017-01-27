namespace Book.Components {
    //component config
    //movieCard translates to <movie-card movie="vm.movie"></movie-card>
    const name = 'createBook';
    const template = '/client/app/components/createBook/createBook.html';

    export class CreateBook {
        public book;
        constructor(
            private BookService: Book.Services.BookService,
            private $state: ng.ui.IStateService
        ) {
      
        }

        submit() {
            this.BookService.createBook(this.book).then((result) => {
                console.log(result);
                this.$state.go('home');
            }).catch((e) => {
                throw new Error(e);
            })
        }

    }
    angular.module('book').component(name, {
        templateUrl: template,
        controller: Book.Components.CreateBook,
        controllerAs: 'vm'
    });
}
