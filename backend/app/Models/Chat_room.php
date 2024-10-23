<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat_room extends Model
{
    use HasFactory;
    protected $table = "chat_rooms";
    protected $guarded = [];
    protected $hidden = [];

    public function chat_room_users()
    {
        return $this->hasMany(Chat_room_user::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
