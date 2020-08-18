import apiStructure from 'helpers/apiStructure';

// Analytics
apiStructure.createAnalytic.description = 'Registers information about the page navigated to';
apiStructure.createAnalytic.authorisation = 'None';
apiStructure.loadAnalytics.description = 'Loads all raw analytic points';
apiStructure.loadAnalytics.authorisation = 'Admin only';
apiStructure.loadAnalyticsSummary.description = 'Loads a summary of unique analytic points';
apiStructure.loadAnalyticsSummary.authorisation = 'Admin only';

// Auth
apiStructure.loadAuth.description = 'Loads the currently authenticated used. Returns null if signed out';
apiStructure.loadAuth.authorisation = 'None';
apiStructure.logout.description = 'Logs out the currently authenticated user';
apiStructure.logout.authorisation = 'None';
apiStructure.requestVerificationEmail.description = 'Resends an email verification email';
apiStructure.requestVerificationEmail.authorisation = 'Any user';
apiStructure.verifyEmail.description = 'Verify an email address with a secret verification key';
apiStructure.verifyEmail.authorisation = 'None';

// Login
apiStructure.loginWithMagicLink.description = 'Login using a secret magic-link key';
apiStructure.loginWithMagicLink.authorisation = 'None';
apiStructure.requestMagicLink.description =
  "Request a magic link for a given account using the account's email address";
apiStructure.requestMagicLink.authorisation = 'None';

// Data
apiStructure.backupAllData.description = 'Returns a file containing a full data backup for the site';
apiStructure.backupAllData.authorisation = 'Admin only';
apiStructure.deleteEntity.description = 'Remove a previously deleted entity completely from the DB';
apiStructure.deleteEntity.authorisation = 'Admin only';
apiStructure.deleteSet.description = 'Remove an entire collection from the DB';
apiStructure.deleteSet.authorisation = 'Admin only';
apiStructure.restoreBackup.description = 'Restore all the data from a backup file';
apiStructure.restoreBackup.authorisation = 'Admin only';

// Notifications
apiStructure.createNotification.description = 'Creates a notification which will be show at the top of the site';
apiStructure.createNotification.authorisation = 'Admin only';
apiStructure.deleteNotification.description = 'Deletes a notification';
apiStructure.deleteNotification.authorisation = 'Admin only';
apiStructure.loadNotifications.description = 'Load all notifications';
apiStructure.loadNotifications.authorisation = 'Any user - only an admin can see deleted notifications';
apiStructure.updateNotification.description = 'Update a given notification';
apiStructure.updateNotification.authorisation = 'Admin only';

// Users
apiStructure.createUser.description = 'Create a user';
apiStructure.createUser.authorisation = 'None - only an admin can create other admin users';
apiStructure.deleteUser.description = 'Delete a user';
apiStructure.deleteUser.authorisation = 'The user being deleted, or an admin only';
apiStructure.loadUser.description = 'Load a given user';
apiStructure.loadUser.authorisation = 'The user being loaded, or an admin only';
apiStructure.loadUsers.description = 'Load all users';
apiStructure.loadUsers.authorisation = 'Admin only';
apiStructure.signUp.description = 'Create a user, and sign in as that user at the same time';
apiStructure.signUp.authorisation = 'None';
apiStructure.updateUser.description = 'Update a given user';
apiStructure.updateUser.authorisation = 'Any user - only an admin can promote other users to admin';

// #region app-specific
// Blogs
apiStructure.createBlog.description = 'Create a new blog';
apiStructure.createBlog.authorisation = 'Admin only';
apiStructure.deleteBlog.description = 'Remove a blog';
apiStructure.deleteBlog.authorisation = 'Admin only';
apiStructure.loadBlogs.description = 'Load all blogs. If not admin, only non-deleted, published blogs will be loaded';
apiStructure.loadBlogs.authorisation = 'None';
apiStructure.loadBlog.description = 'Load a single blog. If not admin, will fail if deleted or not published';
apiStructure.loadBlog.authorisation = 'None';
apiStructure.loadBlog.arguments = 'id: the blog ID to load';
apiStructure.updateBlog.description = 'Update a blog';
apiStructure.updateBlog.authorisation = 'Admin only';

// Make payment
apiStructure.loadPayment.description = 'TODO';
apiStructure.loadPayment.authorisation = 'TODO';
apiStructure.createPaymentIntent.description = 'TODO';
apiStructure.createPaymentIntent.authorisation = 'TODO';
apiStructure.resendPaymentReceipt.description = 'TODO';
apiStructure.resendPaymentReceipt.authorisation = 'Admin only';

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
// #endregion app-specific

export default apiStructure;
