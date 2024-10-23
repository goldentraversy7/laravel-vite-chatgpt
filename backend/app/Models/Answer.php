<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $table = 'answers';
    protected $guarded = [];
    protected $hidden = [];

    public function question_id()
    {
        return $this->belongsTo(Question::class);
    }
}
