<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemController extends Controller
{

    function checkRequest(Request $request) {

        \Log::info('This is the ItemController', [$request]);

        $data = $request->all();

        return $data['name'];
    }

    function add() {
        return ["result"=>"add worked!"];
    }
    function try() {
        return ["result"=>"try worked!"];
    }
}
