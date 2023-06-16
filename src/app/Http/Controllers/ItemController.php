<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{

    function store(Request $request) {

        $data = $request->all();

        $item = Item::create([
            'name' => $data['name'],
            'creator' => $data['creator']
        ]);

        if (!$item) {
            return response()->json(['success' => true, 'error' => 'Item not created' ]);
        } else {
            return response()->json(['success' => true, 'item' => $item ]);
        }
    }

    function show($id) {
        $item = Item::find($id);

        if( !$item ){
            return response()->json(['success' => false, 'error' => 'No item found.' ]);
        }

        //Call ranges on item to make sure they're included on the item object in the response
        $item->ranges;

        if (!$item) {
            return response()->json(['success' => true, 'error' => 'Item not found' ]);
        } else {
            return response()->json(['success' => true, 'item' => $item ]);
        }

    }

    function add() {
        return ["result"=>"add item worked!"];
    }
    function try() {
        return ["result"=>"try item worked!"];
    }
}
