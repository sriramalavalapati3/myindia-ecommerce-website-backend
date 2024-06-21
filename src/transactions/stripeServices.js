require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const checkoutSession = async ({
  product,
  amount,
  user,
  productId,
  billingAddress,
  productQuantity,
}) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product,
            },
            unit_amount: amount * 100, // Stripe requires amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5050/paymentSuccess`,
      cancel_url: `http://localhost:5050/paymentCancel`,
      metadata: {
        user: user._id,
        productId: productId,
        billingAddress: billingAddress,
        productQuantity: productQuantity,
      },
    });
    return session;
  } catch (error) {
    throw error;
  }
};

const manageStripeHook = async (rawbody,sig,endpointSecret) => {
 

  let event;
 
  try {
    event = stripe.webhooks.constructEvent(
    rawbody,
      sig,
      endpointSecret
    );

    return event;
  } catch (err) {
   throw err
  }
};

module.exports = { checkoutSession, manageStripeHook };
