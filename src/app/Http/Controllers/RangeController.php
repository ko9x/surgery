<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Range;

class RangeController extends Controller
{

    function store(Request $request, $item_id) {
        $data = $request->all();

        $range = Range::create([
            'item_id' => $item_id,
            'name' => $data['name'],
            'starts_at' => $data['starts_at'],
            'ends_at' => $data['ends_at'],
            'details' => $data['details']
        ]);

        if (!$range) {
            return response()->json(['success' => true, 'error' => 'range not created' ]);
        } else {
            return response()->json(['success' => true, 'range' => $range ]);
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
