namespace Book.Components{
  const name = 'app';
  const template = '/client/app/components/app/app.html';
 export class App{

   constructor(){

   }
 }
 angular.module('book').component(name,{
   templateUrl: template,
   controller: Book.Components.App,
   controllerAs: 'vm'
 })
}
