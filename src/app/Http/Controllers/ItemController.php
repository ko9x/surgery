<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemController extends Controller
{
    function add() {
        return ["result"=>"add worked!"];
    }
    function try() {
        return ["result"=>"try worked!"];
    }
}
