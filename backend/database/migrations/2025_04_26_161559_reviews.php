<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultant_id')->constrained('consultants')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('note');
            $table->text('comment');
        });
    }
   
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
