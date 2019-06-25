import {Recipe} from "./recipe.model";
import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
@Injectable()
export class RecipeService{
recipesChanged = new Subject<Recipe[]>();
 // private recipes: Recipe[] = [
 //    new Recipe('Test Recipe',
 //      'This is sample test',
 //      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',

 //   [new Ingredient('Meat',1),
 //   new Ingredient('French Fries',3)]),
 //    new Recipe('Test Recipe',
 //      'This  test','https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
 //
 //      [new Ingredient('Buns',1),
 //      new Ingredient('Meat',5)])];
  private recipes:Recipe[];
constructor(private slService:ShoppingListService){}
setRecipes(recipes:Recipe[]){
   this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice());

}
 getRecipes(){
  console.log(this.recipes);
  if(this.recipes !== undefined)
   return this.recipes.slice();
 }
 getRecipe(index:number){
  console.log('iam in get recipe');
  console.log(this.recipes[index]);
  return this.recipes[index];
 }
 addIngredientToShoppingList(ingredients:Ingredient[]){
 this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe:Recipe){
  this.recipes.push(recipe);
  this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,newRecipe:Recipe){
this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }
  deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipesChanged.next(this.recipes.slice());
  }
}
