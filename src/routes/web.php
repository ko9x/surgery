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

Route::get('/removeItem', function () {
    return view('removeItem');
});

Route::get('/', function () {
    return view('information');
});
