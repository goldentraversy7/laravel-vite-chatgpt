<?php

namespace App\Http\Controllers;

use App\Models\Chat_room_user;
use Illuminate\Http\Request;

class ChatRoomUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Chat_room_user::all();
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
        $chat_room_id = $request->chat_room_id;
        $user_ids = $request->user_id;

        if (is_array($user_ids)) {
            foreach ($user_ids as $user_id) {
                $chat_room_user = Chat_room_user::create([
                    'chat_room_id' => $chat_room_id,
                    'user_id' => $user_id,
                ]);
            }
        } else {
            $chat_room_user = Chat_room_user::create([
                'chat_room_id' => $chat_room_id,
                'user_id' => $user_ids,
            ]);
        }

        return response()->json([
            'message' => 'Chat room user created successfully',
            'chat_room_user' => $chat_room_user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat_room_user $chat_room_user)
    {
        return response()->json($chat_room_user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat_room_user $chat_room_user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat_room_user $chat_room_user)
    {
        $chat_room_user->update($request->all());
        return response()->json([
            'message' => 'Chat room user updated successfully',
            'chat_room_user' => $chat_room_user,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat_room_user $chat_room_user)
    {
        $chat_room_user->delete();
        return response()->json([
            'message' => 'Chat room user deleted successfully',
        ], 200);
    }
}
