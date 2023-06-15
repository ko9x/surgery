<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\RangeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("item", [ItemController::class, 'store']);

Route::post("item/add",[ItemController::class, 'add']);

Route::get("item/try",[ItemController::class, 'try']);

Route::get("item/{id}", [ItemController::class, 'show']);

Route::post("range/add",[RangeController::class, 'add']);

Route::get("range/try",[RangeController::class, 'try']);

