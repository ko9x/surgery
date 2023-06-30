<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExceptionController extends Controller
{
    function try() {
        return ["result"=>"try exception worked!"];
    }
}
