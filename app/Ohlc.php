<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ohlc extends Model
{
  protected $fillable = array('open', 'hight', 'low','close','date');
  protected $table = 'ohlc';
  public function symbol()
  {
      return $this->hasOne('App\Symbol');
  }
}
