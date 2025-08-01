<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\RangeController;
use App\Http\Controllers\ExceptionController;

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

// ItemController routes *********************************************************************
// Store the item in the items table
Route::post("item", [ItemController::class, 'store']);

// Get all the items in the items table
Route::get("items", [ItemController::class, 'allItems']);

// Get all the items in the items table for a specific configuration. Also grab all the ranges that have the same config name
Route::get("items/{name}", [ItemController::class, 'index']);

// Destroy the item matching the id in the path
Route::delete("item/{id}", [ItemController::class, 'destroy']);

// Edit the item matching the id in the path. Removed the middle ware because I don't know the password in dev environment
// Route::put("item/{id}", [ItemController::class, 'update'])->middleware('auth.basic');
Route::put("item/{id}", [ItemController::class, 'update']);

// Get an item by id from the item table. We also grab all the ranges and exceptions with that item_id
Route::get("item/{id}", [ItemController::class, 'show']);

// This is just a route for a test function 
Route::post("item/add",[ItemController::class, 'add']);

// This is just a route for a test function 
Route::get("item/try",[ItemController::class, 'try']);

// RangeController routes *********************************************************************
// Store the range in the ranges table. We pass the item_id so it can be added to the item_id column in the ranges table
Route::post("item/{item_id}/range", [RangeController::class, 'store']);

// This is just a route for a test function 
Route::post("range/add",[RangeController::class, 'add']);

// This is just a route for a test function 
Route::get("range/try",[RangeController::class, 'try']);

// Get all the ranges that have the same item_id as the one we pass in the url
Route::get("item/{id}/range", [RangeController::class, 'show']);

// ExceptionController routes *********************************************************************
// Store the exception in the exceptions table. We pass the item_id so it can be added to the item_id column in the exceptions table
Route::post("item/{item_id}/exception", [ExceptionController::class, 'store']);

// This is just a route for a test function 
Route::get("exception/try",[ExceptionController::class, 'try']);

