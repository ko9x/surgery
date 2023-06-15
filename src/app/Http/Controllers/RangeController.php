<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RangeController extends Controller
{
    function add() {
        return ["result"=>"add range worked!"];
    }
    function try() {
        return ["result"=>"try range worked!"];
    }
}
