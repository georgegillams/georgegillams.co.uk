import originalApiStructure from 'helpers/apiStructure';

const apiStructure = JSON.parse(JSON.stringify(originalApiStructure));

// Analytics
apiStructure.createAnalytic.action = require('./actions/common/analytics/create');
apiStructure.loadAnalytics.action = require('./actions/common/analytics/loadAll');
apiStructure.loadAnalyticsSummary.action = require('./actions/common/analytics/loadSummary');

// Auth
apiStructure.loadAuth.action = require('./actions/common/auth/load');
apiStructure.logout.action = require('./actions/common/auth/logout');
apiStructure.requestVerificationEmail.action = require('./actions/common/auth/requestVerificationEmail');
apiStructure.verifyEmail.action = require('./actions/common/auth/verifyEmail');

// login
apiStructure.loginWithMagicLink.action = require('./actions/common/magicLinks/login');
apiStructure.requestMagicLink.action = require('./actions/common/magicLinks/requestMagicLink');

// Data
apiStructure.backupAllData.action = require('./actions/common/dataManagement/backup');
apiStructure.deleteEntity.action = require('./actions/common/dataManagement/deleteEntity');
apiStructure.deleteSet.action = require('./actions/common/dataManagement/deleteSet');
apiStructure.restoreBackup.action = require('./actions/common/dataManagement/restore');

// Notifications
apiStructure.createNotification.action = require('./actions/common/notifications/create');
apiStructure.deleteNotification.action = require('./actions/common/notifications/delete');
apiStructure.loadNotifications.action = require('./actions/common/notifications/loadAll');
apiStructure.loadNotification.action = require('./actions/common/notifications/loadSingle');
apiStructure.updateNotification.action = require('./actions/common/notifications/update');

// Users
apiStructure.createUser.action = require('./actions/common/users/create');
apiStructure.deleteUser.action = require('./actions/common/users/delete');
apiStructure.loadUser.action = require('./actions/common/users/loadSingle');
apiStructure.loadUsers.action = require('./actions/common/users/load');
apiStructure.signUp.action = require('./actions/common/users/signUp');
apiStructure.updateUser.action = require('./actions/common/users/update');

// #region app-specific
// Blogs
apiStructure.createBlog.action = require('./actions/blogs/create');
apiStructure.deleteBlog.action = require('./actions/blogs/delete');
apiStructure.loadBlogs.action = require('./actions/blogs/loadAll');
apiStructure.loadBlog.action = require('./actions/blogs/loadSingle');
apiStructure.updateBlog.action = require('./actions/blogs/update');

// Make payment
apiStructure.loadPayment.action = require('./actions/makePayment/load');
apiStructure.createPaymentIntent.action = require('./actions/makePayment/createIntent');
apiStructure.resendPaymentReceipt.action = require('./actions/makePayment/resendPaymentReceipt');

// Payments
apiStructure.createPayment.action = require('./actions/payments/create');
apiStructure.deletePayment.action = require('./actions/payments/delete');
apiStructure.loadPayments.action = require('./actions/payments/loadAll');

// Support
apiStructure.createSupport.action = require('./actions/support/create');
apiStructure.deleteSupport.action = require('./actions/support/delete');
apiStructure.loadSupport.action = require('./actions/support/loadAll');
// #endregion app-specific

export default apiStructure;
