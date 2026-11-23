const fs = require('fs');
const puppeteer = require('puppeteer');

const category_url = 'https://www.olx.ua/d/uk/elektronika/';

async function parseOLX() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Opening page: ${category_url}`);
    await page.goto(category_url, { waitUntil: 'domcontentloaded' });

    const basicAds = await page.evaluate(() => {
        const cards = document.querySelectorAll('div[data-cy="l-card"]');
        const results = [];
        
        const limit = Math.min(cards.length, 5);
        for (let i = 0; i < limit; i++) {
            const card = cards[i];
            const title = card.querySelector('h4, h6')?.innerText.trim() || 'No title';
            const price = card.querySelector('p[data-testid="ad-price"]')?.innerText.trim() || 'Negotiable';
            const link = card.querySelector('a')?.href;

            if (link) {
                results.push({ id: i + 1, title, price, link });
            }
        }
        return results;
    });

    console.log(`Found ads to process: ${basicAds.length}`);
    const fullAdsArray = [];

    for (const ad of basicAds) {
        console.log(`Loading details: ${ad.title}`);
        
        const detailPage = await browser.newPage();
        await detailPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        try {
            await detailPage.goto(ad.link, { waitUntil: 'domcontentloaded', timeout: 30000 });

            const details = await detailPage.evaluate(() => {
                const description = document.querySelector('div[data-cy="ad_description"]')?.innerText.trim() || 'No description available';
                const locationAndDate = document.querySelector('div[data-cy="ad-posted-date"]')?.innerText.trim() || 'Not specified';
                return { description, locationAndDate };
            });

            fullAdsArray.push({
                ...ad,
                details,
                parsedAt: new Date().toISOString()
            });

        } catch (err) {
            console.error(`Error loading detail page ${ad.link}:`, err.message);
        } finally {
            await detailPage.close(); 
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    await browser.close();
    console.log('Browser closed.');

    fs.writeFileSync('olx_ads_puppeteer.json', JSON.stringify(fullAdsArray, null, 2), 'utf-8');
    console.log('Data successfully saved to olx_ads_puppeteer.json!');
}

parseOLX();
