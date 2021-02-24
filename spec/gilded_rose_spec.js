/* eslint-disable no-undef */
import Shop from '../src/gilded_rose';
import Item from '../src/item';

describe('GildedRose shop manager', () => {
  let listItems;

  beforeEach(() => {
    listItems = [];
  });
  it("Baisser de 1 la qualité et sellIn d'item normaux", () => {
    listItems.push(new Item('+5 Dexterity Vest', 10, 20));
    listItems.push(new Item('Mana Cake', 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Augmenter la qualité de 1 pour Aged Brie et Backstage passes', () => {
    listItems.push(new Item('Aged Brie', 20, 30));
    listItems.push(
      // eslint-disable-next-line comma-dangle
      new Item('Backstage passes to a TAFKAL80ETC concert', 20, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});
