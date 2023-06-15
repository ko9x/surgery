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

    // Can probably delete this. I can't think of a reason to show this without including the item it is associated with
    // function show($id) {
    //     $range = Range::find($id);

    //     if (!$range) {
    //         return response()->json(['success' => true, 'error' => 'range not found' ]);
    //     } else {
    //         return response()->json(['success' => true, 'range' => $range ]);
    //     }

    // }

    function add() {
        return ["result"=>"add range worked!"];
    }
    function try() {
        return ["result"=>"try range worked!"];
    }
}
