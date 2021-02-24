/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
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

  it("Baisser de 2 la qualité et sellIn d'item normaux quand sellIn = 0", () => {
    listItems.push(new Item('+5 Dexterity Vest', 0, 20));
    listItems.push(new Item('Mana Cake', 0, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 0, quality: 18 },
      { sellIn: 0, quality: 4 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Augmenter la qualité de 3 pour Aged Brie et Backstage passes quand sellIn <= 5', () => {
    listItems.push(new Item('Aged Brie', 5, 30));
    listItems.push(
      new Item('Backstage passes to a TAFKAL80ETC concert', 4, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 4, quality: 33 },
      { sellIn: 3, quality: 33 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Augmenter la qualité de 2 pour Aged Brie et Backstage passes quand sellIn est entre 10 et 5', () => {
    listItems.push(new Item('Aged Brie', 6, 30));
    listItems.push(
      new Item('Backstage passes to a TAFKAL80ETC concert', 9, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 5, quality: 32 },
      { sellIn: 8, quality: 32 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Vérifier que la qualité de Sulfuras ne se modifie pas', () => {
    listItems.push(new Item('Sulfuras, Hand of Ragnaros', 5, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [{ sellIn: 5, quality: 80 }];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Vérifier que la qualité ne dépasse pas 50 pour aged brie et backstage', () => {
    listItems.push(new Item('Aged Brie', 20, 50));
    listItems.push(
      new Item('Backstage passes to a TAFKAL80ETC concert', 20, 50)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 19, quality: 50 },
      { sellIn: 19, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Vérifier que le sellIn ne puisse pas être négatif', () => {
    listItems.push(new Item('+5 Dexterity Vest', 0, 20));
    listItems.push(new Item('Mana Cake', 0, 6));
    listItems.push(new Item('Aged Brie', 0, 50));
    listItems.push(
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 0, quality: 18 },
      { sellIn: 0, quality: 4 },
      { sellIn: 0, quality: 50 },
      { sellIn: 0, quality: 0 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Vérifier que les objets conjured se dégradent 2x + vite (donc -2)', () => {
    listItems.push(new Item('Conjured Dark Blade', 8, 20));
    listItems.push(new Item('Conjured Magic Stick', 10, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 7, quality: 18 },
      { sellIn: 9, quality: 4 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Vérifier que Backstage tombe à  zéro à la fin du concert', () => {
    listItems.push(
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [{ sellIn: 0, quality: 0 }];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});
