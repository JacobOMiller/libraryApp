namespace Book.Components {
  const name ='registration';
  const template = '/client/app/components/registration/registration.html';
  export class Register{
    public newUser;
    constructor(
      private UserService: Book.Services.UserService,
      private $state: ng.ui.IStateService,
      private Session: Book.Services.Session

    ){

    }
    public register(){
      this.UserService.register(this.newUser).then((res)=>{
        this.$state.go('login');
      })
      .catch((e)=>{
        throw new Error(e);
      })
    }
  }
  angular.module('book').component(name,{
    templateUrl: template,
    controller: Book.Components.Register,
    controllerAs:'vm'
  });
}
