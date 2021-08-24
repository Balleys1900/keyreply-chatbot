// import router from '@/router';
// // import store from '@/store';
// // import { checkTokenExists } from '@/utils/auth';
// // import { getPageTitle } from '@/utils/functions';
// // import NProgress from 'nprogress'; // progress bar
// // import 'nprogress/nprogress.css'; // style progress bar
// const whiteList = ['/login'];

// router.beforeEach(async (to, from, next) => {
// 	if (to.name === from.name) {
// 		return;
// 	}

// 	// Start progress bar
// 	// NProgress.start();

// 	// Set page title
// 	document.title = getPageTitle(to.meta.title);

// 	// Determine whether the user has logged in
// 	if (checkTokenExists()) {
// 		// If is logged in, redirect to dashboard
// 		if (to.path === '/login') {
// 			next({ path: '/' });
// 			// NProgress.done();
// 		} else {
// 			next();
// 			// Determine whether the user has obtained his permission roles through getInfo
// 			//   const hasRoles = store.getters['auth/getRoleAuth'] && store.getters['auth/getRoleAuth'].length > 0;
// 			//   if (hasRoles) {
// 			next();
// 			//   } else {
// 			//     // try {
// 			//     //   const userAuthPromise = await store.dispatch('auth/fetchUserAuth');
// 			//     } catch (error) {
// 			//       console.log(error);
// 			//       console.error("There's an error !");
// 			//       // store.dispatch('app/handleSetIsLoading', false);
// 			//     }
// 			//   }
// 		}
// 	} else {
// 		// If don't token
// 		if (whiteList.indexOf(to.path) !== -1) {
// 			// In the free login whitelist, go redirect
// 			next();
// 		} else {
// 			// Other page that don't have permission to access are redirected to the login page
// 			next(`/login?redirect=${to.path}`);
// 			// NProgress.done();
// 		}
// 	}
// });

// router.afterEach(() => {
//   // Finish progress bar
//   NProgress.done();
// });
