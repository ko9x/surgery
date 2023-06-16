<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{

    function index(Request $request, $name) {
        // $data = $request->all();

        $items = Item::all();

        foreach ($items as $item) {
            $item->ranges;
        }

        if (!$items) {
            return response()->json(['success' => true, 'error' => 'Items not found' ]);
        } else {
            return response()->json(['success' => true, 'items' => $items, 'name' => $name ]);
        }
    }

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

    // We don't use this function. We use the index function so we grab all the items not just a single one.
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
