<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat_room_user extends Model
{
    use HasFactory;
    protected $table = "chat_room_users";
    protected $guarded = [];
    protected $hidden = [];
    protected $casts = [
        "user_id" => "array"
    ];

    public function chat_room()
    {
        return $this->belongsTo(Chat_room::class);
    }
}
