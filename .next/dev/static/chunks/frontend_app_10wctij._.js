(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/app/components/AuthModel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const API_URL = "http://localhost:5000";
function AuthModal({ open, mode, onClose, onSuccess }) {
    _s();
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mode);
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lastName, setLastName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthModal.useEffect": ()=>{
            setAuthMode(mode);
        }
    }["AuthModal.useEffect"], [
        mode
    ]);
    if (!open) {
        return null;
    }
    const handleSubmit = async ()=>{
        if (!email.trim() || !password.trim()) {
            alert("Email and password are required");
            return;
        }
        if (authMode === "register" && (!firstName.trim() || !lastName.trim())) {
            alert("First name and last name are required");
            return;
        }
        setLoading(true);
        try {
            const body = authMode === "login" ? {
                email: email.trim(),
                password
            } : {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email: email.trim(),
                password
            };
            const response = await fetch(authMode === "login" ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || "Authentication failed");
            }
            localStorage.setItem("musicstream_token", data.token);
            localStorage.setItem("musicstream_user", JSON.stringify(data.user));
            onSuccess(data.token, data.user);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            onClose();
            alert(authMode === "login" ? "Login successful!" : "Registration successful!");
        } catch (error) {
            console.error("Authentication error:", error);
            alert(error instanceof Error ? error.message : "Authentication failed");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md rounded-2xl border border-gray-800 bg-[#111111] p-6 shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold",
                                    children: authMode === "login" ? "Welcome back" : "Create account"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-gray-500",
                                    children: authMode === "login" ? "Login to MusicStream" : "Join MusicStream today"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/components/AuthModel.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "rounded-full border border-gray-700 px-3 py-1 text-gray-400 hover:bg-gray-800",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/AuthModel.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                authMode === "register" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "First name",
                            value: firstName,
                            onChange: (e)=>setFirstName(e.target.value),
                            className: "rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/AuthModel.tsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Last name",
                            value: lastName,
                            onChange: (e)=>setLastName(e.target.value),
                            className: "rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/AuthModel.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    placeholder: "Email",
                    value: email,
                    onChange: (e)=>setEmail(e.target.value),
                    className: "mt-3 w-full rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                }, void 0, false, {
                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    placeholder: "Password",
                    value: password,
                    onChange: (e)=>setPassword(e.target.value),
                    onKeyDown: (e)=>{
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    },
                    className: "mt-3 w-full rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                }, void 0, false, {
                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSubmit,
                    disabled: loading,
                    className: "mt-5 w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-gray-200 disabled:opacity-50",
                    children: loading ? "Please wait..." : authMode === "login" ? "Login" : "Create Account"
                }, void 0, false, {
                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-5 text-center text-sm text-gray-500",
                    children: [
                        authMode === "login" ? "Don't have an account?" : "Already have an account?",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setAuthMode(authMode === "login" ? "register" : "login"),
                            className: "ml-2 text-white hover:underline",
                            children: authMode === "login" ? "Register" : "Login"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/AuthModel.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/components/AuthModel.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/app/components/AuthModel.tsx",
            lineNumber: 138,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/AuthModel.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(AuthModal, "ZI3GHg5TIj/gV1rpW+foAkUNlIs=");
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/components/SubscriptionModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SubscriptionModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const API_URL = "http://localhost:5000";
function SubscriptionModal({ open, token, onClose, onSuccess }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [checkingPlan, setCheckingPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentPlan, setCurrentPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentStep, setPaymentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("UPI");
    const [upiId, setUpiId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cardNumber, setCardNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cardName, setCardName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cardExpiry, setCardExpiry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cardCvv, setCardCvv] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SubscriptionModal.useEffect": ()=>{
            if (!open || !token) {
                setCurrentPlan(null);
                setPaymentStep(false);
                return;
            }
            const checkCurrentPlan = {
                "SubscriptionModal.useEffect.checkCurrentPlan": async ()=>{
                    setCheckingPlan(true);
                    try {
                        const response = await fetch(`${API_URL}/api/subscriptions/my`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const data = await response.json();
                        if (response.status === 404) {
                            setCurrentPlan(null);
                            return;
                        }
                        if (!response.ok) {
                            throw new Error(data.error || data.details || "Failed to check subscription");
                        }
                        setCurrentPlan(data);
                    } catch (error) {
                        console.error("Subscription check error:", error);
                        setCurrentPlan(null);
                    } finally{
                        setCheckingPlan(false);
                    }
                }
            }["SubscriptionModal.useEffect.checkCurrentPlan"];
            checkCurrentPlan();
        }
    }["SubscriptionModal.useEffect"], [
        open,
        token
    ]);
    if (!open) {
        return null;
    }
    const isPremium = String(currentPlan?.PLAN_TYPE || "").toUpperCase() === "PREMIUM";
    // ==================================================
    // START PAYMENT
    // ==================================================
    const handleGetPremium = ()=>{
        if (!token) {
            alert("Please login first.");
            onClose();
            return;
        }
        if (isPremium) {
            alert("You already have an active Premium subscription.");
            return;
        }
        setPaymentStep(true);
    };
    // ==================================================
    // VALIDATE PAYMENT
    // ==================================================
    const validatePayment = ()=>{
        if (paymentMethod === "UPI") {
            if (!upiId.trim()) {
                alert("Please enter your UPI ID.");
                return false;
            }
            if (!upiId.includes("@")) {
                alert("Please enter a valid UPI ID.");
                return false;
            }
            return true;
        }
        if (!cardNumber.trim()) {
            alert("Please enter your card number.");
            return false;
        }
        if (cardNumber.replace(/\s/g, "").length !== 16) {
            alert("Card number must contain 16 digits.");
            return false;
        }
        if (!cardName.trim()) {
            alert("Please enter the name on the card.");
            return false;
        }
        if (!cardExpiry.trim()) {
            alert("Please enter card expiry.");
            return false;
        }
        if (!cardCvv.trim()) {
            alert("Please enter CVV.");
            return false;
        }
        if (cardCvv.length !== 3) {
            alert("CVV must contain 3 digits.");
            return false;
        }
        return true;
    };
    // ==================================================
    // PAY
    // ==================================================
    const handlePayment = async ()=>{
        if (!token) {
            alert("Please login first.");
            return;
        }
        if (!validatePayment()) {
            return;
        }
        setLoading(true);
        try {
            // ------------------------------------------------
            // 1. Create subscription in Oracle
            // ------------------------------------------------
            const subscriptionResponse = await fetch(`${API_URL}/api/subscriptions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    plan_type: "PREMIUM"
                })
            });
            const subscriptionData = await subscriptionResponse.json();
            if (!subscriptionResponse.ok) {
                throw new Error(subscriptionData.error || subscriptionData.details || "Failed to create subscription");
            }
            // ------------------------------------------------
            // 2. Record payment in Oracle
            // ------------------------------------------------
            const paymentResponse = await fetch(`${API_URL}/api/payments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    subscription_id: subscriptionData.subscription?.SUBSCRIPTION_ID,
                    amount: 999,
                    payment_mode: paymentMethod
                })
            });
            const paymentData = await paymentResponse.json();
            if (!paymentResponse.ok) {
                throw new Error(paymentData.error || paymentData.details || "Payment failed");
            }
            // ------------------------------------------------
            // 3. Update UI immediately
            // ------------------------------------------------
            setCurrentPlan(subscriptionData.subscription);
            setPaymentStep(false);
            // Clear payment fields
            setUpiId("");
            setCardNumber("");
            setCardName("");
            setCardExpiry("");
            setCardCvv("");
            alert("Payment successful!\n\nYour Premium account has been registered successfully.");
            // Refresh current plan on main page
            onSuccess();
        } catch (error) {
            console.error("Payment error:", error);
            alert(error instanceof Error ? error.message : "Payment failed");
        } finally{
            setLoading(false);
        }
    };
    // ==================================================
    // PAYMENT PAGE
    // ==================================================
    if (paymentStep) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md rounded-2xl border border-gray-800 bg-[#111111] p-6 shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold",
                                        children: "Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-gray-500",
                                        children: "Premium subscription"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setPaymentStep(false),
                                disabled: loading,
                                className: "rounded-full border border-gray-700 px-3 py-1 text-gray-400 hover:bg-gray-800",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-5 rounded-xl border border-gray-800 bg-[#151515] p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "Amount to pay"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 330,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-3xl font-bold",
                                children: "₹999"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-gray-500",
                                children: "Premium · 1 year"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 329,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-sm font-medium text-gray-400",
                        children: "Choose payment method"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setPaymentMethod("UPI"),
                                disabled: loading,
                                className: `rounded-xl border px-4 py-3 text-sm font-semibold transition ${paymentMethod === "UPI" ? "border-white bg-white text-black" : "border-gray-700 text-gray-400 hover:bg-gray-800"}`,
                                children: "📱 UPI"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setPaymentMethod("CARD"),
                                disabled: loading,
                                className: `rounded-xl border px-4 py-3 text-sm font-semibold transition ${paymentMethod === "CARD" ? "border-white bg-white text-black" : "border-gray-700 text-gray-400 hover:bg-gray-800"}`,
                                children: "💳 Card"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 349,
                        columnNumber: 11
                    }, this),
                    paymentMethod === "UPI" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-2 block text-sm text-gray-400",
                                children: "UPI ID"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 385,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "example@upi",
                                value: upiId,
                                onChange: (e)=>setUpiId(e.target.value),
                                className: "w-full rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 389,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-gray-600",
                                children: "Example: yourname@upi"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 399,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 384,
                        columnNumber: 13
                    }, this),
                    paymentMethod === "CARD" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-2 block text-sm text-gray-400",
                                        children: "Card number"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        inputMode: "numeric",
                                        maxLength: 16,
                                        placeholder: "1234567812345678",
                                        value: cardNumber,
                                        onChange: (e)=>setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16)),
                                        className: "w-full rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 415,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 410,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-2 block text-sm text-gray-400",
                                        children: "Name on card"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 433,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Your Name",
                                        value: cardName,
                                        onChange: (e)=>setCardName(e.target.value),
                                        className: "w-full rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 437,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 432,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "mb-2 block text-sm text-gray-400",
                                                children: "Expiry"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                                lineNumber: 451,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                maxLength: 5,
                                                placeholder: "MM/YY",
                                                value: cardExpiry,
                                                onChange: (e)=>setCardExpiry(e.target.value),
                                                className: "w-full rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                                lineNumber: 455,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "mb-2 block text-sm text-gray-400",
                                                children: "CVV"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                                lineNumber: 470,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                inputMode: "numeric",
                                                maxLength: 3,
                                                placeholder: "123",
                                                value: cardCvv,
                                                onChange: (e)=>setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3)),
                                                className: "w-full rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                                lineNumber: 474,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                        lineNumber: 469,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                lineNumber: 448,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 408,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePayment,
                        disabled: loading,
                        className: "mt-6 w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50",
                        children: loading ? "Processing Payment..." : "Pay ₹999"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 498,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setPaymentStep(false),
                        disabled: loading,
                        className: "mt-3 w-full rounded-full border border-gray-700 py-3 text-sm text-gray-400 hover:bg-gray-800",
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                        lineNumber: 508,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                lineNumber: 305,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
            lineNumber: 304,
            columnNumber: 7
        }, this);
    }
    // ==================================================
    // SUBSCRIPTION PAGE
    // ==================================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md rounded-2xl border border-gray-800 bg-[#111111] p-6 shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold",
                                    children: "Subscription"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 533,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-gray-500",
                                    children: "Choose your MusicStream plan"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 537,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 532,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "rounded-full border border-gray-700 px-3 py-1 text-gray-400 hover:bg-gray-800",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 542,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                    lineNumber: 531,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-gray-800 bg-[#151515] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500",
                            children: "Current plan"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, this),
                        checkingPlan ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-lg text-gray-400",
                            children: "Checking..."
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 559,
                            columnNumber: 13
                        }, this) : isPremium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-1 text-xl font-bold",
                                    children: "⭐ Premium"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 564,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-gray-500",
                                    children: "₹999 / year"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 568,
                                    columnNumber: 15
                                }, this),
                                currentPlan?.END_DATE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-gray-400",
                                    children: [
                                        "Valid until",
                                        " ",
                                        new Date(currentPlan.END_DATE).toLocaleDateString("en-IN")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 573,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 563,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-1 text-xl font-bold",
                                    children: "Free"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 583,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm text-gray-500",
                                    children: "You are currently on the Free plan."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 587,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 582,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                    lineNumber: 552,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 rounded-2xl border border-gray-800 bg-[#151515] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold",
                            children: "⭐ Premium"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 599,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-3xl font-bold",
                            children: [
                                "₹999",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-normal text-gray-500",
                                    children: [
                                        " ",
                                        "/ year"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 605,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 603,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-5 space-y-2 text-sm text-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "✓ Premium subscription"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 612,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "✓ One year validity"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 613,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "✓ MusicStream Premium account"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                                    lineNumber: 614,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 611,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleGetPremium,
                            disabled: checkingPlan || isPremium,
                            className: "mt-6 w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50",
                            children: checkingPlan ? "Checking..." : isPremium ? "Already Premium" : "Get Premium"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                            lineNumber: 617,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
                    lineNumber: 597,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
            lineNumber: 527,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/components/SubscriptionModal.tsx",
        lineNumber: 526,
        columnNumber: 5
    }, this);
}
_s(SubscriptionModal, "y1qve7gwLYonJ6HfWH2obl+psu4=");
_c = SubscriptionModal;
var _c;
__turbopack_context__.k.register(_c, "SubscriptionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$AuthModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/components/AuthModel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$SubscriptionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/components/SubscriptionModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// app/page.tsx
"use client";
;
;
;
const API_URL = "http://localhost:5000";
function Home() {
    _s();
    const [songs, setSongs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [artists, setArtists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [albums, setAlbums] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [podcasts, setPodcasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [playlists, setPlaylists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingPlaylist, setEditingPlaylist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newPlaylistTitle, setNewPlaylistTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingAlbum, setEditingAlbum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newAlbumTitle, setNewAlbumTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedPlaylist, setSelectedPlaylist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playlistSongs, setPlaylistSongs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newPlaylistName, setNewPlaylistName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPlaylistForm, setShowPlaylistForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [followedArtists, setFollowedArtists] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedPodcast, setSelectedPodcast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [episodes, setEpisodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentSong, setCurrentSong] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAlbum, setSelectedAlbum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [albumSongs, setAlbumSongs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAuth, setShowAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("login");
    const [subscriptionOpen, setSubscriptionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [subscription, setSubscription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subscriptionLoading, setSubscriptionLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // --------------------------------------------------
    // RESTORE LOGIN
    // --------------------------------------------------
    const openAlbum = async (album)=>{
        try {
            const response = await fetch(`${API_URL}/api/albums/${album.ALBUM_ID}/songs`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to load album songs");
            }
            setSelectedAlbum(album);
            setAlbumSongs(data);
        } catch (error) {
            console.error("View album error:", error);
            alert("Could not load album songs. Check that your backend is running.");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const savedToken = localStorage.getItem("musicstream_token");
            const savedUser = localStorage.getItem("musicstream_user");
            if (savedToken) {
                setToken(savedToken);
            }
            if (savedUser) {
                try {
                    setCurrentUser(JSON.parse(savedUser));
                } catch  {
                    localStorage.removeItem("musicstream_user");
                }
            }
        }
    }["Home.useEffect"], []);
    // --------------------------------------------------
    // LOAD SUBSCRIPTION
    // --------------------------------------------------
    const loadSubscription = async (authToken)=>{
        const activeToken = authToken || token || localStorage.getItem("musicstream_token");
        if (!activeToken) {
            setSubscription(null);
            return;
        }
        setSubscriptionLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/subscriptions/my`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${activeToken}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.status === 404) {
                setSubscription(null);
                return;
            }
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to load subscription");
            }
            setSubscription(data);
        } catch (error) {
            console.error("Subscription loading error:", error);
            setSubscription(null);
        } finally{
            setSubscriptionLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (token) {
                loadSubscription();
            } else {
                setSubscription(null);
            }
        }
    }["Home.useEffect"], [
        token
    ]);
    // --------------------------------------------------
    // LOAD PUBLIC DATA
    // --------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            async function loadPublicData() {
                try {
                    const [songsRes, artistsRes, albumsRes, podcastsRes] = await Promise.all([
                        fetch(`${API_URL}/api/songs`),
                        fetch(`${API_URL}/api/artists`),
                        fetch(`${API_URL}/api/albums`),
                        fetch(`${API_URL}/api/podcasts`)
                    ]);
                    const [songsData, artistsData, albumsData, podcastsData] = await Promise.all([
                        songsRes.json(),
                        artistsRes.json(),
                        albumsRes.json(),
                        podcastsRes.json()
                    ]);
                    const normalizedSongs = songsData.map({
                        "Home.useEffect.loadPublicData.normalizedSongs": (row)=>{
                            if (Array.isArray(row)) {
                                return {
                                    SONG_ID: row[0],
                                    NAME: row[1],
                                    DURATION: row[2],
                                    AUDIO_URL: row[3],
                                    ARTIST_ID: row[4],
                                    ALBUM_ID: row[5],
                                    ARTIST_NAME: row[6],
                                    ALBUM_TITLE: row[7]
                                };
                            }
                            return row;
                        }
                    }["Home.useEffect.loadPublicData.normalizedSongs"]);
                    const normalizedArtists = artistsData.map({
                        "Home.useEffect.loadPublicData.normalizedArtists": (row)=>{
                            if (Array.isArray(row)) {
                                return {
                                    ARTIST_ID: row[0],
                                    NAME: row[1],
                                    BIO: row[2],
                                    SOCIAL_MEDIA: row[3]
                                };
                            }
                            return row;
                        }
                    }["Home.useEffect.loadPublicData.normalizedArtists"]);
                    const normalizedAlbums = albumsData.map({
                        "Home.useEffect.loadPublicData.normalizedAlbums": (row)=>{
                            if (Array.isArray(row)) {
                                return {
                                    ALBUM_ID: row[0],
                                    ARTIST_ID: row[1],
                                    ALBUM_TITLE: row[2],
                                    RELEASE_DATE: row[3],
                                    COVER_PAGE: row[4]
                                };
                            }
                            return row;
                        }
                    }["Home.useEffect.loadPublicData.normalizedAlbums"]);
                    const normalizedPodcasts = podcastsData.map({
                        "Home.useEffect.loadPublicData.normalizedPodcasts": (row)=>{
                            if (Array.isArray(row)) {
                                return {
                                    PODCAST_ID: row[0],
                                    CREATOR_ID: row[1],
                                    TITLE: row[2],
                                    LANGUAGE: row[3],
                                    RELEASE_DATE: row[4],
                                    DESCRIPTION: row[5]
                                };
                            }
                            return row;
                        }
                    }["Home.useEffect.loadPublicData.normalizedPodcasts"]);
                    setSongs(normalizedSongs);
                    setArtists(normalizedArtists);
                    setAlbums(normalizedAlbums);
                    setPodcasts(normalizedPodcasts);
                } catch (error) {
                    console.error("Failed to load public data:", error);
                } finally{
                    setLoading(false);
                }
            }
            loadPublicData();
        }
    }["Home.useEffect"], []);
    // --------------------------------------------------
    // LOAD USER PLAYLISTS
    // --------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!token) {
                setPlaylists([]);
                return;
            }
            async function loadMyPlaylists() {
                try {
                    const response = await fetch(`${API_URL}/api/playlists`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.error || data.details || "Failed to fetch playlists");
                    }
                    const normalizedPlaylists = data.map({
                        "Home.useEffect.loadMyPlaylists.normalizedPlaylists": (row)=>{
                            if (Array.isArray(row)) {
                                return {
                                    PLAYLIST_ID: row[0],
                                    USER_ID: row[1],
                                    PLAYLIST_NAME: row[2],
                                    CREATED_DATE: row[3],
                                    VISIBILITY: row[4]
                                };
                            }
                            return row;
                        }
                    }["Home.useEffect.loadMyPlaylists.normalizedPlaylists"]);
                    setPlaylists(normalizedPlaylists);
                } catch (error) {
                    console.error("Failed to load playlists:", error);
                    setPlaylists([]);
                }
            }
            loadMyPlaylists();
        }
    }["Home.useEffect"], [
        token
    ]);
    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------
    const handleLogout = ()=>{
        localStorage.removeItem("musicstream_token");
        localStorage.removeItem("musicstream_user");
        setToken(null);
        setCurrentUser(null);
        setSubscription(null);
        setFollowedArtists([]);
        alert("Logged out successfully");
    };
    // --------------------------------------------------
    // PREMIUM
    // --------------------------------------------------
    const handlePremiumClick = ()=>{
        if (!token || !currentUser) {
            alert("Please login first.");
            return;
        }
        setSubscriptionOpen(true);
    };
    // --------------------------------------------------
    // PODCASTS
    // --------------------------------------------------
    const openPodcast = async (podcast)=>{
        try {
            const podcastId = podcast.PODCAST_ID;
            if (!podcastId) {
                throw new Error("Podcast ID is missing");
            }
            const response = await fetch(`${API_URL}/api/episodes/podcast/${podcastId}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to fetch podcast episodes");
            }
            const normalizedEpisodes = data.map((row)=>{
                if (Array.isArray(row)) {
                    return {
                        EPISODE_ID: row[0],
                        PODCAST_ID: row[1],
                        EPISODE_NO: row[2],
                        TITLE: row[3],
                        DURATION: row[4],
                        DESCRIPTION: row[5],
                        RELEASE_DATE: row[6],
                        AUDIO_URL: row[7]
                    };
                }
                return row;
            });
            setSelectedPodcast(podcast);
            setEpisodes(normalizedEpisodes);
            setTimeout(()=>{
                document.getElementById("podcast-details")?.scrollIntoView({
                    behavior: "smooth"
                });
            }, 100);
        } catch (error) {
            console.error("Open podcast error:", error);
            alert(error instanceof Error ? error.message : "Failed to load podcast");
        }
    };
    const closePodcast = ()=>{
        setSelectedPodcast(null);
        setEpisodes([]);
    };
    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------
    const filteredSongs = songs.filter((song)=>String(song.NAME || "").toLowerCase().includes(search.toLowerCase()));
    // --------------------------------------------------
    // HELPERS
    // --------------------------------------------------
    const formatDuration = (seconds)=>{
        if (!seconds || Number.isNaN(seconds)) {
            return "0:00";
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    const getSongImage = (songId)=>{
        const images = {
            1: "/images/Tell Me What.jpg",
            2: "/images/Running Night.jpg",
            3: "/images/Passacaglia.jpg",
            4: "/images/Fur Elise.jpg"
        };
        return images[songId] || "/images/default.jpg";
    };
    // --------------------------------------------------
    // AUDIO
    // --------------------------------------------------
    const handlePlay = (song)=>{
        setCurrentSong(song);
        setCurrentTime(0);
        setIsPlaying(true);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!currentSong || !audioRef.current) {
                return;
            }
            audioRef.current.load();
            audioRef.current.play().then({
                "Home.useEffect": ()=>{
                    setIsPlaying(true);
                }
            }["Home.useEffect"]).catch({
                "Home.useEffect": (error)=>{
                    console.error("Audio playback failed:", error);
                    setIsPlaying(false);
                }
            }["Home.useEffect"]);
        }
    }["Home.useEffect"], [
        currentSong
    ]);
    const handlePlayPause = async ()=>{
        if (!currentSong || !audioRef.current) {
            return;
        }
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Audio playback failed:", error);
                setIsPlaying(false);
            }
        }
    };
    const handleSeek = (value)=>{
        setCurrentTime(value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
    };
    // --------------------------------------------------
    // PLAYLISTS
    // --------------------------------------------------
    const openPlaylist = async (playlist)=>{
        try {
            const playlistId = playlist.PLAYLIST_ID;
            if (!playlistId) {
                throw new Error("Playlist ID is missing");
            }
            const response = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to fetch playlist songs");
            }
            const normalizedSongs = data.map((row)=>{
                if (Array.isArray(row)) {
                    return {
                        SONG_ID: row[0],
                        NAME: row[1],
                        DURATION: row[2],
                        AUDIO_URL: row[3],
                        ARTIST_ID: row[4],
                        ALBUM_ID: row[5],
                        ARTIST_NAME: row[6],
                        ALBUM_TITLE: row[7]
                    };
                }
                return row;
            });
            setSelectedPlaylist(playlist);
            setPlaylistSongs(normalizedSongs);
            setTimeout(()=>{
                document.getElementById("playlist-details")?.scrollIntoView({
                    behavior: "smooth"
                });
            }, 100);
        } catch (error) {
            console.error("Open playlist error:", error);
            alert(error instanceof Error ? error.message : "Failed to load playlist");
        }
    };
    const createPlaylist = async ()=>{
        if (!currentUser || !token) {
            setAuthMode("login");
            setShowAuth(true);
            return;
        }
        if (!newPlaylistName.trim()) {
            alert("Please enter a playlist name");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/playlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    playlist_name: newPlaylistName.trim(),
                    visibility: "PUBLIC"
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to create playlist");
            }
            setNewPlaylistName("");
            setShowPlaylistForm(false);
            const playlistsResponse = await fetch(`${API_URL}/api/playlists`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const playlistsData = await playlistsResponse.json();
            if (!playlistsResponse.ok) {
                throw new Error(playlistsData.error || playlistsData.details || "Failed to refresh playlists");
            }
            const normalizedPlaylists = playlistsData.map((row)=>{
                if (Array.isArray(row)) {
                    return {
                        PLAYLIST_ID: row[0],
                        USER_ID: row[1],
                        PLAYLIST_NAME: row[2],
                        CREATED_DATE: row[3],
                        VISIBILITY: row[4]
                    };
                }
                return row;
            });
            setPlaylists(normalizedPlaylists);
            alert("Playlist created successfully!");
        } catch (error) {
            console.error("Create playlist error:", error);
            alert(error instanceof Error ? error.message : "Failed to create playlist");
        }
    };
    const addSongToPlaylist = async (playlistId, songId)=>{
        if (!token) {
            setAuthMode("login");
            setShowAuth(true);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    song_id: songId
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to add song");
            }
            alert("Song added to playlist!");
            if (selectedPlaylist?.PLAYLIST_ID === playlistId) {
                await openPlaylist(selectedPlaylist);
            }
        } catch (error) {
            console.error("Add song error:", error);
            alert(error instanceof Error ? error.message : "Failed to add song to playlist");
        }
    };
    // --------------------------------------------------
    const removeSongFromPlaylist = async (playlistId, songId)=>{
        if (!token) {
            setAuthMode("login");
            setShowAuth(true);
            return;
        }
        if (!window.confirm("Remove this song from the playlist?")) return;
        try {
            const response = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to remove song");
            }
            setPlaylistSongs((current)=>current.filter((song)=>song.SONG_ID !== songId));
            alert("Song removed from playlist.");
        } catch (error) {
            console.error("Remove song from playlist error:", error);
            alert(error instanceof Error ? error.message : "Failed to remove song");
        }
    };
    const deletePlaylist = async (playlistId)=>{
        if (!token) {
            setAuthMode("login");
            setShowAuth(true);
            return;
        }
        if (!window.confirm("Delete this playlist and all its song entries? This cannot be undone.")) return;
        try {
            const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch  {
                console.error("Delete playlist returned non-JSON:", responseText);
                throw new Error(`Server returned HTML instead of JSON (HTTP ${response.status}). Check the backend route.`);
            }
            if (!response.ok) {
                throw new Error(data.error || data.details || "Failed to delete playlist");
            }
            setPlaylists((current)=>current.filter((playlist)=>playlist.PLAYLIST_ID !== playlistId));
            if (selectedPlaylist?.PLAYLIST_ID === playlistId) {
                setSelectedPlaylist(null);
                setPlaylistSongs([]);
            }
            alert("Playlist deleted successfully.");
        } catch (error) {
            console.error("Delete playlist error:", error);
            alert(error instanceof Error ? error.message : "Failed to delete playlist");
        }
    };
    const renamePlaylist = async ()=>{
        if (!editingPlaylist || !token) {
            alert("Please log in first.");
            return;
        }
        const name = newPlaylistTitle.trim();
        if (!name) {
            alert("Please enter a playlist name.");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/playlists/${editingPlaylist.PLAYLIST_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    playlist_name: name
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to rename playlist");
            }
            setPlaylists((current)=>current.map((playlist)=>playlist.PLAYLIST_ID === editingPlaylist.PLAYLIST_ID ? {
                        ...playlist,
                        PLAYLIST_NAME: name
                    } : playlist));
            setSelectedPlaylist((current)=>current?.PLAYLIST_ID === editingPlaylist.PLAYLIST_ID ? {
                    ...current,
                    PLAYLIST_NAME: name
                } : current);
            setEditingPlaylist(null);
            setNewPlaylistTitle("");
            alert("Playlist renamed successfully.");
        } catch (error) {
            console.error("Rename playlist error:", error);
            alert(error instanceof Error ? error.message : "Failed to rename playlist");
        }
    };
    const renameAlbum = async ()=>{
        if (!editingAlbum) return;
        const name = newAlbumTitle.trim();
        if (!name) {
            alert("Please enter an album name.");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/albums/${editingAlbum.ALBUM_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    album_title: name
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to rename album");
            }
            setAlbums((current)=>current.map((album)=>album.ALBUM_ID === editingAlbum.ALBUM_ID ? {
                        ...album,
                        ALBUM_TITLE: name
                    } : album));
            setSelectedAlbum((current)=>current?.ALBUM_ID === editingAlbum.ALBUM_ID ? {
                    ...current,
                    ALBUM_TITLE: name
                } : current);
            setEditingAlbum(null);
            setNewAlbumTitle("");
            alert("Album renamed successfully.");
        } catch (error) {
            console.error("Rename album error:", error);
            alert(error instanceof Error ? error.message : "Failed to rename album");
        }
    };
    // ARTISTS
    // --------------------------------------------------
    const followArtist = async (artistId)=>{
        if (!currentUser || !token) {
            setAuthMode("login");
            setShowAuth(true);
            return;
        }
        try {
            const isFollowed = followedArtists.includes(artistId);
            const response = await fetch(`${API_URL}/api/artists/${artistId}/follow`, {
                method: isFollowed ? "DELETE" : "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.details || (isFollowed ? "Failed to unfollow artist" : "Failed to follow artist"));
            }
            if (isFollowed) {
                setFollowedArtists((current)=>current.filter((id)=>id !== artistId));
            } else {
                setFollowedArtists((current)=>[
                        ...current,
                        artistId
                    ]);
            }
        } catch (error) {
            console.error("Artist follow error:", error);
            alert(error instanceof Error ? error.message : "Something went wrong");
        }
    };
    // --------------------------------------------------
    // NAVIGATION
    // --------------------------------------------------
    const scrollToSection = (id)=>{
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth"
        });
    };
    const handleSearchClick = ()=>{
        scrollToSection("songs");
    };
    const handleLibraryClick = ()=>{
        scrollToSection("playlists");
    };
    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#080808] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef,
                src: currentSong?.AUDIO_URL || undefined,
                onTimeUpdate: (e)=>{
                    setCurrentTime(e.currentTarget.currentTime);
                },
                onEnded: ()=>{
                    setIsPlaying(false);
                    setCurrentTime(0);
                },
                onError: ()=>{
                    console.error("Unable to load audio:", currentSong?.AUDIO_URL);
                    setIsPlaying(false);
                }
            }, void 0, false, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 2030,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$AuthModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: showAuth,
                mode: authMode,
                onClose: ()=>setShowAuth(false),
                onSuccess: async (newToken, user)=>{
                    setToken(newToken);
                    setCurrentUser(user);
                    await loadSubscription(newToken);
                }
            }, authMode, false, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 2078,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$components$2f$SubscriptionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: subscriptionOpen,
                token: token,
                onClose: ()=>setSubscriptionOpen(false),
                onSuccess: async ()=>{
                    setSubscriptionOpen(false);
                    // Immediately reload current plan
                    await loadSubscription();
                }
            }, void 0, false, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 2104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "hidden w-64 flex-shrink-0 border-r border-gray-800 bg-[#0d0d0d] p-6 md:block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold",
                                        children: "MusicStream"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-gray-500",
                                        children: "Music & Podcasts"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2150,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 2140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>scrollToSection("home"),
                                        className: "w-full rounded-lg bg-white px-4 py-3 text-left font-medium text-black",
                                        children: "🏠 Home"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2164,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSearchClick,
                                        className: "w-full rounded-lg px-4 py-3 text-left text-gray-400 hover:bg-gray-800 hover:text-white",
                                        children: "🔍 Search"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLibraryClick,
                                        className: "w-full rounded-lg px-4 py-3 text-left text-gray-400 hover:bg-gray-800 hover:text-white",
                                        children: "❤️ Your Library"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>scrollToSection("playlists"),
                                        className: "w-full rounded-lg px-4 py-3 text-left text-gray-400 hover:bg-gray-800 hover:text-white",
                                        children: "🎧 Playlists"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2210,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>scrollToSection("podcasts"),
                                        className: "w-full rounded-lg px-4 py-3 text-left text-gray-400 hover:bg-gray-800 hover:text-white",
                                        children: "🎙️ Podcasts"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2232,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 2160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-12 border-t border-gray-800 pt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-3 text-xs uppercase tracking-wider text-gray-600",
                                        children: "Account"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2262,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handlePremiumClick,
                                        className: "w-full rounded-lg px-4 py-3 text-left text-gray-400 hover:bg-gray-800 hover:text-white",
                                        children: "⭐ Premium"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2274,
                                        columnNumber: 13
                                    }, this),
                                    currentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "mt-2 w-full rounded-lg px-4 py-3 text-left text-gray-400 hover:bg-gray-800 hover:text-white",
                                        children: "🚪 Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2290,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 2258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 2136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex-1 pb-32",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "sticky top-0 z-10 flex items-center gap-4 border-b border-gray-800 bg-[#080808]/95 px-6 py-4 backdrop-blur",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Search songs...",
                                            value: search,
                                            onChange: (e)=>setSearch(e.target.value),
                                            className: "w-full max-w-xl rounded-full border border-gray-700 bg-[#151515] px-5 py-3 text-sm outline-none placeholder:text-gray-500 focus:border-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 2334,
                                            columnNumber: 5
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2332,
                                        columnNumber: 3
                                    }, this),
                                    currentUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden text-sm text-gray-400 sm:block",
                                                children: [
                                                    "Hi,",
                                                    " ",
                                                    currentUser.FIRST_NAME ?? currentUser.first_name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2358,
                                                columnNumber: 7
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleLogout,
                                                className: "rounded-full border border-gray-700 px-5 py-2 text-sm hover:bg-gray-800",
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2370,
                                                columnNumber: 7
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2354,
                                        columnNumber: 5
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setAuthMode("login");
                                            setShowAuth(true);
                                        },
                                        className: "rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-200",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2388,
                                        columnNumber: 5
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 2328,
                                columnNumber: 1
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "home",
                                className: "px-6 py-8 lg:px-10",
                                children: [
                                    currentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "mb-10 rounded-2xl border border-gray-800 bg-[#111111] p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Current Plan"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2436,
                                                columnNumber: 5
                                            }, this),
                                            subscriptionLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-xl text-gray-400",
                                                children: "Loading..."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2446,
                                                columnNumber: 7
                                            }, this) : String(subscription?.PLAN_TYPE || "").toUpperCase() === "PREMIUM" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-1 text-2xl font-bold",
                                                        children: "⭐ Premium"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2460,
                                                        columnNumber: 9
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-sm text-gray-500",
                                                        children: "₹999 / year"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2468,
                                                        columnNumber: 9
                                                    }, this),
                                                    subscription?.END_DATE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-sm text-gray-400",
                                                        children: [
                                                            "Valid until",
                                                            " ",
                                                            new Date(subscription.END_DATE).toLocaleDateString("en-IN")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2478,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2458,
                                                columnNumber: 7
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "mt-1 text-2xl font-bold",
                                                        children: "Free"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2498,
                                                        columnNumber: 9
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-sm text-gray-500",
                                                        children: "You are currently on the Free plan."
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2506,
                                                        columnNumber: 9
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2496,
                                                columnNumber: 7
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2434,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "mb-10 rounded-2xl border border-gray-800 bg-gradient-to-r from-gray-900 to-[#111111] p-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-2 text-sm text-gray-400",
                                                children: "Welcome to MusicStream"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2530,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-4xl font-bold tracking-tight",
                                                children: [
                                                    "Your music.",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2542,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Your podcasts.",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2546,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Your world."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2538,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-4 max-w-lg text-gray-400",
                                                children: "Discover songs, artists, albums and podcasts powered by your Oracle database."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2554,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>scrollToSection("songs"),
                                                className: "mt-6 rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200",
                                                children: "Explore Music"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2566,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2526,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        id: "songs",
                                        className: "mb-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-5 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-bold",
                                                        children: search ? "Search Results" : "Popular Songs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2610,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-gray-500",
                                                        children: [
                                                            filteredSongs.length,
                                                            " songs"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2622,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2606,
                                                columnNumber: 15
                                            }, this),
                                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400",
                                                children: "Loading songs..."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2636,
                                                columnNumber: 17
                                            }, this) : filteredSongs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500",
                                                children: "No songs found."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2646,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
                                                children: filteredSongs.map((song, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group rounded-xl border border-gray-800 bg-[#111111] p-4 transition hover:-translate-y-1 hover:border-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-4 h-44 overflow-hidden rounded-lg bg-gray-800",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: getSongImage(song.SONG_ID),
                                                                    alt: song.NAME,
                                                                    className: "h-full w-full object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/app/page.tsx",
                                                                    lineNumber: 2682,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2678,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "truncate font-semibold",
                                                                children: song.NAME
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2702,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 truncate text-sm text-gray-400",
                                                                children: song.ARTIST_NAME || "Unknown Artist"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2710,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 truncate text-xs text-gray-600",
                                                                children: song.ALBUM_TITLE || "Single"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2720,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2 text-sm text-gray-500",
                                                                children: formatDuration(song.DURATION)
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2730,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handlePlay(song),
                                                                className: "mt-4 w-full rounded-full bg-white py-2 text-sm font-semibold text-black transition hover:bg-gray-200",
                                                                children: "▶ Play"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2742,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, song.SONG_ID ?? `song-${index}`, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2662,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2654,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2596,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        id: "artists",
                                        className: "mb-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "mb-5 text-2xl font-bold",
                                                children: "Artists"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2796,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                                children: artists.map((artist, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl border border-gray-800 bg-[#111111] p-5 hover:border-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-3xl",
                                                                children: "🎤"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2828,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold",
                                                                children: artist.NAME
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2836,
                                                                columnNumber: 23
                                                            }, this),
                                                            artist.BIO && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-2 line-clamp-2 text-sm text-gray-500",
                                                                children: artist.BIO
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2846,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>followArtist(artist.ARTIST_ID),
                                                                className: `mt-4 rounded-full border px-4 py-2 text-sm transition ${followedArtists.includes(artist.ARTIST_ID) ? "border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700" : "border-gray-700 hover:bg-gray-800"}`,
                                                                children: followedArtists.includes(artist.ARTIST_ID) ? "✓ Followed" : "Follow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2856,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, artist.ARTIST_ID ?? `artist-${index}`, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2812,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2804,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2786,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        id: "albums",
                                        className: "mb-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "mb-5 text-2xl font-bold",
                                                children: "Albums"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2928,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                                children: albums.map((album, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl border border-gray-800 bg-[#111111] p-4 hover:border-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-4 flex h-48 items-center justify-center rounded-lg bg-gray-800 text-5xl",
                                                                children: "💿"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2960,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-semibold",
                                                                children: album.ALBUM_TITLE
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2968,
                                                                columnNumber: 23
                                                            }, this),
                                                            editingAlbum?.ALBUM_ID === album.ALBUM_ID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        value: newAlbumTitle,
                                                                        onChange: (e)=>setNewAlbumTitle(e.target.value),
                                                                        placeholder: "New album name",
                                                                        className: "w-full rounded-lg border border-gray-700 bg-[#151515] px-3 py-2 text-sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 2975,
                                                                        columnNumber: 5
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: renameAlbum,
                                                                                className: "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black",
                                                                                children: "Save"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 2984,
                                                                                columnNumber: 7
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>{
                                                                                    setEditingAlbum(null);
                                                                                    setNewAlbumTitle("");
                                                                                },
                                                                                className: "rounded-full border border-gray-700 px-4 py-2 text-sm",
                                                                                children: "Cancel"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 2991,
                                                                                columnNumber: 7
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 2983,
                                                                        columnNumber: 5
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 2974,
                                                                columnNumber: 3
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    setEditingAlbum(album);
                                                                    setNewAlbumTitle(album.ALBUM_TITLE);
                                                                },
                                                                className: "mt-3 w-full rounded-full border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800",
                                                                children: "Edit Album Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3003,
                                                                columnNumber: 3
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-sm text-gray-500",
                                                                children: [
                                                                    "Artist ID:",
                                                                    " ",
                                                                    album.ARTIST_ID
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3016,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>openAlbum(album),
                                                                className: "mt-4 rounded-full border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800",
                                                                children: "View Album"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3026,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, album.ALBUM_ID ?? `album-${index}`, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 2944,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 2936,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 2918,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        id: "playlists",
                                        className: "mb-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-5 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-bold",
                                                        children: "Your Playlists"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3068,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (!currentUser) {
                                                                setAuthMode("login");
                                                                setShowAuth(true);
                                                                return;
                                                            }
                                                            setShowPlaylistForm(!showPlaylistForm);
                                                        },
                                                        className: "rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-200",
                                                        children: "+ Create Playlist"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3076,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3064,
                                                columnNumber: 15
                                            }, this),
                                            showPlaylistForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6 rounded-xl border border-gray-800 bg-[#111111] p-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "mb-3 font-semibold",
                                                        children: "Create a new playlist"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3120,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: "Playlist name",
                                                                value: newPlaylistName,
                                                                onChange: (e)=>setNewPlaylistName(e.target.value),
                                                                className: "flex-1 rounded-lg border border-gray-700 bg-[#151515] px-4 py-3 text-sm outline-none focus:border-gray-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3132,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: createPlaylist,
                                                                className: "rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-gray-200",
                                                                children: "Create"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3160,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3128,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3116,
                                                columnNumber: 17
                                            }, this),
                                            playlists.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border border-gray-800 bg-[#111111] p-6 text-gray-500",
                                                children: "You don't have any playlists yet."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3190,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                                children: playlists.map((playlist, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl border border-gray-800 bg-[#111111] p-5 hover:border-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-800 text-5xl",
                                                                children: "🎧"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3224,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold",
                                                                children: playlist.PLAYLIST_NAME
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3232,
                                                                columnNumber: 25
                                                            }, this),
                                                            editingPlaylist?.PLAYLIST_ID === playlist.PLAYLIST_ID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        value: newPlaylistTitle,
                                                                        onChange: (e)=>setNewPlaylistTitle(e.target.value),
                                                                        placeholder: "New playlist name",
                                                                        className: "w-full rounded-lg border border-gray-700 bg-[#151515] px-3 py-2 text-sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3243,
                                                                        columnNumber: 5
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: renamePlaylist,
                                                                                className: "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black",
                                                                                children: "Save"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 3252,
                                                                                columnNumber: 7
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>{
                                                                                    setEditingPlaylist(null);
                                                                                    setNewPlaylistTitle("");
                                                                                },
                                                                                className: "rounded-full border border-gray-700 px-4 py-2 text-sm",
                                                                                children: "Cancel"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 3259,
                                                                                columnNumber: 7
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3251,
                                                                        columnNumber: 5
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3242,
                                                                columnNumber: 3
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    setEditingPlaylist(playlist);
                                                                    setNewPlaylistTitle(playlist.PLAYLIST_NAME);
                                                                },
                                                                className: "mt-3 w-full rounded-full border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800",
                                                                children: "Edit Playlist Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3271,
                                                                columnNumber: 3
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-sm text-gray-500",
                                                                children: playlist.VISIBILITY || "PRIVATE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3284,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>openPlaylist(playlist),
                                                                className: "mt-4 w-full rounded-full border border-gray-700 py-2 text-sm hover:bg-gray-800",
                                                                children: "View Playlist"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3294,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>deletePlaylist(playlist.PLAYLIST_ID),
                                                                className: "mt-2 w-full rounded-full border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950",
                                                                children: "Delete Playlist"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3317,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, playlist.PLAYLIST_ID ?? `playlist-${index}`, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3208,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3200,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 3054,
                                        columnNumber: 13
                                    }, this),
                                    selectedPlaylist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        id: "playlist-details",
                                        className: "mb-12 rounded-xl border border-gray-800 bg-[#111111] p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-500",
                                                                children: "Playlist"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3386,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-bold",
                                                                children: selectedPlaylist.PLAYLIST_NAME
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3394,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3384,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setSelectedPlaylist(null);
                                                            setPlaylistSongs([]);
                                                        },
                                                        className: "rounded-full border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800",
                                                        children: "Close"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3408,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3380,
                                                columnNumber: 17
                                            }, this),
                                            playlistSongs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500",
                                                children: "This playlist is empty."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3440,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: playlistSongs.map((song, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between rounded-lg border border-gray-800 bg-[#151515] p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium",
                                                                        children: song.NAME
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3476,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: song.ARTIST_NAME || "Unknown Artist"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3484,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600",
                                                                        children: song.ALBUM_TITLE || "Single"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3494,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-sm text-gray-500",
                                                                        children: formatDuration(song.DURATION)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3504,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3472,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handlePlay(song),
                                                                        className: "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200",
                                                                        children: "▶ Play"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3521,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeSongFromPlaylist(selectedPlaylist.PLAYLIST_ID, song.SONG_ID),
                                                                        className: "rounded-full border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950",
                                                                        children: "Remove Song"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3527,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3520,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, song.SONG_ID ?? `playlist-song-${index}`, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3456,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3448,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 border-t border-gray-800 pt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "mb-4 font-semibold",
                                                        children: "Add Songs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3560,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: songs.map((song)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between rounded-lg bg-[#151515] px-4 py-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "min-w-0 flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "truncate font-medium text-white",
                                                                                children: song.NAME
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 3588,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "truncate text-sm text-gray-500",
                                                                                children: song.ARTIST_NAME || "Unknown Artist"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 3596,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3584,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: song.DURATION
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3610,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>addSongToPlaylist(selectedPlaylist.PLAYLIST_ID, song.SONG_ID),
                                                                        className: "rounded-full border border-gray-700 px-3 py-1 text-xs hover:bg-gray-800",
                                                                        children: "+ Add"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3618,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, song.SONG_ID, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3574,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3568,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3556,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 3370,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        id: "podcasts",
                                        className: "mb-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "mb-5 text-2xl font-bold",
                                                children: "Podcasts"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3676,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                                children: podcasts.map((podcast, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-xl border border-gray-800 bg-[#111111] p-5 hover:border-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-800 text-5xl",
                                                                children: "🎙️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3708,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold",
                                                                children: podcast.TITLE
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3716,
                                                                columnNumber: 23
                                                            }, this),
                                                            podcast.LANGUAGE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-sm text-gray-500",
                                                                children: [
                                                                    "Language:",
                                                                    " ",
                                                                    podcast.LANGUAGE
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3726,
                                                                columnNumber: 25
                                                            }, this),
                                                            podcast.DESCRIPTION && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 line-clamp-2 text-sm text-gray-500",
                                                                children: podcast.DESCRIPTION
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3740,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>openPodcast(podcast),
                                                                className: "mt-4 rounded-full border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800",
                                                                children: "View Podcast"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3750,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, podcast.PODCAST_ID ?? `podcast-${index}`, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3692,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3684,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 3666,
                                        columnNumber: 13
                                    }, this),
                                    selectedPodcast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        id: "podcast-details",
                                        className: "mb-12 rounded-xl border border-gray-800 bg-[#111111] p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6 flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-500",
                                                                children: "Podcast"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3812,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-2xl font-bold",
                                                                children: selectedPodcast.TITLE
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3820,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-sm text-gray-400",
                                                                children: [
                                                                    episodes.length,
                                                                    " episode",
                                                                    episodes.length !== 1 ? "s" : ""
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3832,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3808,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: closePodcast,
                                                        className: "rounded-full border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800",
                                                        children: "Back"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3850,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3804,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: episodes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border border-gray-800 bg-gray-900 p-6 text-gray-400",
                                                    children: "No episodes available."
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/page.tsx",
                                                    lineNumber: 3880,
                                                    columnNumber: 21
                                                }, this) : episodes.map((episode, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4 transition hover:bg-gray-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex min-w-0 items-center gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-sm",
                                                                        children: episode.EPISODE_NO
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3914,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                className: "truncate font-medium",
                                                                                children: episode.TITLE
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 3930,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            episode.DESCRIPTION && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 line-clamp-1 text-sm text-gray-500",
                                                                                children: episode.DESCRIPTION
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 3944,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            episode.DURATION ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 text-xs text-gray-500",
                                                                                children: formatDuration(episode.DURATION)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                                lineNumber: 3960,
                                                                                columnNumber: 33
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/frontend/app/page.tsx",
                                                                        lineNumber: 3926,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3910,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    if (!episode.AUDIO_URL) {
                                                                        alert("No audio available for this episode.");
                                                                        return;
                                                                    }
                                                                    const episodeAsSong = {
                                                                        SONG_ID: episode.EPISODE_ID,
                                                                        NAME: episode.TITLE,
                                                                        DURATION: episode.DURATION ?? 0,
                                                                        AUDIO_URL: episode.AUDIO_URL,
                                                                        ARTIST_ID: 0,
                                                                        ALBUM_ID: 0
                                                                    };
                                                                    handlePlay(episodeAsSong);
                                                                },
                                                                className: "ml-4 shrink-0 rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-gray-200",
                                                                children: "▶ Play"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/app/page.tsx",
                                                                lineNumber: 3982,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, episode.EPISODE_ID ?? `episode-${index}`, true, {
                                                        fileName: "[project]/frontend/app/page.tsx",
                                                        lineNumber: 3894,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/page.tsx",
                                                lineNumber: 3872,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 3794,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 2414,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 2316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 2128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-20 border-t border-gray-800 bg-[#0d0d0d] px-5 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: currentSong ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-sm font-medium",
                                        children: currentSong.NAME
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 4108,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-xs text-gray-500",
                                        children: currentSong.ARTIST_ID === 0 ? "Podcast Episode" : "Music"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 4116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            formatDuration(currentTime),
                                            " ",
                                            "/",
                                            " ",
                                            formatDuration(currentSong.DURATION)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 4130,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 4106,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-sm font-medium",
                                        children: "Select a song to start listening"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 4154,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "MusicStream Player"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/page.tsx",
                                        lineNumber: 4164,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 4152,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !currentSong,
                                    className: "rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-40",
                                    children: "⏮"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 4184,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handlePlayPause,
                                    disabled: !currentSong,
                                    className: "flex h-11 w-11 items-center justify-center rounded-full bg-white text-black disabled:opacity-40",
                                    children: isPlaying ? "⏸" : "▶"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 4198,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !currentSong,
                                    className: "rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-40",
                                    children: "⏭"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 4222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden flex-1 md:block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-1 flex justify-between text-xs text-gray-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: formatDuration(currentTime)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 4248,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: currentSong ? formatDuration(currentSong.DURATION) : "0:00"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 4260,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 4244,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0",
                                    max: currentSong?.DURATION || 0,
                                    value: Math.min(currentTime, currentSong?.DURATION || 0),
                                    onChange: (e)=>handleSeek(Number(e.target.value)),
                                    disabled: !currentSong,
                                    className: "w-full cursor-pointer accent-white disabled:cursor-not-allowed"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 4280,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/page.tsx",
                    lineNumber: 4096,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 4092,
                columnNumber: 7
            }, this),
            selectedAlbum && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-lg rounded-xl border border-gray-700 bg-[#111111] p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold",
                            children: selectedAlbum.ALBUM_TITLE
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4340,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-gray-400",
                            children: "Songs in this album"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4344,
                            columnNumber: 7
                        }, this),
                        albumSongs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-gray-400",
                            children: "No songs found in this album."
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4349,
                            columnNumber: 9
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 space-y-3",
                            children: albumSongs.map((song)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-gray-800 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: song.NAME
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 4359,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-400",
                                            children: [
                                                song.ARTIST_NAME,
                                                " · ",
                                                Math.floor(song.DURATION / 60),
                                                ":",
                                                String(song.DURATION % 60).padStart(2, "0")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/app/page.tsx",
                                            lineNumber: 4360,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, song.SONG_ID, true, {
                                    fileName: "[project]/frontend/app/page.tsx",
                                    lineNumber: 4355,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4353,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setSelectedAlbum(null);
                                setAlbumSongs([]);
                            },
                            className: "mt-6 rounded-full border border-gray-700 px-4 py-2 hover:bg-gray-800",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 4369,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/app/page.tsx",
                    lineNumber: 4339,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 4338,
                columnNumber: 3
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/page.tsx",
        lineNumber: 2025,
        columnNumber: 5
    }, this);
}
_s(Home, "l3TcX2UQs0dHOC9jbEL0ki+eR6E=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_app_10wctij._.js.map