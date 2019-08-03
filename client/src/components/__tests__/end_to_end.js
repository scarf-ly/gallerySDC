import puppeteer from 'puppeteer'; 

const pageUrl = 'http://ec2-52-53-207-161.us-west-1.compute.amazonaws.com:5004/99/';

let page;
let browser;
const width = 12280;
const height = 720;

beforeAll(async () => {
    browser = await puppeteer.launch({
      slowMo: 80,
      args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterAll(() => {
    browser.close();
  });

  describe('food modals', () => {

    beforeEach(async () => {
        await page.goto(pageUrl, {waitUntil: 'networkidle2'}); 
    })

      test('it opens modals on user click', async () => {
        var selector = '.Image__foodImg__2MSw_';
        var img = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
        expect(img).toHaveLength(0);
        await page.click(selector); 
        img = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
        expect(img).toHaveLength(1);
      })

      test('it scrolls modals on user keypress', async () => {
          var selector = '.Image__foodImg__2MSw_';
          await page.click(selector); 
          const img = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
          await page.keyboard.press('ArrowRight');
          const img2 = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
          expect(img).not.toEqual(img2);
          await page.keyboard.press('ArrowLeft');
          const img3 = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
          expect(img).toEqual(img3);
      });

      test('it scrolls modals on user click', async () => {
        var selector = '.Image__foodImg__2MSw_';
        await page.click(selector); 
        const img = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('.App__right__3QJXq');
        const img2 = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
        expect(img).not.toEqual(img2);
        await page.click('.App__left__2wd3y');
        const img3 = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
        expect(img).toEqual(img3);
    });

    test('it closes modal on close click', async () => {
        var selector = '.Image__foodImg__2MSw_';
        await page.click(selector); 
        var img = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
        expect(img).toHaveLength(1); 
        await page.click('.App__close__1i5e2'); 
        img = await page.$$eval('img.App__image__jLJgG[src]', imgs => imgs.map(img => img.getAttribute('src')));
        expect(img).toHaveLength(0); 
    });

  })