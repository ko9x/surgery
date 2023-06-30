<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exception;

class ExceptionController extends Controller
{

    public static function store(Request $request) {

        $exception = Exception::create([
            'item_id' => '10',
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
    // public static function store(array $request, $item_id) {

    //     $exception = Exception::create([
    //         'item_id' => $item_id,
    //         'name' => $request['name'],
    //         'serial' => $request['serial'],
    //         'details' => $request['details']
    //     ]);

    //     if (!$exception) {
    //         return false;
    //     } else {
    //         return $exception;
    //     }
    // }

    // This is the function that gets called when we run $item->exceptions; in the show function in the ItemController
    function show($id) {
        // Grab all the exceptions where the item_id matches the id passed in the request url
        $exceptions = Exception::where('item_id', $id)->get();

        if (!$exceptions) {
            return response()->json(['success' => true, 'error' => 'exception not found' ]);
        } else {
            return response()->json(['success' => true, 'exceptions' => $exceptions ]);
        }

    }

    // This is a test function to make sure the route is working
    function try() {
        return ["result"=>"try exception worked!"];
    }
}
