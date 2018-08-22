<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\OHLC\Iextrading;

class OHLCTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $p= new Iextrading();
        // print_r($p->montly('aa')->get());
        $this->assertTrue(true);
    }
}
