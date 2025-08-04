require('dotenv').config({ path: require('path').resolve(process.cwd(), 'src/.env') });

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

async function main() {
  const products = await stripe.products.list();

  let product = products.data.find(p => p.name === 'Ledgrly Pro');

  if (!product) {
    console.log('Creating "Ledgrly Pro" product...');
    product = await stripe.products.create({
      name: 'Ledgrly Pro',
      description: 'Automated bookkeeping for your Etsy shop.',
    });
    console.log('Product created:', product.id);
  } else {
    console.log('Product "Ledgrly Pro" already exists:', product.id);
  }

  const prices = await stripe.prices.list({ product: product.id });

  let price = prices.data.find(p => p.nickname === 'Pro Monthly');

  if (!price) {
    console.log('Creating "Pro Monthly" price...');
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: 1999, // $19.99
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      nickname: 'Pro Monthly',
    });
    console.log('Price created:', price.id);
  } else {
    console.log('Price "Pro Monthly" already exists:', price.id);
  }
}

main()
  .then(() => console.log('Stripe setup complete.'))
  .catch(e => console.error(e)); 