<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Symbol extends Model
{
  public $primarykey = 'id';
  protected $table = 'symbols';
  public function OHLC()
    {
        return $this->hasMany('App\Ohlc');
    }
}
