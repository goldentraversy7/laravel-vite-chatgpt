<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageCreated;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Message::all();
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
        $message = Message::create([
            'chat_room_id' => $request->chat_room_id,
            'user_id' => $request->user_id,
            'message' => $request->message,
        ]);
        event(new MessageCreated($message));

        return response()->json([
            'message' => 'Message created successfully',
            'message' => $message,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return response()->json($message);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        $message->update($request->all());

        return response()->json([
            'message' => 'Message updated successfully',
            'message' => $message,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message = Message::find($message->id);
        $message->delete();
        return response()->json([
            'message' => 'Message deleted successfully',
        ], 200);
    }
}
