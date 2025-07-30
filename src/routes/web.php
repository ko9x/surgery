<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/itemForm', function () {
    return view('itemForm');
});
// })->middleware('auth.basic');
// Commented out basic auth because I apparently don't know the password for the dev instance

Route::get('/manageItems', function () {
    return view('manageItems');
});
// })->middleware('auth.basic');
// Commented out basic auth because I apparently don't know the password for the dev instance

Route::get('/', function () {
    return view('information');
});
