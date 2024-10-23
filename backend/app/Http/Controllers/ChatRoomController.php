<?php

namespace App\Http\Controllers;

use App\Models\Chat_room;
use App\Models\Chat_room_user;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Chat_room::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $chat_room = Chat_room::create([
            'name' => $request->name,
            'created_by' => $request->created_by,
        ]);

        return response()->json([
            'message' => 'Chat room created successfully',
            'chat_room' => $chat_room,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat_room $chat_room)
    {
        return response()->json($chat_room);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat_room $chat_room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat_room $chat_room)
    {
        $chat_room->update($request->all());
        return response()->json([
            'message' => 'Chat room updated successfully',
            'chat_room' => $chat_room,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $chat_room = Chat_room::findOrFail($id);

        $chat_room_users = Chat_room_user::where('chat_room_id', $id)->get();
        foreach ($chat_room_users as $chat_room_user) {
            $chat_room_user->delete();
        }

        $chat_room->delete();
        return response()->json([
            'message' => 'Chat room deleted successfully',
        ], 200);
    }
}
