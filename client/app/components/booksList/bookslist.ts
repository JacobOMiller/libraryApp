namespace Book.Components {
  const name ='bookList';
  const template='/client/app/components/booksList/bookslist.html';
  export class BookList {
    public books;
    public currentuser;

    constructor(
      private Session: Book.Services.Session,
      private BookService: Book.Services.BookService,
      private $state:ng.ui.IStateService,
      private UserService: Book.Services.UserService
    ){
      this.BookService.getBooks()
      .then((data)=>{
        console.log(data);
        this.books = data;
      }).catch((e)=>{
        console.log('err');
        throw new Error(e);
      })
      this.currentuser = this.Session.getUser();

    }
    goToDetails(id){
      console.log(id);
      this.$state.go('books',{id: id});
    }
  
  }
  angular.module('book').component(name,{
    templateUrl: template,
    controller: Book.Components.BookList,
    controllerAs:'vm'
  });
}
