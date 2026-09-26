import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { ingredients, pairings, findPairings, isPlantIngredient } from '../lib/pairings.ts';
const root = new URL('../', import.meta.url);
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
