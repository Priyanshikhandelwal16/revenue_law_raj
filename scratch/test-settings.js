import { getSettingValue, getSettingsValues } from '../src/lib/settings.js';
import { getLocalItem, updateLocalItem } from '../src/lib/localDb.js';

async function test() {
  console.log("Testing getSettingValue...");
  const val = await getSettingValue('homepage_config');
  console.log("Homepage hero title:", val?.hero?.title);
  console.log("Homepage hero eyebrow:", val?.hero?.eyebrow);
  console.log("Test passed!");
}

test().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
