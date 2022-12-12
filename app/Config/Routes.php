<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (is_file(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home');
$routes->match(['get', 'post'],'register-form', 'Home::register');
$routes->match(['get', 'post'],'admin', 'Dashboard::index');
$routes->get('load-data', 'Dashboard::loadData');
$routes->get('load-data-all', 'Dashboard::loadDataAll');
$routes->get('load-data-false', 'Dashboard::loadDataFalse');
$routes->get('load-bus', 'Dashboard::loadBus');
$routes->get('delete/(:any)', 'Dashboard::deleteByID/$1');
$routes->get('update-pos/(:any)', 'Dashboard::updatePos/$1');
$routes->get('get-all-bus', 'Dashboard::getAllBus');
$routes->get('get-pos/(:any)', 'Dashboard::getPos/$1');
$routes->match(['get', 'post'],'get-pos-map', 'Home::getPosMap');
$routes->get('sending-sms', 'Dashboard::sendingSMS');
$routes->match(['get', 'post'], 'register-bus', 'Dashboard::registerBus');
$routes->get('get-users', 'Dashboard::loadUsers');
$routes->get('load-count-data', 'Dashboard::loadCountData');
$routes->get('load-count', 'Dashboard::loadCount');
$routes->get('verify', 'Dashboard::verify');
$routes->match(['get', 'post'],'bus', 'Home::logBus');
$routes->get('launch', 'Dashboard::launch');
$routes->get('get-notifs', 'Dashboard::getNotifications');
$routes->get('get-report', 'Dashboard::getReport');
$routes->get('get-report-1', 'Dashboard::getReport1');
$routes->get('filter-bus', 'Dashboard::filterBus');
$routes->get('filter-empty-bus', 'Dashboard::filterEmptyBus');
$routes->get('load-pdf/(:any)', 'Dashboard::loadPdf/$1');

service('auth')->routes($routes);


/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
