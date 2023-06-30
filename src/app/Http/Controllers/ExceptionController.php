<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exception;

class ExceptionController extends Controller
{

    public static function store(array $request, $item_id) {

        $exception = Exception::create([
            'item_id' => $item_id,
            'name' => $request['name'],
            'serial' => $request['serial'],
            'details' => $request['details']
        ]);

        if (!$exception) {
            return false;
        } else {
            return $exception;
        }
    }

    // This is a test function to make sure the route is working
    function try() {
        return ["result"=>"try exception worked!"];
    }
}
