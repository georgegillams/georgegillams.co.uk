```
modified:   app/containers/Account/saga.js
modified:   app/containers/Authenticator/saga.js
modified:   app/containers/EmailVerification/saga.js
modified:   app/containers/Login/saga.js
modified:   app/containers/MagicLogin/saga.js
modified:   app/containers/SignUpGG/saga.js
modified:   config/jest.config.js
modified:   server/api/actions/analytics/create.js
modified:   server/api/actions/analytics/load.js
renamed:    server/api/actions/analytics/analyticsAllowedAttributes.js -> server/api/actions/analytics/private/analyticsAllowedAttributes.js
new file:   server/api/actions/auth/index.js
renamed:    server/api/actions/loadAuth.js -> server/api/actions/auth/load.js
renamed:    server/api/actions/login.js -> server/api/actions/auth/login.js
renamed:    server/api/actions/logout.js -> server/api/actions/auth/logout.js
renamed:    server/api/actions/logoutall.js -> server/api/actions/auth/logoutAll.js
renamed:    server/api/actions/users/usersAllowedAttributes.js -> server/api/actions/auth/private/authAllowedAttributes.js
renamed:    server/api/actions/requestVerificationEmail.js -> server/api/actions/auth/requestVerificationEmail.js
renamed:    server/api/actions/verifyemail.js -> server/api/actions/auth/verifyEmail.js
modified:   server/api/actions/comments/create.js
modified:   server/api/actions/comments/load.js
modified:   server/api/actions/comments/loadSingle.js
renamed:    server/api/actions/comments/commentsAllowedAttributes.js -> server/api/actions/comments/private/commentsAllowedAttributes.js
modified:   server/api/actions/comments/remove.js
modified:   server/api/actions/comments/update.js
deleted:    server/api/actions/data-management/index.js
renamed:    server/api/actions/data-management/backup.js -> server/api/actions/dataManagement/backup.js
renamed:    server/api/actions/deleteEntity.js -> server/api/actions/dataManagement/deleteEntity.js
renamed:    server/api/actions/deleteEntity.test.js -> server/api/actions/dataManagement/deleteEntity.test.js
renamed:    server/api/actions/deleteSet.js -> server/api/actions/dataManagement/deleteSet.js
new file:   server/api/actions/dataManagement/index.js
renamed:    server/api/actions/data-management/loadAllData.js -> server/api/actions/dataManagement/private/loadAllData.js
renamed:    server/api/actions/data-management/performRestoration.js -> server/api/actions/dataManagement/private/performRestoration.js
renamed:    server/api/actions/data-management/restore.js -> server/api/actions/dataManagement/restore.js
deleted:    server/api/actions/ghOrgData.js
modified:   server/api/actions/index.js
deleted:    server/api/actions/loadInfo.js
new file:   server/api/actions/magicLinks/index.js
renamed:    server/api/actions/getmagiclink.js -> server/api/actions/magicLinks/load.js
renamed:    server/api/actions/magiclinks/load.js -> server/api/actions/magicLinks/loadAll.js
renamed:    server/api/actions/loginmagiclink.js -> server/api/actions/magicLinks/login.js
new file:   server/api/actions/magicLinks/private/magicLinksAllowedAttributes.js
deleted:    server/api/actions/magiclinks/index.js
renamed:    server/api/actions/make-payment/createIntent.js -> server/api/actions/makePayment/createIntent.js
renamed:    server/api/actions/make-payment/index.js -> server/api/actions/makePayment/index.js
renamed:    server/api/actions/make-payment/load.js -> server/api/actions/makePayment/load.js
renamed:    server/api/actions/make-payment/fetchPaymentDataFromStripe.js -> server/api/actions/makePayment/private/fetchPaymentDataFromStripe.js
renamed:    server/api/actions/make-payment/formatStripeError.js -> server/api/actions/makePayment/private/formatStripeError.js
renamed:    server/api/actions/make-payment/getPaymentAndBalance.js -> server/api/actions/makePayment/private/getPaymentAndBalance.js
renamed:    server/api/actions/make-payment/sendUnsentPaymentReceipts.js -> server/api/actions/makePayment/private/sendUnsentPaymentReceipts.js
renamed:    server/api/actions/make-payment/stripe.js -> server/api/actions/makePayment/private/stripe.js
renamed:    server/api/actions/make-payment/stripePaymentsAllowedAttributes.js -> server/api/actions/makePayment/private/stripePaymentsAllowedAttributes.js
renamed:    server/api/actions/make-payment/resendPaymentReceipt.js -> server/api/actions/makePayment/resendPaymentReceipt.js
modified:   server/api/actions/monzo/loadLatestTransactions.js
modified:   server/api/actions/monzo/loadPots.js
renamed:    server/api/actions/monzo/helpers.js -> server/api/actions/monzo/private/helpers.js
renamed:    server/api/actions/monzo/potConfigs.js -> server/api/actions/monzo/private/potConfigs.js
modified:   server/api/actions/notifications/create.js
modified:   server/api/actions/notifications/load.js
modified:   server/api/actions/notifications/loadSingle.js
renamed:    server/api/actions/notifications/notificationsAllowedAttributes.js -> server/api/actions/notifications/private/notificationsAllowedAttributes.js
modified:   server/api/actions/notifications/remove.js
modified:   server/api/actions/notifications/update.js
modified:   server/api/actions/payments/create.js
modified:   server/api/actions/payments/load.js
renamed:    server/api/actions/payments/paymentsAllowedAttributes.js -> server/api/actions/payments/private/paymentsAllowedAttributes.js
deleted:    server/api/actions/signUpEpicc.js
modified:   server/api/actions/userDetails/load.js
modified:   server/api/actions/userDetails/loadAll.js
renamed:    server/api/actions/userDetails/userDetailsAllowedAttributes.js -> server/api/actions/userDetails/private/userDetailsAllowedAttributes.js
modified:   server/api/actions/userDetails/remove.js
modified:   server/api/actions/userDetails/update.js
modified:   server/api/actions/users/create.js
modified:   server/api/actions/users/emailtaken.js
modified:   server/api/actions/users/index.js
modified:   server/api/actions/users/load.js
new file:   server/api/actions/users/private/usersAllowedAttributes.js
modified:   server/api/actions/users/remove.js
renamed:    server/api/actions/signUp.js -> server/api/actions/users/signUp.js
renamed:    server/api/actions/signUp.test.js -> server/api/actions/users/signUp.test.js
modified:   server/api/actions/users/unametaken.js
modified:   server/api/actions/users/update.js
deleted:    server/api/actions/widget/index.js
deleted:    server/api/actions/widget/load.js
deleted:    server/api/actions/widget/update.js
```
