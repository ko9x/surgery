<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Range;

class RangeController extends Controller
{

    public static function store(array $request, $item_id) {

        $range = Range::create([
            'item_id' => $item_id,
            'name' => $request['name'],
            'starts_at' => $request['starts_at'],
            'ends_at' => $request['ends_at'],
            'details' => $request['details']
        ]);

        if (!$range) {
            return false;
        } else {
            return $range;
        }
    }

    // This is the function that gets called when we run $item->ranges; in the show function in the ItemController
    function show($id) {
        // Grab all the ranges where the item_id matches the id passed in the request url
        $ranges = Range::where('item_id', $id)->get();

        if (!$ranges) {
            return response()->json(['success' => true, 'error' => 'range not found' ]);
        } else {
            return response()->json(['success' => true, 'ranges' => $ranges ]);
        }

    }

    function add() {
        return ["result"=>"add range worked!"];
    }
    function try() {
        return ["result"=>"try range worked!"];
    }
}
