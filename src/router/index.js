import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import EventTracking from '../views/EventTracking.vue'
import EventTrackingDetail from '../views/EventTrackingDetail.vue'
import Services from '../views/Services.vue'
import Guild from '../views/Guild.vue'
import Contact from '../views/Contact.vue'
import Profile from '../views/Profile.vue'
import Receiver from '../views/Receiver.vue'
import ReceiverUpdate from '../views/ReceiverUpdate.vue'
import trackingNumber from '../views/trackingNumber.vue'
import trackingNumberCreate from '../views/trackingNumberCreate.vue'
import trackingNumberUpdate from '../views/trackingNumberUpdate.vue'
import shippingLabel from '../views/ShippingLabel.vue'
import Administrator from '../views/Administrator.vue'
import UsersManagement from '../views/administration/UsersManagement.vue'
import RolesManagement from '../views/administration/RolesManagement.vue'
import PermissionsManagement from '../views/administration/PermissionsManagement.vue'
import AssignRoles from '../views/administration/AssignRoles.vue'
import ServiceManagement from '../views/administration/ServiceManagement.vue'
import QuestionManagement from '../views/administration/QuestionManagement.vue'
import RequestManagement from '../views/administration/RequestManagement.vue'
import PostManagement from '../views/administration/PostManagement.vue'
import Error from '../views/Error.vue'
import PageNotFound from '../views/PageNotFound.vue'
import checkLogin from '../middleware/checkLogin'
import auth from '../middleware/auth'
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        middleware: checkLogin
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/event-tracking',
      name: 'eventTracking',
      component: EventTracking,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/event-tracking/detail/:id',
      name: 'eventTracking-detail',
      component: EventTrackingDetail,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/service',
      name: 'service',
      component: Services,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/guild',
      name: 'guild',
      component: Guild,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/tracking-number',
      name: 'tracking-number',
      component: trackingNumber,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/receiver',
      name: 'receiver',
      component: Receiver,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/receiver-update/:id',
      name: 'receiver-update',
      component: ReceiverUpdate,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        middleware: auth
      }
    }, {
      path: '/tracking-number-create',
      name: 'tracking-number-create',
      component: trackingNumberCreate,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/tracking-number-update/:id',
      name: 'tracking-number-update',
      component: trackingNumberUpdate,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/shipping-label/:id',
      name: 'shipping-label',
      component: shippingLabel,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/administrator',
      name: 'administrator',
      component: Administrator,
      meta: {
        middleware: auth
      },
      children: [
        {
          path: 'users-management',
          name: 'users-management',
          component: UsersManagement,
          meta: {
            middleware: auth
          },
        },
        {
          path: '/roles-management',
          name: 'roles-management',
          component: RolesManagement,
          meta: {
            middleware: auth
          },
        },
        {
          path: '/permissions-management',
          name: 'permissions-management',
          component: PermissionsManagement,
          meta: {
            middleware: auth
          },
        },
        {
          path: '/assign-roles',
          name: 'assign-roles',
          component: AssignRoles,
          meta: {
            middleware: auth
          },
        },
        {
          path: '/service-management',
          name: 'service-management',
          component: ServiceManagement,
          meta: {
            middleware: auth
          },
        },
        {
          path: '/question-management',
          name: 'question-management',
          component: QuestionManagement,
          meta: {
            middleware: auth
          },
        },
        {
          path: '/request-management',
          name: 'request-management',
          component: RequestManagement,
          meta: {
            middleware: auth
          },
        },
        {
          path: '/post-management',
          name: 'post-management',
          component: PostManagement,
          meta: {
            middleware: auth
          },
        },
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta: {
        // middleware: 
      }
    },
    {
      // path: "*",
      path: "/:catchAll(.*)",
      name: "not-found",
      component: PageNotFound,
      meta: {
        middleware: auth
      }
    }
  ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

const defaultTitle = import.meta.env.VITE_DEFAULT_TITLE
router.beforeEach((to, from, next) => {
  document.title = to.name.toUpperCase() || defaultTitle
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router
