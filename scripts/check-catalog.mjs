import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { ingredients, pairings, findPairings, isPlantIngredient, matchesIngredient } from '../lib/pairings.ts';
import { kitchenThemes, kitchenConcepts, filterKitchenConcepts, formatKitchenConcept } from '../lib/kitchen-modes.ts';
const root = new URL('../', import.meta.url);
assert.equal(ingredients.length, 150, 'Chef catalogue must contain exactly 150 ingredients');
for (const id of ['egg','honey','prawn','feta','beef']) assert.equal(isPlantIngredient(ingredients.find(i=>i.id===id)), false, `${id} must be excluded by the plant filter`);
for (const id of ['tofu','nori','chickpea']) assert.equal(isPlantIngredient(ingredients.find(i=>i.id===id)), true);
for (const [query,id] of [['zucchini','courgette'],['eggplant','aubergine'],['shrimp','prawn'],['yogurt','yoghurt'],['szechuan','sichuan-pepper'],['arugula','rocket']]) assert.ok(matchesIngredient(ingredients.find(i=>i.id===id),query));
assert.ok(matchesIngredient(ingredients.find(i=>i.id==='cinnamon'),'cinnamaldehyde'));
assert.equal(new Set(ingredients.map(i=>`${i.sheet||'original'}:${i.index}`)).size, ingredients.length, 'Each ingredient needs its own image cell');
const ids = new Set(ingredients.map(i => i.id));
assert.equal(ids.size, ingredients.length, 'Ingredient IDs must be unique');
assert.equal(new Set(pairings.map(p => p.id)).size, pairings.length, 'Pairs must be unique');
for (const p of pairings) {
  assert.ok(ids.has(p.a) && ids.has(p.b), `Unknown ingredient in ${p.id}`);
  assert.notEqual(p.a, p.b);
  assert.ok(p.why.length > 40 && p.method.length > 40 && p.dish.length > 10, `Missing useful guidance for ${p.id}`);
}
for (const ingredient of ingredients) {
  assert.ok(existsSync(new URL(`public/images/ingredients${ingredient.sheet ? '-' + ingredient.sheet : ''}.png`, root)));
  assert.ok(ingredient.index >= 0 && ingredient.index < (ingredient.sheet ? 16 : 9));
  assert.ok(findPairings(ingredient.id, 'all', 2).length >= 4, `Insufficient coverage for ${ingredient.name}`);
  for (const kind of ['all', 'bridge', 'contrast']) for (const novelty of [1, 2, 3]) for (const plantOnly of [false, true]) {
    const results = findPairings(ingredient.id, kind, novelty, plantOnly);
    assert.ok(results.every(p => p.a === ingredient.id || p.b === ingredient.id));
    if (kind !== 'all') assert.ok(results.every(p => p.type === kind));
    if (plantOnly) assert.ok(results.every(p => [p.a, p.b].every(id => isPlantIngredient(ingredients.find(i => i.id === id)))));
    assert.ok(results.every((p, n) => n === 0 || Math.abs(results[n - 1].novelty - novelty) <= Math.abs(p.novelty - novelty)));
  }
}
console.log(`Validated ${ingredients.length} ingredients and ${pairings.length} distinct pairings, all filters, ordering and image references.`);

const allIdeaIds=[...pairings,...kitchenConcepts].map(c=>c.id);
assert.equal(new Set(allIdeaIds).size,allIdeaIds.length,'Notebook identifiers must not collide across modes');
for(const theme of kitchenThemes){
  assert.equal(new Set(theme.concepts.map(c=>c.id)).size,theme.concepts.length);
  for(const c of theme.concepts){
    assert.equal(c.themeId,theme.id);
    const pair=pairings.find(p=>p.id===c.pairId);
    assert.ok(pair,`Missing flavour connection for ${c.id}`);
    assert.ok(theme.techniques.includes(c.technique));
    assert.deepEqual(c.components.map(p=>p.role),theme.roles.map(r=>r.name));
    const featured=c.components.flatMap(p=>p.ingredients);
    assert.ok(featured.includes(pair.a)&&featured.includes(pair.b),`Featured pair missing from recipe: ${c.id}`);
    for(const id of featured){
      assert.ok(ids.has(id),`Unknown component ${id}`);
      if(c.plantBased)assert.ok(isPlantIngredient(ingredients.find(i=>i.id===id)),`Animal ingredient in plant concept ${c.id}`);
    }
    assert.ok(formatKitchenConcept(c).includes(c.experiment),'Notebook export must preserve tasting experiment');
    assert.ok(formatKitchenConcept(c).includes(c.method),'Notebook export must preserve cooking method');
  }
  const filter=(query='',technique='all',plant=false,novelty=2)=>filterKitchenConcepts(theme,query,technique,plant,novelty,id=>pairings.find(p=>p.id===id).novelty,(id,q)=>matchesIngredient(ingredients.find(i=>i.id===id),q));
  assert.equal(filter().length,12);
  assert.equal(filter('shrimp')[0].id,'dumpling-prawn-ginger','Alias search must work in theme components');
  assert.equal(filter('shrimp','all',true).length,0,'Plant filter must exclude seafood');
  assert.equal(filter('no-such-ingredient').length,0);
  assert.equal(filter('green tea','Steam',true)[0].id,'dumpling-shiitake-tea');
  for(const technique of ['all',...theme.techniques])for(const plant of [false,true])for(const novelty of [1,2,3]){
    const matches=filter('',technique,plant,novelty);
    assert.ok(matches.every(c=>technique==='all'||c.technique===technique));
    assert.ok(matches.every(c=>!plant||c.plantBased));
    const distances=matches.map(c=>Math.abs(pairings.find(p=>p.id===c.pairId).novelty-novelty));
    assert.ok(distances.every((d,i)=>i===0||d>=distances[i-1]));
  }
}
console.log(`Validated ${kitchenConcepts.length} kitchen concepts, role coverage, plant components, filters, search aliases and notebook exports.`);
