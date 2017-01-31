namespace Book.Components {
  const name ='login';
  const template = '/client/app/components/login/login.html';
  export class Login{
    public user;
    constructor(
      private UserService: Book.Services.UserService,
      private $state: ng.ui.IStateService,
      private Session: Book.Services.Session

    ){

    }
    public login(){
      this.UserService.login(this.user).then((res)=>{
        this.Session.create(res);
        this.$state.go('home',null,{reload: true});
      })
      .catch((e)=>{
        this.Session.destroy();
        throw new Error(e);
      })
    }
  }
  angular.module('book').component(name,{
    templateUrl: template,
    controller: Book.Components.Login,
    controllerAs:'vm'
  });
}
