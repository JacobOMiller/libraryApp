namespace Book.Components{

  const name = 'nav';
  const template = '/client/app/components/navbar/navbar.html';
  export class Nav {
    public currentuser;
    public isAuthenticated
  constructor(
    private Session: Book.Services.Session,
    private BookService: Book.Services.BookService,
    private $state:ng.ui.IStateService,
    private UserService: Book.Services.UserService
  ){
    this.BookService.getBooks()
    this.currentuser = this.Session.getUser();
    this.isAuthenticated = this.Session.isAuthenticated();
  }
  logout(){
    this.UserService.logout().then(()=>{
      this.Session.destroy();
      this.$state.go('login',null,{reload: true});
    })
    .catch((e)=>{
      throw new Error(e);
    })
  }
}
  angular.module('book').component(name,{
    templateUrl: template,
    controller: Book.Components.Nav,
    controllerAs: 'vm'
  });
}
