import type { Ingredient } from '@/lib/pairings';

export function Food({ingredient,className=''}:{ingredient:Ingredient;className?:string}){
 const cells=ingredient.sheet?4:3;
 return <span role="img" aria-label={ingredient.name} className={`food ${className}`} style={{backgroundImage:`url('/images/${ingredient.sheet ? `ingredients-${ingredient.sheet}` : 'ingredients'}.png')`,backgroundSize:`${cells*100}% ${cells*100}%`,backgroundPosition:`${ingredient.index%cells*100/(cells-1)}% ${Math.floor(ingredient.index/cells)*100/(cells-1)}%`}}/>;
}
