import originalApiStructure from 'helpers/apiStructure';

const apiStructure = JSON.parse(JSON.stringify(originalApiStructure));

// Analytics
apiStructure.createAnalytic.action = require('./actions/analytics/create');
apiStructure.loadAnalytics.action = require('./actions/analytics/load');

// Auth
apiStructure.loadAuth.action = require('./actions/auth/load');
apiStructure.login.action = require('./actions/auth/login');
apiStructure.logout.action = require('./actions/auth/logout');
apiStructure.logoutFromAllDevices.action = require('./actions/auth/logoutAll');
apiStructure.requestVerificationEmail.action = require('./actions/auth/requestVerificationEmail');
apiStructure.verifyEmail.action = require('./actions/auth/verifyEmail');

// login
apiStructure.loadMagicLinks.action = require('./actions/magicLinks/loadAll');
apiStructure.loginWithMagicLink.action = require('./actions/magicLinks/login');
apiStructure.requestMagicLink.action = require('./actions/magicLinks/requestMagicLink');

// Blogs
apiStructure.createBlog.action = require('./actions/blogs/create');
apiStructure.deleteBlog.action = require('./actions/blogs/delete');
apiStructure.loadBlogs.action = require('./actions/blogs/loadAll');
apiStructure.loadBlog.action = require('./actions/blogs/loadSingle');
apiStructure.updateBlog.action = require('./actions/blogs/update');

// Comments
apiStructure.createComment.action = require('./actions/comments/create');
apiStructure.deleteComment.action = require('./actions/comments/delete');
apiStructure.loadComments.action = require('./actions/comments/loadAll');
apiStructure.loadComment.action = require('./actions/comments/loadSingle');
apiStructure.updateComment.action = require('./actions/comments/update');

// Data
apiStructure.backupAllData.action = require('./actions/dataManagement/backup');
apiStructure.deleteEntity.action = require('./actions/dataManagement/deleteEntity');
apiStructure.deleteSet.action = require('./actions/dataManagement/deleteSet');
apiStructure.restoreBackup.action = require('./actions/dataManagement/restore');

// Make payment
apiStructure.loadPayment.action = require('./actions/makePayment/load');
apiStructure.createPaymentIntent.action = require('./actions/makePayment/createIntent');
apiStructure.resendPaymentReceipt.action = require('./actions/makePayment/resendPaymentReceipt');

// Monzo
apiStructure.loadMonzoPots.action = require('./actions/monzo/loadPots');
apiStructure.loadMonzoTransactions.action = require('./actions/monzo/loadLatestTransactions');
apiStructure.setMonzoAPIKey.action = require('./actions/monzo/setKey');

// Notifications
apiStructure.createNotification.action = require('./actions/notifications/create');
apiStructure.deleteNotification.action = require('./actions/notifications/delete');
apiStructure.loadNotifications.action = require('./actions/notifications/load');
apiStructure.loadNotification.action = require('./actions/notifications/loadSingle');
apiStructure.updateNotification.action = require('./actions/notifications/update');

// Payments
apiStructure.createPayment.action = require('./actions/payments/create');
apiStructure.deletePayment.action = require('./actions/payments/delete');
apiStructure.loadPayments.action = require('./actions/payments/loadAll');

// Support
apiStructure.createSupport.action = require('./actions/support/create');
apiStructure.deleteSupport.action = require('./actions/support/delete');
apiStructure.loadSupport.action = require('./actions/support/load');

// Users
apiStructure.createUser.action = require('./actions/users/create');
apiStructure.deleteUser.action = require('./actions/users/delete');
apiStructure.loadUser.action = require('./actions/users/loadSingle');
apiStructure.loadUsers.action = require('./actions/users/load');
apiStructure.signUp.action = require('./actions/users/signUp');
apiStructure.updateUser.action = require('./actions/users/update');

export default apiStructure;
