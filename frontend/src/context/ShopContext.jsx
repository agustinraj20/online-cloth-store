import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹ ";
    const delivery_fee = 50;

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] =
        useState(false);

    const [cartItems, setCartItems] =
        useState({});

    const [products, setProducts] =
        useState([]);

    const [token, setToken] =
        useState("");

    const navigate = useNavigate();

    // ============================================================
    // PRODUCT CACHE KEYS
    // ============================================================

    const PRODUCTS_CACHE_KEY =
        "shop_products";

    const PRODUCTS_VERSION_KEY =
        "shop_products_version";

    // ============================================================
    // ADD TO CART
    // ============================================================

    const addToCart = async (
        itemId,
        size
    ) => {
        if (!size) {
            toast.error(
                "Select Product Size"
            );
            return;
        }

        let cartData =
            structuredClone(cartItems);

        if (cartData[itemId]) {
            if (
                cartData[itemId][size]
            ) {
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
                    backendUrl +
                        "/api/cart/add",
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

                toast.error(
                    error.message
                );
            }
        }
    };

    // ============================================================
    // GET CART COUNT
    // ============================================================

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in
                cartItems[items]) {
                try {
                    if (
                        cartItems[items][
                            item
                        ] > 0
                    ) {
                        totalCount +=
                            cartItems[items][
                                item
                            ];
                    }
                } catch (error) {}
            }
        }

        return totalCount;
    };

    // ============================================================
    // UPDATE CART
    // ============================================================

    const updateQuantity = async (
        itemId,
        size,
        quantity
    ) => {
        let cartData =
            structuredClone(cartItems);

        if (!cartData[itemId]) {
            return;
        }

        cartData[itemId][size] =
            quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl +
                        "/api/cart/update",
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

                toast.error(
                    error.message
                );
            }
        }
    };

    // ============================================================
    // GET CART AMOUNT
    // ============================================================

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            const itemInfo =
                products.find(
                    (product) =>
                        product._id ===
                        items
                );

            if (!itemInfo) {
                continue;
            }

            for (const item in
                cartItems[items]) {
                try {
                    if (
                        cartItems[items][
                            item
                        ] > 0
                    ) {
                        totalAmount +=
                            itemInfo.price *
                            cartItems[items][
                                item
                            ];
                    }
                } catch (error) {}
            }
        }

        return totalAmount;
    };

    // ============================================================
    // FETCH PRODUCTS FROM BACKEND
    // ============================================================

    const getProductsData = async () => {
        try {
            console.log(
                "Fetching latest products..."
            );

            const response =
                await axios.get(
                    backendUrl +
                        "/api/product/list"
                );

            if (
                response.data.success
            ) {
                const productData = [
                    ...response.data
                        .products,
                ].reverse();

                setProducts(
                    productData
                );

                // Save products
                localStorage.setItem(
                    PRODUCTS_CACHE_KEY,
                    JSON.stringify(
                        productData
                    )
                );

                // Get latest version
                try {
                    const versionResponse =
                        await axios.get(
                            backendUrl +
                                "/api/product/version"
                        );

                    if (
                        versionResponse
                            .data.success
                    ) {
                        localStorage.setItem(
                            PRODUCTS_VERSION_KEY,
                            String(
                                versionResponse
                                    .data
                                    .version
                            )
                        );
                    }
                } catch (versionError) {
                    console.log(
                        "Version error:",
                        versionError
                    );
                }

                console.log(
                    "Latest products saved."
                );
            } else {
                toast.error(
                    response.data.message
                );
            }
        } catch (error) {
            console.log(
                "Product fetch error:",
                error
            );

            toast.error(
                error.message
            );
        }
    };

    // ============================================================
    // LOAD PRODUCTS FROM CACHE
    // ============================================================

    const loadProductsFromCache = () => {
        try {
            const cachedProducts =
                localStorage.getItem(
                    PRODUCTS_CACHE_KEY
                );

            if (!cachedProducts) {
                return false;
            }

            const parsedProducts =
                JSON.parse(
                    cachedProducts
                );

            if (
                !Array.isArray(
                    parsedProducts
                ) ||
                parsedProducts.length ===
                    0
            ) {
                localStorage.removeItem(
                    PRODUCTS_CACHE_KEY
                );

                return false;
            }

            setProducts(
                parsedProducts
            );

            console.log(
                "Products loaded from localStorage."
            );

            return true;
        } catch (error) {
            console.log(
                "Cache error:",
                error
            );

            localStorage.removeItem(
                PRODUCTS_CACHE_KEY
            );

            return false;
        }
    };

    // ============================================================
    // CHECK PRODUCT VERSION
    // ============================================================

    const checkProductVersion =
        async () => {
            try {
                const response =
                    await axios.get(
                        backendUrl +
                            "/api/product/version"
                    );

                if (
                    !response.data.success
                ) {
                    return;
                }

                const serverVersion =
                    String(
                        response.data.version
                    );

                const localVersion =
                    localStorage.getItem(
                        PRODUCTS_VERSION_KEY
                    );

                console.log(
                    "Local product version:",
                    localVersion
                );

                console.log(
                    "Server product version:",
                    serverVersion
                );

                // =================================================
                // VERSION HAS CHANGED
                // =================================================

                if (
                    localVersion !==
                    serverVersion
                ) {
                    console.log(
                        "Products changed. Downloading latest products..."
                    );

                    await getProductsData();

                    return;
                }

                console.log(
                    "Products unchanged. Using localStorage."
                );
            } catch (error) {
                console.log(
                    "Product version check failed:",
                    error
                );

                // IMPORTANT:
                // If version check fails,
                // keep using cached products.
            }
        };

    // ============================================================
    // CLEAR PRODUCT CACHE
    // ============================================================

    const clearProductCache = () => {
        localStorage.removeItem(
            PRODUCTS_CACHE_KEY
        );

        localStorage.removeItem(
            PRODUCTS_VERSION_KEY
        );

        setProducts([]);

        console.log(
            "Product cache cleared."
        );
    };

    // ============================================================
    // USER CART
    // ============================================================

    const getUserCart = async (
        userToken
    ) => {
        try {
            const response =
                await axios.post(
                    backendUrl +
                        "/api/cart/get",
                    {},
                    {
                        headers: {
                            token: userToken,
                        },
                    }
                );

            if (
                response.data.success
            ) {
                setCartItems(
                    response.data
                        .cartData
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.message
            );
        }
    };

    // ============================================================
    // INITIAL PRODUCT LOAD
    // ============================================================

    useEffect(() => {
        const hasCachedProducts =
            loadProductsFromCache();

        if (hasCachedProducts) {
            // We already have the products.
            // Check only the small version endpoint.
            checkProductVersion();
        } else {
            // No cache.
            // Download products.
            getProductsData();
        }
    }, []);

    // ============================================================
    // TOKEN / CART
    // ============================================================

    useEffect(() => {
        const savedToken =
            localStorage.getItem(
                "token"
            );

        if (
            !token &&
            savedToken
        ) {
            setToken(savedToken);

            getUserCart(
                savedToken
            );
        }

        if (token) {
            getUserCart(token);
        }
    }, [token]);

    // ============================================================
    // CONTEXT VALUE
    // ============================================================

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

        getProductsData,
        clearProductCache,
    };

    return (
        <ShopContext.Provider
            value={value}
        >
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;