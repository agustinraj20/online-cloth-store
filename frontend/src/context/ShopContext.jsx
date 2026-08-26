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

    // =========================================================
    // PRODUCT CACHE
    // =========================================================

    const PRODUCTS_CACHE_KEY = "shop_products";

    // =========================================================
    // ADD TO CART
    // =========================================================

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

        // Save cart locally as well
        localStorage.setItem(
            "shop_cart",
            JSON.stringify(cartData)
        );

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    {
                        itemId,
                        size,
                    },
                    {
                        headers: {
                            token,
                        },
                    }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // =========================================================
    // GET CART COUNT
    // =========================================================

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

    // =========================================================
    // UPDATE CART QUANTITY
    // =========================================================

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            return;
        }

        cartData[itemId][size] = quantity;

        // Remove size if quantity is 0
        if (quantity <= 0) {
            delete cartData[itemId][size];
        }

        // Remove product if no sizes remain
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

        setCartItems(cartData);

        // Save updated cart locally
        localStorage.setItem(
            "shop_cart",
            JSON.stringify(cartData)
        );

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    {
                        itemId,
                        size,
                        quantity,
                    },
                    {
                        headers: {
                            token,
                        },
                    }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // =========================================================
    // GET CART AMOUNT
    // =========================================================

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            const itemInfo = products.find(
                (product) => product._id === items
            );

            if (!itemInfo) {
                continue;
            }

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

    // =========================================================
    // FETCH PRODUCTS FROM BACKEND
    // =========================================================

    const getProductsData = async () => {
        try {
            console.log("Fetching products from backend...");

            const response = await axios.get(
                backendUrl + "/api/product/list"
            );

            if (response.data.success) {
                // Create a new array instead of modifying response directly
                const productData = [
                    ...response.data.products,
                ].reverse();

                // Update React state
                setProducts(productData);

                // Save products to localStorage
                localStorage.setItem(
                    PRODUCTS_CACHE_KEY,
                    JSON.stringify(productData)
                );

                console.log(
                    "Products fetched and saved to localStorage."
                );
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Product fetch error:", error);
            toast.error(error.message);
        }
    };

    // =========================================================
    // LOAD PRODUCTS FROM LOCAL STORAGE
    // =========================================================

    const loadProductsFromCache = () => {
        try {
            const cachedProducts = localStorage.getItem(
                PRODUCTS_CACHE_KEY
            );

            // No cache
            if (!cachedProducts) {
                console.log(
                    "No cached products found."
                );

                return false;
            }

            const parsedProducts =
                JSON.parse(cachedProducts);

            // Check that cached data is an array
            if (
                !Array.isArray(parsedProducts) ||
                parsedProducts.length === 0
            ) {
                console.log(
                    "Product cache is empty or invalid."
                );

                localStorage.removeItem(
                    PRODUCTS_CACHE_KEY
                );

                return false;
            }

            // Restore products
            setProducts(parsedProducts);

            console.log(
                "Products loaded from localStorage."
            );

            return true;
        } catch (error) {
            console.log(
                "Error loading product cache:",
                error
            );

            // Remove broken cache
            localStorage.removeItem(
                PRODUCTS_CACHE_KEY
            );

            return false;
        }
    };

    // =========================================================
    // CLEAR PRODUCT CACHE
    // =========================================================

    const clearProductCache = () => {
        localStorage.removeItem(
            PRODUCTS_CACHE_KEY
        );

        setProducts([]);

        console.log(
            "Product cache cleared."
        );
    };

    // =========================================================
    // GET USER CART FROM BACKEND
    // =========================================================

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                {
                    headers: {
                        token: userToken,
                    },
                }
            );

            if (response.data.success) {
                setCartItems(
                    response.data.cartData
                );

                // Save cart locally
                localStorage.setItem(
                    "shop_cart",
                    JSON.stringify(
                        response.data.cartData
                    )
                );
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // =========================================================
    // LOAD PRODUCTS ON APP START
    // =========================================================

    useEffect(() => {
        const productsFromCache =
            loadProductsFromCache();

        // Only call backend if there is NO cached data
        if (!productsFromCache) {
            getProductsData();
        }
    }, []);

    // =========================================================
    // LOAD TOKEN AND CART
    // =========================================================

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

    // =========================================================
    // CONTEXT VALUE
    // =========================================================

    const value = {
        // Products
        products,

        // Currency
        currency,
        delivery_fee,

        // Search
        search,
        setSearch,
        showSearch,
        setShowSearch,

        // Cart
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,

        // Navigation
        navigate,

        // Backend
        backendUrl,

        // Authentication
        setToken,
        token,

        // Optional product cache control
        getProductsData,
        clearProductCache,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;