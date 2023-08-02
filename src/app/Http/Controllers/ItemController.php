<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Item;
use App\Http\Controllers\RangeController;
use App\Http\Controllers\ExceptionController;

class ItemController extends Controller
{

    function allItems(Request $request) {
        $items = Item::all();

        if (!$items) {
            return response()->json(['success' => true, 'error' => 'Items not found' ]);
        } else {
            return response()->json(['success' => true, 'items' => $items]);
        }
    }

    function index(Request $request, $name) {
        $items = Item::all();

        // For each item, grab the ranges that match that $item.id and also match the $name passed in the url
        foreach ($items as $item) {
            $item->ranges = DB::table('ranges')
                ->where('name', '=', $name)
                ->where('item_id', '=', $item->id)
                ->get();
        }

        foreach ($items as $item) {
            $item->exceptions = DB::table('exceptions')
                ->where('name', '=', $name)
                ->where('item_id', '=', $item->id)
                ->get();
        }

        if (!$items) {
            return response()->json(['success' => true, 'error' => 'Items not found' ]);
        } else {
            return response()->json(['success' => true, 'items' => $items]);
        }
    }

    function store(Request $request) {

        $data = $request->all();

        $item = Item::create([
            'name' => $data['name'],
            'creator' => $data['creator']
        ]);

        $ranges = $data['ranges'];
        $exceptions = $data['exceptions'];
        $itemId = $item->id;

        foreach ($ranges as $range) {
            $range = RangeController::store($range, $itemId);
        }

        foreach ($exceptions as $exception) {
            $exception = ExceptionController::store($exception, $itemId);
        }

        if (!$item) {
            return response()->json(['success' => true, 'error' => 'Item not created' ]);
        } else {
            return response()->json(['success' => true, 'item' => $item, 'ranges' => $ranges, 'exceptions' => $exceptions ]);
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

    public function destroy($id) {
        $item = item::find( $id );

        if(!$item ){
            return response()->json(['success' => false, 'error' => 'No item found.' ]);
        }

        // Find all the ranges associated with the item delete them
        $item->ranges = DB::table('ranges')
            ->where('item_id', '=', $item->id)
            ->delete();

        // Find all the exceptions associated with the item delete them
        $item->exceptions = DB::table('exceptions')
            ->where('item_id', '=', $item->id)
            ->delete();

        $item->delete();

        return response()->json(['success' => true, 'message' => 'item deleted.', 'item' => $item ]);
    }

    public function update(Request $request, $id) {
        $data = $request->all();
        $item = item::find( $id );

        if(!$item ){
            return response()->json(['success' => false, 'error' => 'No item found.' ]);
        }

        $item->name = $data['name'];

        $item->save();

        return response()->json(['success' => true, 'message' => 'item updated.', 'item' => $item ]);
    }

    // These are just test functions to make sure the route is working
    function add() {
        return ["result"=>"add item worked!"];
    }
    function try() {
        return ["result"=>"try item worked!"];
    }
}
