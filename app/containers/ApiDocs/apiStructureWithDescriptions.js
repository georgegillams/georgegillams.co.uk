import apiStructure from 'helpers/apiStructure';

// Analytics
apiStructure.createAnalytic.description =
  'Registers information about the page navigated to';
apiStructure.createAnalytic.authorisation = 'None';
apiStructure.loadAnalytics.description = 'Loads all raw analytic points';
apiStructure.loadAnalytics.authorisation = 'Admin only';
apiStructure.loadAnalyticsSummary.description =
  'Loads a summary of unique analytic points';
apiStructure.loadAnalyticsSummary.authorisation = 'Admin only';

// Auth
apiStructure.loadAuth.description =
  'Loads the currently authenticated used. Returns null if signed out';
apiStructure.loadAuth.authorisation = 'None';
apiStructure.logout.description = 'Logs out the currently authenticated user';
apiStructure.logout.authorisation = 'None';
apiStructure.requestVerificationEmail.description =
  'Resends an email verification email';
apiStructure.requestVerificationEmail.authorisation = 'Any user';
apiStructure.verifyEmail.description =
  'Verify an email address with a secret verification key';
apiStructure.verifyEmail.authorisation = 'None';

// Login
apiStructure.loginWithMagicLink.description =
  'Login using a secret magic-link key';
apiStructure.loginWithMagicLink.authorisation = 'None';
apiStructure.requestMagicLink.description =
  "Request a magic link for a given account using the account's email address";
apiStructure.requestMagicLink.authorisation = 'None';

// Blogs
apiStructure.createBlog.description = 'Create a new blog';
apiStructure.createBlog.authorisation = 'Admin only';
apiStructure.deleteBlog.description = 'Remove a blog';
apiStructure.deleteBlog.authorisation = 'Admin only';
apiStructure.loadBlogs.description =
  'Load all blogs. If not admin, only non-deleted, published blogs will be loaded';
apiStructure.loadBlogs.authorisation = 'None';
apiStructure.loadBlog.description =
  'Load a single blog. If not admin, will fail if deleted or not published';
apiStructure.loadBlog.authorisation = 'None';
apiStructure.loadBlog.arguments = 'id: the blog ID to load';
apiStructure.updateBlog.description = 'Update a blog';
apiStructure.updateBlog.authorisation = 'Admin only';

// Comments
apiStructure.createComment.description = 'Create a comment';
apiStructure.createComment.authorisation = 'None';
apiStructure.deleteComment.description = 'Delete a comment';
apiStructure.deleteComment.authorisation = 'Owner of comment, or admin';
apiStructure.loadComments.description = 'Loads all comments';
apiStructure.loadComments.authorisation = 'None';
apiStructure.loadComments.arguments = 'pageId: The page to load comments for';
apiStructure.updateComment.description = 'Update a comment';
apiStructure.updateComment.authorisation = 'Owner of comment, or admin';

// Data
apiStructure.backupAllData.description =
  'Returns a file containing a full data backup for the site';
apiStructure.backupAllData.authorisation = 'Admin only';
apiStructure.deleteEntity.description =
  'Remove a previously deleted entity completely from the DB';
apiStructure.deleteEntity.authorisation = 'Admin only';
apiStructure.deleteSet.description = 'Remove an entire collection from the DB';
apiStructure.deleteSet.authorisation = 'Admin only';
apiStructure.restoreBackup.description =
  'Restore all the data from a backup file';
apiStructure.restoreBackup.authorisation = 'Admin only';

// Make payment
apiStructure.loadPayment.description = 'TODO';
apiStructure.loadPayment.authorisation = 'TODO';
apiStructure.createPaymentIntent.description = 'TODO';
apiStructure.createPaymentIntent.authorisation = 'TODO';
apiStructure.resendPaymentReceipt.description = 'TODO';
apiStructure.resendPaymentReceipt.authorisation = 'Admin only';

// Monzo
apiStructure.loadMonzoPots.description = 'TODO';
apiStructure.loadMonzoPots.authorisation = 'Password required';
apiStructure.loadMonzoTransactions.description = 'TODO';
apiStructure.loadMonzoTransactions.authorisation = 'Password required';
apiStructure.setMonzoAPIKey.description = 'TODO';
apiStructure.setMonzoAPIKey.authorisation = 'Admin only';

// Notifications
apiStructure.createNotification.description = 'TODO';
apiStructure.createNotification.authorisation = 'TODO';
apiStructure.deleteNotification.description = 'TODO';
apiStructure.deleteNotification.authorisation = 'TODO';
apiStructure.loadNotifications.description = 'TODO';
apiStructure.loadNotifications.authorisation = 'TODO';
apiStructure.loadNotification.description = 'TODO';
apiStructure.loadNotification.authorisation = 'TODO';
apiStructure.loadNotification.arguments = 'TODO';
apiStructure.updateNotification.description = 'TODO';
apiStructure.updateNotification.authorisation = 'TODO';

// Payments
apiStructure.createPayment.description = 'TODO';
apiStructure.createPayment.authorisation = 'TODO';
apiStructure.deletePayment.description = 'TODO';
apiStructure.deletePayment.authorisation = 'TODO';
apiStructure.loadPayments.description = 'TODO';
apiStructure.loadPayments.authorisation = 'TODO';

// Support
apiStructure.createSupport.description = 'TODO';
apiStructure.createSupport.authorisation = 'Admin only';
apiStructure.deleteSupport.description = 'TODO';
apiStructure.deleteSupport.authorisation = 'Admin only';
apiStructure.loadSupport.description = 'TODO';
apiStructure.loadSupport.authorisation = 'None';

// Users
apiStructure.createUser.description = 'TODO';
apiStructure.createUser.authorisation = 'TODO';
apiStructure.deleteUser.description = 'TODO';
apiStructure.deleteUser.authorisation = 'TODO';
apiStructure.loadUser.description = 'TODO';
apiStructure.loadUser.authorisation = 'TODO';
apiStructure.loadUsers.description = 'TODO';
apiStructure.loadUsers.authorisation = 'TODO';
apiStructure.signUp.description = 'TODO';
apiStructure.signUp.authorisation = 'TODO';
apiStructure.updateUser.description = 'TODO';
apiStructure.updateUser.authorisation = 'TODO';

export default apiStructure;
