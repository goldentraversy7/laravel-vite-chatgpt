<?php

namespace App\Http\Controllers;

use App\Services\OpenAIService;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;
use App\Events\QuestionCreated;

class QAController extends Controller
{
    protected $openAIService;

    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query_question = DB::table((new Question)->getTable())->select(DB::raw("CONCAT(id, '-0') as id"), 'user_id', 'msg', 'msg_time', DB::raw('0 as flag'), DB::raw('null as agent'));
        $query_answer = DB::table((new Answer)->getTable())->select(DB::raw('CONCAT(id, "-1") as id'), 'user_id', 'msg', 'msg_time', DB::raw('1 as flag'), 'agent');
        $select = $query_question->union($query_answer);

        if ($request->has('user_id') && $request->get('user_id'))
            $select = $select->where('user_id', $request->get('user_id'));
        $results = $select->orderBy('msg_time', 'asc')->get();

        return response()->json($results);
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
        $request->validate(['message' => 'required']);

        $question = Question::create([
            'user_id' => $request->user_id,
            'msg' => $request->message,
            'msg_time' => now(),
        ]);

        broadcast(new QuestionCreated($question))->toOthers();

        if (true) { // when gpt replys
            try {
                $response = $this->openAIService->generateChatResponse($request->message);
                $response_msg = $response['choices'][0]['message']['content'];

                $answer = Answer::create([
                    'user_id' => $request->user_id,
                    'question_id' => $question->id,
                    'msg' => $response_msg,
                    'msg_time' => now(),
                ]);
                return response()->json([
                    'question' => $question,
                    'answer' => $answer
                ], 201);
            } catch (\Exception $e) {
                response()->json([
                    'message' => 'QA failed'
                ], 500);
            }
        } else {

        }
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

    public function generateResponse(Request $request)
    {
        try {
                $response = $this->openAIService->generateChatResponse($request->input('msg'));
                return response()->json($response);
            } catch (\Exception $e) {
                // Log the error message
                \Log::error($e->getMessage());
                return response()->json(['error' => 'Something went wrong'], 500);
            }
    }
}