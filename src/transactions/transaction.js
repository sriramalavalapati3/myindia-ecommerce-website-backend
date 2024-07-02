const { User, products, orders, payment } = require("../../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req) => {
  try {
    const { name, mobile, email, password, address, userType } = req.body;
    console.log(name, mobile, email, password, address, userType);
    const userdata = new User({
      name,
      mobile,
      email,
      password,
      address,
      userType,
    });
    await userdata.save();
    return userdata;
  } catch (error) {
    throw error;
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = await jwt.sign(
          { _id: user._id, userType: user.userType },
          process.env.secretTokenKey,
          { expiresIn: "1h" }
        );
        return { status: true, user, token };
      } else {
        return { status: false, msg: "please enter valid credentials" };
      }
    } else {
      return { status: false, msg: "please register" };
    }
  } catch (error) {
    throw error;
  }
};

const findUserType = async () => {};

const handleUpload = async (req) => {
  try {
    const {
      product,
      productCategory,
      productDescription,
      productQuantity,
      productPrize,
      productSupplier,
    } = req.body;
    const productData = new products({
      product,
      productCategory,
      productDescription,
      productQuantity,
      productPrize,
      productSupplier,
    });

    await productData.save();
    return productData;
  } catch (error) {
    throw error;
  }
};

const handleGetAllProducts = async (pageOffset, pageSize) => {
  try {
    const skip = pageOffset * pageSize;

    const productsData = await products.find()

    return { productsData, pageOffset };
  } catch (error) {
    throw error;
  }
};

const getProductById = async (user) => {
  try {
    const product = await products.find({ _id: user });
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductsByFilter = async (req, pageOffset, pageSize) => {
  try {
    const { sortBy, category } = req.query;
    console.log(sortBy, category, pageOffset, pageSize, "h2");
    let sortOption = {};
    if (sortBy === "lowToHigh") {
      sortOption = { productPrize: 1 }; // Sort by price ascending
    } else if (sortBy === "highToLow") {
      sortOption = { productPrize: -1 }; // Sort by price descending
    } else {
      sortOption = { createdAt: -1 }; // Default sorting if sortBy param is missing
    }

    // Prepare filter object based on category
    const filter = {};
    if (category) {
      filter.productCategory = category; // Filter by category if provided
    }

    // Fetch products from database with sorting, pagination, and category filter
    const FiletedProduct = await products
      .find(filter)
      .sort(sortOption)
     
      // .skip(pageOffset * pageSize) // Calculate how many documents to skip based on offset and limit
      // .limit(pageSize) // Limit the number of documents returned per page
      // .exec();

    return { FiletedProduct, pageOffset };
  } catch (error) {
    throw error;
  }
};

const savePaymentDetails = async ({
  orderId,
  paymentIntentId,
  paymentStatus,
  amount,
  currency,
}) => {
  try {
    const newPayment = new payment({
      orderId,
      paymentIntentId,
      paymentStatus,
      amount,
      currency,
    });

    await newPayment.save();
    return newPayment;
  } catch (error) {
    throw error;
  }
};

const saveOrderDetails = async ({
  product,
  amount,
  user,
  productId,
  billingAddress,
  productQuantity,
  paymentIntentId,
}) => {
  try {
    const orderDetails = new orders({
      product,
      amount,
      user,
      productId,
      billingAddress,
      productQuantity,
      paymentIntentId,
    });

    await orderDetails.save();

    return orderDetails;
  } catch (error) {
    throw error;
  }
};

const updatePaymentStatus = async(paymentIntentId) =>{
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { paymentIntentId }, // Filter to find the payment document
      { status: 'succeeded' }, // Update to set the status to 'succeeded'
      { new: true } // Option to return the updated document
  );
     return updatedPayment
  } catch (error) {
    throw error;
  }
};
const updateOrderStatus = async(paymentIntentId) =>{
  try {
    const updatedOrder = await orders.findOneAndUpdate(
      { paymentIntentId }, // Filter to find the payment document
      { status: 'succeeded' }, // Update to set the status to 'succeeded'
      { new: true } // Option to return the updated document
  );
     return updatedOrder
  } catch (error) {
    throw error;
  }
};


module.exports = {
  userRegister,
  userLogin,
  handleUpload,
  findUserType,
  handleGetAllProducts,
  getProductById,
  getProductsByFilter,
  savePaymentDetails,
  saveOrderDetails,
  updatePaymentStatus,
  updateOrderStatus
};
