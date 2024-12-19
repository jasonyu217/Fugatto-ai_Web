/**
 * KodePay Website Integration SDK
 * Version: 1.0.0
 */

"use strict";

// KodePay Class Definition
class KodePayError extends Error {
    static ERRORS = {
        CONTENT_SCRIPT_NOT_LOADED: "Content script setup error: Please configure your manifest.json correctly",
        CREATE_API_KEY_ERROR: "Create UUID key error: please check the extension id",
        NO_STORAGE_PERMISSION: "No storage permission: please add storage in permissions in manifest.json",
        GET_USER_INFO_ERROR: "Get user info error: please check your credentials",
        NO_ACCESS_KEY: "No access key: please check your credentials",
        MODE_KEY_ERROR: "Mode must be development or production",
        LIMIT_ERROR: "Request too fast, please try again later"
    };

    constructor(message) {
        super(message);
        this.name = "KodePayError";
    }
}

// Main KodePay SDK Implementation
window.KodePay = (function(applicationId, clientId, environment = "production") {
    // Configuration
    const API_VERSION = "1.0.0";
    const SUCCESS_CODE = 100000;
    const API_BASE = "https://api.kodepay.io";
    
    // API Endpoints
    const endpoints = {
        base: environment === "development" ? `${API_BASE}/sandbox` : API_BASE,
        get newKey() { return `${this.base}/api/extension/new-key`; },
        get userManagement() { return `${this.base}/api/extension/user-managerment`; },
        get userInfo() { return `${this.base}/api/extension/user-info`; },
        get searchOrder() { return `${this.base}/api/extension/search-order`; },
        get makeOrder() { return `${this.base}/api/extension/make-order`; },
        get userLogin() { return `${this.base}/api/extension/client-user-login`; },
        get preMakeOrder() { return `${this.base}/api/extension/pre_make_order`; }
    };

    // State Management
    const state = {
        apiKey: "",
        paymentListeners: [],
        transactions: {},
        rateLimit: {
            payment: { lastAccessTime: 0, limit: 5000 },
            general: { lastAccessTime: 0, limit: 5000 }
        }
    };

    // Core API Functions
    async function makeApiRequest(endpoint, options = {}) {
        if (!state.apiKey && endpoint !== endpoints.newKey) {
            state.apiKey = await createApiKey();
        }

        const headers = new Headers(options.headers || {});
        headers.append("content-type", "application/json");
        headers.append("application-id", applicationId);
        headers.append("client-type", "website");
        headers.append("language", navigator.language);
        headers.append("client-id", clientId);
        headers.append("api-key", state.apiKey);
        headers.append("app-version", API_VERSION);

        options.headers = headers;

        try {
            const response = await fetch(endpoint, options);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new KodePayError(`Network request failed: ${error.message}`);
        }
    }

    // Payment Functions
    async function createPayment(priceId, extraInfo = null) {
        checkRateLimit(state.rateLimit.payment);
        
        const payload = { price_id: priceId };
        if (extraInfo && isValidJsonObject(extraInfo)) {
            payload.origin_data = extraInfo;
        }

        const response = await makeApiRequest(endpoints.makeOrder, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        if (response.code === SUCCESS_CODE) {
            return response.data;
        }

        throw new KodePayError(
            response.code && response.message 
                ? `${response.code}: ${response.message}`
                : `Payment creation failed: ${JSON.stringify(response)}`
        );
    }

    // Public API
    return {
        // Payment Methods
        async openPaymentPage(priceId, extraInfo = null, width = 1100, height = 700) {
            try {
                checkRateLimit(state.rateLimit.payment);
                validateCredentials();

                const paymentData = await createPayment(priceId, extraInfo);
                if (paymentData.transaction_id) {
                    trackTransaction(paymentData.transaction_id);
                }

                return openPopupWindow(paymentData.url, width, height);
            } catch (error) {
                console.error("Payment page error:", error);
            }
        },

        // User Management
        async getUserInfo() {
            return makeApiRequest(endpoints.userInfo, { method: "POST" });
        },

        // Event Listeners
        onPaymentCompleted: {
            addListener(callback) {
                state.paymentListeners.push(callback);
            }
        }
    };
})(window.KODEPAY_APPLICATION_ID, window.KODEPAY_CLIENT_ID, window.KODEPAY_ENV);

//# sourceMappingURL=kodepay-website.js.map