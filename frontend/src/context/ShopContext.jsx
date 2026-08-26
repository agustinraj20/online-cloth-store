import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹ ";
    const delivery_fee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    // LocalStorage key
    const PRODUCTS_CACHE_KEY = "shop_products";

    // =========================
    // ADD TO CART
    // =========================
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId, size },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // =========================
    // GET CART COUNT
    // =========================
    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {}
            }
        }

        return totalCount;
    };

    // =========================
    // UPDATE QUANTITY
    // =========================
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) return;

        cartData[itemId][size] = quantity;

        if (quantity <= 0) {
            delete cartData[itemId][size];
        }

        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // =========================
    // GET CART AMOUNT
    // =========================
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            const itemInfo = products.find(
                (product) => product._id === items
            );

            if (!itemInfo) continue;

            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount +=
                            itemInfo.price *
                            cartItems[items][item];
                    }
                } catch (error) {}
            }
        }

        return totalAmount;
    };

    // =========================
    // GET PRODUCTS FROM BACKEND
    // =========================
    const getProductsData = async () => {
        try {
            console.log("Fetching products from backend...");

            const response = await axios.get(
                backendUrl + "/api/product/list"
            );

            if (response.data.success) {
                const productData = [
                    ...response.data.products
                ].reverse();

                // Put products into React state
                setProducts(productData);

                // Save products in browser
                localStorage.setItem(
                    PRODUCTS_CACHE_KEY,
                    JSON.stringify(productData)
                );

                console.log(
                    "Products fetched from backend and saved to localStorage"
                );
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // =========================
    // LOAD PRODUCTS FROM LOCAL STORAGE
    // =========================
    const loadProductsFromCache = () => {
        try {
            const cachedProducts =
                localStorage.getItem(PRODUCTS_CACHE_KEY);

            if (!cachedProducts) {
                console.log("No products found in localStorage");
                return false;
            }

            const parsedProducts =
                JSON.parse(cachedProducts);

            if (
                !Array.isArray(parsedProducts) ||
                parsedProducts.length === 0
            ) {
                console.log("Invalid product cache");

                localStorage.removeItem(
                    PRODUCTS_CACHE_KEY
                );

                return false;
            }

            // Restore products
            setProducts(parsedProducts);

            console.log(
                "Products restored from localStorage"
            );

            return true;
        } catch (error) {
            console.log(
                "Error reading product cache:",
                error
            );

            localStorage.removeItem(
                PRODUCTS_CACHE_KEY
            );

            return false;
        }
    };

    // =========================
    // GET USER CART
    // =========================
    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                {
                    headers: {
                        token: userToken
                    }
                }
            );

            if (response.data.success) {
                setCartItems(
                    response.data.cartData
                );
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // =========================
    // LOAD PRODUCTS
    // =========================
    useEffect(() => {
        const cachedProducts =
            loadProductsFromCache();

        // Only call backend if no cache exists
        if (!cachedProducts) {
            getProductsData();
        }
    }, []);

    // =========================
    // TOKEN / CART
    // =========================
    useEffect(() => {
        const savedToken =
            localStorage.getItem("token");

        if (!token && savedToken) {
            setToken(savedToken);
            getUserCart(savedToken);
        }

        if (token) {
            getUserCart(token);
        }
    }, [token]);

    // =========================
    // CONTEXT VALUE
    // =========================
    const value = {
        products,
        currency,
        delivery_fee,

        search,
        setSearch,

        showSearch,
        setShowSearch,

        cartItems,
        addToCart,
        setCartItems,

        getCartCount,
        updateQuantity,
        getCartAmount,

        navigate,
        backendUrl,

        setToken,
        token,

        // Optional manual refresh
        getProductsData
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;