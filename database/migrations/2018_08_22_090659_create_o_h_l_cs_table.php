<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOHLCsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ohlc', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('symbol_id');
            $table->float('open');
            $table->float('hight');
            $table->float('low');
            $table->float('close');
            $table->dateTime('date');
            $table->timestamps();
            $table->unique(['date', 'symbol_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('o_h_l_cs');
    }
}
