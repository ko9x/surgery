<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    public function ranges() {
        return $this->hasMany(Range::class);
    }

    protected $fillable = [
        'name',
        'creator',
    ];
}
