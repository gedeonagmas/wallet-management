<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',   // Add user_id to the fillable property
        'balance',    // Wallet balance
    ];

    // Other model methods and relationships
}
