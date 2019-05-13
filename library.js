'use strict';

require('module-alias/register');


const constants = require('@lib/constants');
const controllers = require('@lib/controllers');
const authentication = require('@utils/authentication');
const helpers = require('@utils/helpers');
const logger = require('@utils/logger');

const plugin = {};


plugin.init = (params, callback) => {
	/**
	 * Add plugin routes and middlewares.
	 *
	 * Args:
	 * 		params <Object>: params passed by NodeBB.
	 * 		callback <function>: callback function.
	 */
	const router = params.router;
	const hostMiddleware = params.middleware;


	router.get('/admin/plugins/openedx-discussion', hostMiddleware.admin.buildHeader, controllers.adminPanel.renderAdminPage);
	router.get('/api/admin/plugins/openedx-discussion', controllers.adminPanel.renderAdminPage);

	router.get('/embed', hostMiddleware.buildHeader, controllers.embed.embedView);
	router.get('/api/embed', controllers.embed.embedView);

	router.use((err, req, res, callback) => {
		logger.error(err);
		callback(err);
	});

	callback();
};

plugin.addAdminNavigation = (header, callback) => {
	/**
	 * Add plugin's admin panel settings route  in admin header.
	 *
	 * Args:
	 * 		header <Object>: header passed by NodeBB. route is added to this header object.
	 * 		callback <function>: callback function.
	 */
	header.plugins.push({
		route: '/plugins/openedx-discussion',
		icon: 'fa-user-secret',
		name: 'Openedx Discussion',
	});

	callback(null, header);
};

plugin.addHeaderVariables = (params, callback) => {
	/**
	 * Add plugin variables NodeBB header <head>...</head> before rendering it.
	 *
	 * Args:
	 * 		params <Object>: params passed by NodeBB.
	 * 		callback <function>: callback function.
	 */
	if (params.req.cookies.embed && params.req.cookies.embed.isEmbedView) {
		params.templateValues.isEmbedView = true;
	}

	helpers.getPluginSettings(constants.PLUGIN_NAME)
		.then((settings) => {
			params.templateValues.loginURL = settings.loginURL;
			params.templateValues.registrationURL = settings.registrationURL;
			params.templateValues.logoutURL = settings.logoutURL;
			return callback(null, params);
		})
		.catch(err => callback(err));
};

plugin.authenticateSession = (req, res, callback) => {
	/**
	 * Authenticate user request before every page load.
	 * IF verified cookie is present then login that user.
	 * ELSE IF cookie is not present and the current user (if logged-in) is not
	 * admin then logout current user.
	 *
	 * Args:
	 * 		req <Object>: Current request object.
	 * 		res <Object>: Response object.
	 * 		callback <function>: Callback function.
	 */
	const originalUid = req.uid;

	helpers.getPluginSettings(constants.PLUGIN_NAME)
		.then((settings) => {
			if (req.path === '/login' && settings.loginURL && req.session.returnTo !== '/admin') {
				return res.redirect(settings.loginURL);
			} else if (req.path === '/register' && settings.registrationURL) {
				return res.redirect(settings.registrationURL);
			}

			var cookieName = settings.jwtCookieName;
			if (req.cookies[cookieName]) {
				authentication.loginByJwtToken(req, settings)
					.then(() => {
						if (req.uid === originalUid) {
							return callback();
						}
						return res.redirect(req.originalUrl);
					});
			} else if (req.user && req.user.uid !== 1) {
				req.logout();
				return res.redirect('/login');
			} else {
				return callback();
			}
		})
		.catch(err => callback(err));
};

plugin.cleanSession = (params, callback) => {
	/**
	 * Delete jwt "token" cookie when user logs out from nodebb.
	 *
	 * Args:
	 * 		params <Object>: params passed by NodeBB.
	 * 		callback <function>: callback function.
	 */
	helpers.getPluginSettings(constants.PLUGIN_NAME)
		.then((settings) => {
			if (settings.jwtCookieName) {
				params.res.clearCookie(settings.jwtCookieName);
			}
			callback();
		})
		.catch(err => callback(err));
};


plugin.addTopicViewVariabels = (data, callback) => {
	/**
	 * Add template variables to render EmbedView if request is from iframe
	 * before sending topic data.
	 *
	 * Args:
	 * 		data <Object>: params passed by NodeBB.
	 * 		callback <function>: callback function.
	 */
	if (data.req.cookies.embed && data.req.cookies.embed.isEmbedView) {
		data.templateData.breadcrumbs = null;
		data.templateData.showCategoryLink = true;
		data.templateData.hideFooter = true;
	}
	callback(null, data);
};

plugin.addCategoryViewVariables = (data, callback) => {
	/**
	 * Add template variables to render EmbedView if request is from iframe
	 * before sending category data.
	 *
	 * Args:
	 * 		data <Object>: params passed by NodeBB.
	 * 		callback <function>: callback function.
	 */
	if (data.req.cookies.embed && data.req.cookies.embed.isEmbedView) {
		data.templateData.isEmbedView = true;
		data.templateData.breadcrumbs = null;
		data.templateData.showCategoryLink = false;
		data.templateData.hideFooter = true;
	}
	callback(null, data);
};


module.exports = plugin;
