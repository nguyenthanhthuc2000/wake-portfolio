<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'description',
        'type',
    ];

    protected $casts = [
        'created_at'  => 'date:d/m/Y',
    ];
}
